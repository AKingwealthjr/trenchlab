import fs from 'fs';
import path from 'path';
import { createHash, randomBytes } from 'node:crypto';

export interface LicenseRecord {
  id: string;
  keyHash: string;
  keyPrefix: string;
  status: 'available' | 'active' | 'suspended' | 'revoked' | 'expired';
  assignedEmail?: string | null;
  assignedUid?: string | null;
  createdAt: string;
  updatedAt: string;
  activatedAt?: string | null;
  expiresAt?: string | null;
  maxActivations: number;
  activationCount: number;
  createdBy: string;
  notes?: string;
  lifecycleReason?: string;
}

export interface AuditRecord {
  id: string;
  licenseId: string;
  action: string;
  actorUid: string;
  actorEmail?: string | null;
  notes?: string;
  createdAt: string;
}

const STORAGE_FILE_PATH = path.resolve(process.cwd(), 'src/data/storedLicenses.json');

const hash = (key: string) => createHash('sha256').update(key.trim().toUpperCase()).digest('hex');
const createRawKey = () => `TLB-${randomBytes(6).toString('hex').toUpperCase().match(/.{1,4}/g)!.join('-')}`;
const now = () => new Date().toISOString();

class LicenseStoreManager {
  private licensesCache: Map<string, LicenseRecord> = new Map();
  private auditCache: AuditRecord[] = [];
  private isInitialized = false;

  private initialize() {
    if (this.isInitialized) return;
    try {
      if (fs.existsSync(STORAGE_FILE_PATH)) {
        const raw = fs.readFileSync(STORAGE_FILE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.licenses)) {
          for (const lic of parsed.licenses) {
            this.licensesCache.set(lic.id, lic);
          }
        }
        if (Array.isArray(parsed.audit)) {
          this.auditCache = parsed.audit;
        }
      }
    } catch (err) {
      console.warn('[LICENSE STORE] Unable to load storedLicenses.json, starting empty:', err);
    }
    this.isInitialized = true;
  }

  private persist() {
    try {
      const data = {
        licenses: Array.from(this.licensesCache.values()),
        audit: this.auditCache
      };
      fs.writeFileSync(STORAGE_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      // In read-only serverless environments like Vercel, local disk write may fail gracefully
      console.warn('[LICENSE STORE] Warning: Could not persist to disk:', err);
    }
  }

  public getAll(): LicenseRecord[] {
    this.initialize();
    return Array.from(this.licensesCache.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getAudit(): AuditRecord[] {
    this.initialize();
    return [...this.auditCache].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getById(id: string): LicenseRecord | undefined {
    this.initialize();
    return this.licensesCache.get(id);
  }

  public generate(input: {
    assignedEmail?: string | null;
    expiresAt?: string | null;
    notes?: string;
    adminUid: string;
    adminEmail?: string | null;
  }): { id: string; key: string } {
    this.initialize();
    const rawKey = createRawKey();
    const id = `lic-${randomBytes(8).toString('hex')}`;
    const timestamp = now();

    const record: LicenseRecord = {
      id,
      keyHash: hash(rawKey),
      keyPrefix: rawKey.slice(0, 8),
      status: 'available',
      assignedUid: null,
      assignedEmail: input.assignedEmail || null,
      createdAt: timestamp,
      updatedAt: timestamp,
      activatedAt: null,
      expiresAt: input.expiresAt || null,
      maxActivations: 1,
      activationCount: 0,
      createdBy: input.adminUid,
      notes: input.notes || ''
    };

    this.licensesCache.set(id, record);

    const auditEntry: AuditRecord = {
      id: `aud-${randomBytes(8).toString('hex')}`,
      licenseId: id,
      action: 'generate',
      actorUid: input.adminUid,
      actorEmail: input.adminEmail || null,
      notes: input.notes || '',
      createdAt: timestamp
    };
    this.auditCache.push(auditEntry);

    this.persist();
    return { id, key: rawKey };
  }

  public activate(input: {
    licenseKey: string;
    userUid: string;
    userEmail?: string | null;
  }): { success: boolean; error?: string; message?: string; license?: LicenseRecord } {
    this.initialize();
    const key = input.licenseKey.trim().toUpperCase();
    if (!key) return { success: false, error: 'LICENSE_REQUIRED', message: 'Enter your license key.' };

    const targetHash = hash(key);
    let found: LicenseRecord | undefined;
    for (const lic of this.licensesCache.values()) {
      if (lic.keyHash === targetHash) {
        found = lic;
        break;
      }
    }

    if (!found) {
      return { success: false, error: 'INVALID_LICENSE', message: 'This license key could not be verified.' };
    }

    if (found.status === 'active' && found.assignedUid !== input.userUid) {
      return { success: false, error: 'LICENSE_ALREADY_ACTIVATED', message: 'This license has already been activated by another operator.' };
    }

    if (['revoked', 'suspended', 'expired'].includes(found.status)) {
      return { success: false, error: `LICENSE_${found.status.toUpperCase()}`, message: `This license has been ${found.status}.` };
    }

    if (found.expiresAt && new Date(found.expiresAt).getTime() <= Date.now()) {
      return { success: false, error: 'LICENSE_EXPIRED', message: 'This license has expired.' };
    }

    const timestamp = now();
    found.status = 'active';
    found.assignedUid = input.userUid;
    found.assignedEmail = input.userEmail || null;
    found.activatedAt = found.activatedAt || timestamp;
    found.updatedAt = timestamp;
    found.activationCount = (found.activationCount || 0) + (found.assignedUid === input.userUid ? 0 : 1);

    this.licensesCache.set(found.id, found);

    this.auditCache.push({
      id: `aud-${randomBytes(8).toString('hex')}`,
      licenseId: found.id,
      action: 'activate',
      actorUid: input.userUid,
      actorEmail: input.userEmail || null,
      createdAt: timestamp
    });

    this.persist();
    return { success: true, message: 'ACCESS_GRANTED', license: found };
  }

  public updateStatus(
    licenseId: string,
    action: 'suspend' | 'revoke' | 'reactivate',
    actorUid: string,
    actorEmail?: string | null,
    reason?: string
  ): { success: boolean; error?: string; message?: string; license?: LicenseRecord } {
    this.initialize();
    const found = this.licensesCache.get(licenseId);
    if (!found) {
      return { success: false, error: 'LICENSE_NOT_FOUND', message: 'License not found.' };
    }

    const newStatus = action === 'reactivate' 
      ? (found.assignedUid ? 'active' : 'available')
      : action === 'revoke' ? 'revoked' : 'suspended';

    const timestamp = now();
    found.status = newStatus;
    found.updatedAt = timestamp;
    found.lifecycleReason = reason || '';

    this.licensesCache.set(found.id, found);

    this.auditCache.push({
      id: `aud-${randomBytes(8).toString('hex')}`,
      licenseId: found.id,
      action,
      actorUid,
      actorEmail: actorEmail || null,
      notes: reason || '',
      createdAt: timestamp
    });

    this.persist();
    return { success: true, license: found };
  }
}

export const LicenseStore = new LicenseStoreManager();
