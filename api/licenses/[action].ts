import { createHash, randomBytes } from 'node:crypto';
import type { Firestore } from 'firebase-admin/firestore';
import { firebaseAdmin } from '../../src/server/firebaseAdmin';
import { LicenseStore } from '../../src/server/licenseStore';
import { requireAdmin, requireUser, sendJson } from '../../src/server/vercelApi';

const hash = (key: string) => createHash('sha256').update(key.trim().toUpperCase()).digest('hex');
const createKey = () => `TLB-${randomBytes(6).toString('hex').toUpperCase().match(/.{1,4}/g)!.join('-')}`;
const now = () => new Date().toISOString();

function readBody(req: any) {
  if (typeof req.body !== 'string') return req.body || {};
  try {
    return JSON.parse(req.body || '{}');
  } catch {
    return null;
  }
}

function getFirestoreDb(): Firestore | null {
  try {
    return firebaseAdmin().db;
  } catch {
    return null;
  }
}

async function writeAudit(db: Firestore, input: {
  licenseId: string;
  action: string;
  actorUid: string;
  actorEmail?: string | null;
  notes?: string;
}) {
  try {
    await db.collection('license_audit').add({
      ...input,
      actorEmail: input.actorEmail || null,
      notes: input.notes || '',
      createdAt: now()
    });
  } catch (err) {
    console.warn('[LICENSE AUDIT] Failed to write to Firestore:', err);
  }
}

export default async function handler(req: any, res: any) {
  const action = Array.isArray(req.query.action) ? req.query.action[0] : req.query.action;
  try {
    const body = readBody(req);
    if (body === null) {
      return sendJson(res, 400, { success: false, error: 'INVALID_JSON', message: 'Invalid JSON payload.' });
    }

    if (action === 'activate') {
      const user = await requireUser(req, res);
      if (!user) return;
      const key = String(body.licenseKey || '').trim().toUpperCase();
      if (!key) return sendJson(res, 400, { success: false, error: 'LICENSE_REQUIRED', message: 'Enter your license key.' });

      const db = getFirestoreDb();
      if (db) {
        try {
          const snapshot = await db.collection('licenses').where('keyHash', '==', hash(key)).limit(1).get();
          if (snapshot.empty) {
            // Fallback check in LicenseStore
            const localRes = LicenseStore.activate({ licenseKey: key, userUid: user.uid, userEmail: user.email });
            if (localRes.success) {
              return sendJson(res, 200, { success: true, message: 'ACCESS_GRANTED' });
            }
            return sendJson(res, 422, { success: false, error: 'INVALID_LICENSE', message: 'This license key could not be verified.' });
          }
          const ref = snapshot.docs[0].ref;
          await db.runTransaction(async tx => {
            const license = (await tx.get(ref)).data()!;
            if (license.status === 'active' && license.assignedUid !== user.uid) throw new Error('LICENSE_ALREADY_ACTIVATED');
            if (['revoked', 'suspended', 'expired'].includes(license.status)) throw new Error(`LICENSE_${String(license.status).toUpperCase()}`);
            if (license.expiresAt && new Date(license.expiresAt).getTime() <= Date.now()) throw new Error('LICENSE_EXPIRED');
            tx.update(ref, { 
              status: 'active', 
              assignedUid: user.uid, 
              assignedEmail: user.email || null, 
              activatedAt: now(), 
              updatedAt: now(), 
              activationCount: (license.activationCount || 0) + (license.assignedUid ? 0 : 1) 
            });
            tx.set(db.collection('users').doc(user.uid), { 
              accessStatus: 'active', 
              licenseId: ref.id, 
              licenseActivatedAt: now(), 
              accessExpiresAt: license.expiresAt || null 
            }, { merge: true });
          });
          await writeAudit(db, { licenseId: ref.id, action: 'activate', actorUid: user.uid, actorEmail: user.email || null });
          return sendJson(res, 200, { success: true, message: 'ACCESS_GRANTED' });
        } catch (dbErr: any) {
          const knownCodes = ['LICENSE_ALREADY_ACTIVATED', 'LICENSE_REVOKED', 'LICENSE_SUSPENDED', 'LICENSE_EXPIRED'];
          if (knownCodes.includes(dbErr.message)) {
            return sendJson(res, 422, { success: false, error: dbErr.message, message: dbErr.message.replaceAll('_', ' ') });
          }
          console.warn('[LICENSE ACTIVATE] Firestore error, falling back to LicenseStore:', dbErr);
        }
      }

      // Fallback: LicenseStore
      const fallbackResult = LicenseStore.activate({ licenseKey: key, userUid: user.uid, userEmail: user.email });
      if (!fallbackResult.success) {
        return sendJson(res, 422, { success: false, error: fallbackResult.error || 'INVALID_LICENSE', message: fallbackResult.message || 'Activation failed.' });
      }
      return sendJson(res, 200, { success: true, message: 'ACCESS_GRANTED' });
    }

    const admin = await requireAdmin(req, res);
    if (!admin) return;
    const db = getFirestoreDb();

    if (action === 'generate') {
      const rawKey = createKey();
      const dbSuccess = false;

      if (db) {
        try {
          const id = db.collection('licenses').doc().id;
          await db.collection('licenses').doc(id).set({ 
            keyHash: hash(rawKey), 
            keyPrefix: rawKey.slice(0, 8), 
            status: 'available', 
            assignedUid: null, 
            assignedEmail: body.assignedEmail || null, 
            createdAt: now(), 
            updatedAt: now(), 
            activatedAt: null, 
            expiresAt: body.expiresAt || null, 
            maxActivations: 1, 
            activationCount: 0, 
            createdBy: admin.uid, 
            notes: String(body.notes || '') 
          });
          await writeAudit(db, { licenseId: id, action: 'generate', actorUid: admin.uid, actorEmail: admin.email || null, notes: String(body.notes || '') });
          // Mirror to LicenseStore
          LicenseStore.generate({ assignedEmail: body.assignedEmail, expiresAt: body.expiresAt, notes: body.notes, adminUid: admin.uid, adminEmail: admin.email });
          return sendJson(res, 201, { success: true, license: { id, key: rawKey } });
        } catch (dbErr) {
          console.warn('[LICENSE GENERATE] Firestore error, falling back to LicenseStore:', dbErr);
        }
      }

      // Fallback: LicenseStore
      const genResult = LicenseStore.generate({
        assignedEmail: body.assignedEmail,
        expiresAt: body.expiresAt,
        notes: body.notes,
        adminUid: admin.uid,
        adminEmail: admin.email
      });
      return sendJson(res, 201, { success: true, license: genResult });
    }

    if (action === 'list') {
      if (db) {
        try {
          const [list, audit] = await Promise.all([
            db.collection('licenses').orderBy('createdAt', 'desc').limit(100).get(),
            db.collection('license_audit').orderBy('createdAt', 'desc').limit(100).get()
          ]);
          return sendJson(res, 200, {
            success: true,
            licenses: list.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            audit: audit.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          });
        } catch (dbErr) {
          console.warn('[LICENSE LIST] Firestore error, falling back to LicenseStore:', dbErr);
        }
      }

      // Fallback: LicenseStore
      return sendJson(res, 200, {
        success: true,
        licenses: LicenseStore.getAll(),
        audit: LicenseStore.getAudit()
      });
    }

    if (['revoke', 'suspend', 'reactivate'].includes(action)) {
      const id = String(body.licenseId || '');
      if (!id) return sendJson(res, 400, { success: false, error: 'LICENSE_ID_REQUIRED', message: 'License id is required.' });

      if (db) {
        try {
          const ref = db.collection('licenses').doc(id);
          const snap = await ref.get();
          if (snap.exists) {
            const license = snap.data()!;
            const status = action === 'reactivate' ? (license.assignedUid ? 'active' : 'available') : action === 'revoke' ? 'revoked' : 'suspended';
            await ref.update({ status, updatedAt: now(), lifecycleReason: String(body.reason || '') });
            if (license.assignedUid) {
              await db.collection('users').doc(license.assignedUid).set({
                accessStatus: status === 'active' ? 'active' : status,
                licenseId: id,
                accessExpiresAt: status === 'active' ? license.expiresAt || null : null
              }, { merge: true });
            }
            await writeAudit(db, { licenseId: id, action, actorUid: admin.uid, actorEmail: admin.email || null, notes: String(body.reason || '') });
            LicenseStore.updateStatus(id, action, admin.uid, admin.email, body.reason);
            return sendJson(res, 200, { success: true, license: { id, status } });
          }
        } catch (dbErr) {
          console.warn('[LICENSE LIFECYCLE] Firestore error, falling back to LicenseStore:', dbErr);
        }
      }

      // Fallback: LicenseStore
      const updateResult = LicenseStore.updateStatus(id, action, admin.uid, admin.email, body.reason);
      if (!updateResult.success) {
        return sendJson(res, 404, { success: false, error: updateResult.error || 'LICENSE_NOT_FOUND', message: updateResult.message || 'License not found.' });
      }
      return sendJson(res, 200, { success: true, license: updateResult.license });
    }

    return sendJson(res, 404, { success: false, error: 'UNKNOWN_ACTION', message: 'Unknown license action.' });
  } catch (error) {
    console.error('[LICENSE API] Unhandled error:', error);
    const code = error instanceof Error ? error.message : 'LICENSE_ERROR';
    const known = ['LICENSE_ALREADY_ACTIVATED', 'LICENSE_REVOKED', 'LICENSE_SUSPENDED', 'LICENSE_EXPIRED'];
    return sendJson(res, known.includes(code) ? 422 : 500, { 
      success: false, 
      error: known.includes(code) ? code : 'LICENSE_ERROR', 
      message: known.includes(code) ? code.replaceAll('_', ' ') : 'License operation failed.' 
    });
  }
}
