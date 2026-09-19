import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { ResourceStore } from './src/server/resourceStore';
import { searchYouTubeForLesson } from './src/server/youtubeService';
import { generateSearchProfile } from './src/lib/searchProfiles';
import { CURRICULUM_DATA, getLessonById } from './src/data/curriculumData';
import { LessonResource } from './src/types';
import { extractYouTubeVideoId, validateYouTubeVideo } from './src/server/youtubeService';
import { createPublicKey, verify, createHash, randomBytes } from 'node:crypto';
import { LicenseStore } from './src/server/licenseStore';
import { firebaseAdmin } from './src/server/firebaseAdmin';

dotenv.config();

const hashKey = (key: string) => createHash('sha256').update(key.trim().toUpperCase()).digest('hex');
const createRawLicenseKey = () => `TLB-${randomBytes(6).toString('hex').toUpperCase().match(/.{1,4}/g)!.join('-')}`;
const nowIso = () => new Date().toISOString();

function getFirestoreDb() {
  try {
    return firebaseAdmin().db;
  } catch {
    return null;
  }
}

async function writeAuditRecord(db: any, input: {
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
      createdAt: nowIso()
    });
  } catch (err) {
    console.warn('[LICENSE AUDIT] Failed to write to Firestore:', err);
  }
}

async function requireUserToken(req: express.Request, res: express.Response): Promise<FirebaseTokenClaims | null> {
  const authorization = req.header('authorization');
  if (!authorization?.startsWith('Bearer ')) {
    jsonError(res, 401, 'UNAUTHENTICATED', 'Sign in is required.');
    return null;
  }
  const claims = await verifyFirebaseToken(authorization.slice(7));
  if (!claims) {
    jsonError(res, 401, 'UNAUTHENTICATED', 'Your session could not be verified.');
    return null;
  }
  return claims;
}

type FirebaseTokenClaims = { uid: string; email?: string };
let firebaseCertificates: Record<string, string> | null = null;
let certificatesExpireAt = 0;

function jsonError(res: express.Response, status: number, error: string, message: string) {
  return res.status(status).type('application/json').json({ success: false, error, message });
}

function getAdminEmails(): Set<string> {
  const defaults = [
    'vipkingwealth@gmail.com',
    '1alexkingsley@gmail.com',
    'alexkingsley@gmail.com',
    'precilexis@gmail.com'
  ];
  const envAdmins = (process.env.ADMIN_EMAILS || '')
    .replace(/['"]/g, '')
    .split(',')
    .map(value => value.trim().toLowerCase())
    .filter(Boolean);

  return new Set([...defaults, ...envAdmins]);
}

async function verifyFirebaseToken(token: string): Promise<FirebaseTokenClaims | null> {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const decode = (value: string) => JSON.parse(Buffer.from(value.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
    const header = decode(parts[0]) as { kid?: string; alg?: string };
    const claims = decode(parts[1]) as { aud?: string; iss?: string; exp?: number; sub?: string; email?: string };
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
    if (!projectId || header.alg !== 'RS256' || !header.kid || !claims.sub || claims.aud !== projectId || claims.iss !== `https://securetoken.google.com/${projectId}` || !claims.exp || claims.exp <= Date.now() / 1000) return null;
    if (!firebaseCertificates || Date.now() >= certificatesExpireAt) {
      const response = await fetch('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
      if (!response.ok) return null;
      firebaseCertificates = await response.json() as Record<string, string>;
      const maxAge = Number(response.headers.get('cache-control')?.match(/max-age=(\d+)/)?.[1] || 3600);
      certificatesExpireAt = Date.now() + maxAge * 1000;
    }
    const certificate = firebaseCertificates[header.kid];
    if (!certificate) return null;
    const signature = Buffer.from(parts[2].replace(/-/g, '+').replace(/_/g, '/'), 'base64');
    const valid = verify('RSA-SHA256', Buffer.from(`${parts[0]}.${parts[1]}`), createPublicKey(certificate), signature);
    return valid ? { uid: claims.sub, email: claims.email } : null;
  } catch (error) {
    console.warn('[ADMIN] token verification failed', error instanceof Error ? error.message : String(error));
    return null;
  }
}

async function requireAdmin(req: express.Request, res: express.Response): Promise<FirebaseTokenClaims | null> {
  const authorization = req.header('authorization');
  if (!authorization?.startsWith('Bearer ')) {
    jsonError(res, 401, 'UNAUTHENTICATED', 'Sign in is required.');
    return null;
  }
  const claims = await verifyFirebaseToken(authorization.slice(7));
  if (!claims) {
    jsonError(res, 401, 'UNAUTHENTICATED', 'Your session could not be verified.');
    return null;
  }
  if (!claims.email || !getAdminEmails().has(claims.email.toLowerCase())) {
    console.warn('[ADMIN] authorization denied', { uid: claims.uid });
    jsonError(res, 403, 'FORBIDDEN', 'Administrator access required.');
    return null;
  }
  console.info('[ADMIN] authorization success', { uid: claims.uid });
  return claims;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());
  app.use((error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error instanceof SyntaxError && 'body' in error) {
      return jsonError(res, 400, 'INVALID_JSON', 'Request body must be valid JSON.');
    }
    next(error);
  });

  // ==========================================
  // DISCOVERY & CONTENT STUDIO API ROUTES FIRST
  // ==========================================

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      service: 'TRENCHLAB University Server'
    });
  });

  // 2. Discovery Status and Summary of 148 Lessons
  app.get('/api/discovery/status', async (req, res) => {
    try {
      if (!await requireAdmin(req, res)) return;
      const apiKey = process.env.YOUTUBE_API_KEY;
      const isKeyConfigured = Boolean(apiKey && apiKey.trim() !== '' && apiKey !== 'MY_YOUTUBE_API_KEY');

      const allLessonIds: string[] = [];
      for (const phase of CURRICULUM_DATA) {
        for (const lesson of phase.lessons) {
          allLessonIds.push(lesson.id);
        }
      }

      const summary = ResourceStore.getSummary(allLessonIds);

      res.json({
        success: true,
        apiKeyConfigured: isKeyConfigured,
        totalLessons: allLessonIds.length,
        summary
      });
    } catch (err: any) {
      console.error('Error fetching discovery status:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. List all stored resources
  app.get('/api/discovery/resources', async (req, res) => {
    try {
      if (!await requireAdmin(req, res)) return;
      const { lessonId, status } = req.query;
      let resources = ResourceStore.getAll();

      if (lessonId && typeof lessonId === 'string') {
        resources = resources.filter(r => r.lessonId === lessonId);
      }
      if (status && typeof status === 'string') {
        resources = resources.filter(r => r.status === status);
      }

      res.json({
        success: true,
        count: resources.length,
        resources
      });
    } catch (err: any) {
      console.error('Error listing resources:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Student lesson playback reads only resources that have already passed approval.
  app.get('/api/resources', (_req, res) => {
    const { lessonId } = _req.query;
    const resources = ResourceStore.getAll().filter(resource => resource.status === 'APPROVED' && (!lessonId || resource.lessonId === lessonId));
    res.type('application/json').json({ success: true, resources });
  });

  // 4. Discover candidates for a single lesson
  app.post('/api/discovery/discover-single', async (req, res) => {
    try {
      if (!await requireAdmin(req, res)) return;
      const { lessonId, maxResults = 5 } = req.body;
      if (!lessonId) {
        return res.status(400).json({ success: false, error: 'lessonId is required' });
      }

      const found = getLessonById(lessonId);
      if (!found) {
        return res.status(404).json({ success: false, error: `Lesson ${lessonId} not found in curriculum` });
      }

      const searchProfile = generateSearchProfile(found.lesson, found.phase.title);
      const searchResult = await searchYouTubeForLesson(searchProfile, maxResults);

      if (!searchResult.success && !searchResult.apiKeyConfigured) {
        return res.status(400).json({
          success: false,
          apiKeyConfigured: false,
          error: searchResult.error
        });
      }

      // Store discovered candidates in ResourceStore
      const savedList: LessonResource[] = [];
      const now = new Date().toISOString();

      for (const item of searchResult.videos) {
        const id = `res-${lessonId}-${item.id}`;
        const existing = ResourceStore.getById(id);

        const resource: LessonResource = {
          id,
          lessonId,
          provider: 'youtube',
          providerVideoId: item.id,
          title: item.title,
          description: item.description,
          channelName: item.channelTitle,
          thumbnailUrl: item.thumbnailUrl,
          youtubeUrl: `https://www.youtube.com/watch?v=${item.id}`,
          embedUrl: `https://www.youtube-nocookie.com/embed/${item.id}`,
          durationSeconds: item.durationSeconds || 600,
          durationFormatted: item.durationFormatted || '10:00',
          publishedAt: item.publishedAt,
          relevanceScore: item.relevanceScore,
          qualityScore: item.qualityScore,
          resourceType: 'EXTERNAL_YOUTUBE',
          status: existing ? existing.status : 'DISCOVERED',
          isPrimary: existing ? existing.isPrimary : false,
          searchQuery: searchProfile.primarySearchQuery,
          whyUseful: item.whyUseful,
          createdAt: existing ? existing.createdAt : now,
          updatedAt: now
        };

        const saved = ResourceStore.saveResource(resource);
        savedList.push(saved);
      }

      res.json({
        success: true,
        apiKeyConfigured: searchResult.apiKeyConfigured,
        quotaExceeded: searchResult.quotaExceeded,
        videosFound: savedList.length,
        resources: savedList
      });
    } catch (err: any) {
      console.error('Error running single discovery:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 5. Run batch discovery across multiple lessons (rate-limited to conserve quota)
  app.post('/api/discovery/discover-batch', async (req, res) => {
    try {
      if (!await requireAdmin(req, res)) return;
      const { lessonIds, phaseId, batchSize = 3, delayMs = 600 } = req.body;
      const apiKey = process.env.YOUTUBE_API_KEY;

      if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_YOUTUBE_API_KEY') {
        return res.status(400).json({
          success: false,
          apiKeyConfigured: false,
          error: 'YOUTUBE_API_KEY is not configured in server environment (.env).'
        });
      }

      let targets: { lessonId: string }[] = [];

      if (Array.isArray(lessonIds) && lessonIds.length > 0) {
        targets = lessonIds.map(id => ({ lessonId: id }));
      } else if (phaseId) {
        const phase = CURRICULUM_DATA.find(p => p.id === Number(phaseId));
        if (phase) {
          targets = phase.lessons.map(l => ({ lessonId: l.id }));
        }
      } else {
        // Collect all lessons that currently have NO approved resource
        for (const phase of CURRICULUM_DATA) {
          for (const l of phase.lessons) {
            const approved = ResourceStore.getByLessonId(l.id, true);
            if (approved.length === 0) {
              targets.push({ lessonId: l.id });
            }
          }
        }
      }

      const actualBatch = targets.slice(0, Math.min(Number(batchSize) || 3, 10));
      const results: Record<string, { success: boolean; found: number; error?: string }> = {};

      for (const item of actualBatch) {
        const found = getLessonById(item.lessonId);
        if (!found) continue;

        const profile = generateSearchProfile(found.lesson, found.phase.title);
        const searchRes = await searchYouTubeForLesson(profile, 3);

        if (searchRes.quotaExceeded) {
          results[item.lessonId] = { success: false, found: 0, error: 'Daily YouTube quota limit reached' };
          break; // Stop immediately on quota limit
        }

        if (searchRes.success && searchRes.videos.length > 0) {
          const now = new Date().toISOString();
          for (const vid of searchRes.videos) {
            const id = `res-${item.lessonId}-${vid.id}`;
            const existing = ResourceStore.getById(id);
            const resource: LessonResource = {
              id,
              lessonId: item.lessonId,
              provider: 'youtube',
              providerVideoId: vid.id,
              title: vid.title,
              description: vid.description,
              channelName: vid.channelTitle,
              thumbnailUrl: vid.thumbnailUrl,
              youtubeUrl: `https://www.youtube.com/watch?v=${vid.id}`,
              embedUrl: `https://www.youtube-nocookie.com/embed/${vid.id}`,
              durationSeconds: vid.durationSeconds || 600,
              durationFormatted: vid.durationFormatted || '10:00',
              publishedAt: vid.publishedAt,
              relevanceScore: vid.relevanceScore,
              qualityScore: vid.qualityScore,
              resourceType: 'EXTERNAL_YOUTUBE',
              status: existing ? existing.status : 'DISCOVERED',
              isPrimary: existing ? existing.isPrimary : false,
              searchQuery: profile.primarySearchQuery,
              whyUseful: vid.whyUseful,
              createdAt: existing ? existing.createdAt : now,
              updatedAt: now
            };
            ResourceStore.saveResource(resource);
          }
          results[item.lessonId] = { success: true, found: searchRes.videos.length };
        } else {
          results[item.lessonId] = { success: searchRes.success, found: 0, error: searchRes.error };
        }

        // Throttle to respect YouTube API rate limits
        if (delayMs > 0) {
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }

      res.json({
        success: true,
        processedCount: Object.keys(results).length,
        results
      });
    } catch (err: any) {
      console.error('Error running batch discovery:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 6. Approve candidate
  app.post('/api/discovery/approve', async (req, res) => {
    try {
      if (!await requireAdmin(req, res)) return;
      const { resourceId, isPrimary = true } = req.body;
      if (!resourceId) {
        return res.status(400).json({ success: false, error: 'resourceId is required' });
      }

      const candidate = ResourceStore.getById(resourceId);
      if (!candidate) return jsonError(res, 404, 'RESOURCE_NOT_FOUND', 'Resource not found.');
      const validation = await validateYouTubeVideo(candidate.providerVideoId);
      if (!validation.success || !validation.video) {
        candidate.status = validation.error === 'VIDEO_NOT_FOUND' || validation.error === 'VIDEO_UNAVAILABLE' ? 'UNAVAILABLE' : 'NEEDS_REVIEW';
        candidate.validationStatus = candidate.status === 'UNAVAILABLE' ? 'unavailable' : 'needs_review';
        candidate.validationReason = validation.error || 'Video validation failed.';
        ResourceStore.saveResource(candidate);
        return jsonError(res, 422, validation.error || 'VIDEO_REJECTED', 'The video could not be validated for approval.');
      }
      candidate.title = validation.video.title;
      candidate.description = validation.video.description;
      candidate.channelName = validation.video.channelTitle;
      candidate.thumbnailUrl = validation.video.thumbnailUrl;
      candidate.durationSeconds = validation.video.durationSeconds;
      candidate.durationFormatted = validation.video.durationFormatted;
      candidate.publishedAt = validation.video.publishedAt;
      candidate.validationStatus = 'approved';
      candidate.validatedAt = new Date().toISOString();
      candidate.validationReason = undefined;
      ResourceStore.saveResource(candidate);
      const approved = ResourceStore.approve(resourceId, isPrimary);
      if (!approved) {
        return res.status(404).json({ success: false, error: 'Resource not found' });
      }

      res.json({ success: true, resource: approved });
    } catch (err: any) {
      console.error('Error approving resource:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 7. Reject candidate
  app.post('/api/discovery/reject', async (req, res) => {
    try {
      if (!await requireAdmin(req, res)) return;
      const { resourceId } = req.body;
      if (!resourceId) {
        return res.status(400).json({ success: false, error: 'resourceId is required' });
      }

      const rejected = ResourceStore.reject(resourceId);
      if (!rejected) {
        return res.status(404).json({ success: false, error: 'Resource not found' });
      }

      res.json({ success: true, resource: rejected });
    } catch (err: any) {
      console.error('Error rejecting resource:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8. Set primary resource for a lesson
  app.post('/api/discovery/set-primary', async (req, res) => {
    try {
      if (!await requireAdmin(req, res)) return;
      const { lessonId, resourceId } = req.body;
      if (!lessonId || !resourceId) {
        return res.status(400).json({ success: false, error: 'lessonId and resourceId are required' });
      }

      const updated = ResourceStore.setPrimary(lessonId, resourceId);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Target resource not found for this lesson' });
      }

      res.json({ success: true, resource: updated });
    } catch (err: any) {
      console.error('Error setting primary resource:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 9. Validate manual input before the UI permits injection.
  app.post('/api/discovery/manual-validate', async (req, res) => {
    if (!await requireAdmin(req, res)) return;
    const videoId = extractYouTubeVideoId(String(req.body?.youtubeUrl || req.body?.videoId || ''));
    if (!videoId) return jsonError(res, 400, 'INVALID_YOUTUBE_URL', 'Enter a valid YouTube URL or 11-character video ID.');
    const validation = await validateYouTubeVideo(videoId);
    if (!validation.success || !validation.video) {
      const status = validation.error === 'YOUTUBE_API_NOT_CONFIGURED' ? 503 : validation.error === 'YOUTUBE_API_QUOTA_REACHED' ? 429 : 422;
      return jsonError(res, status, validation.error || 'VIDEO_REJECTED', 'The video is unavailable, private, unembeddable, or could not be verified.');
    }
    const video = validation.video;
    return res.type('application/json').json({ success: true, video: { ...video, videoId, youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`, embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}` } });
  });

  // 10. Manually add a validated custom YouTube resource
  app.post('/api/discovery/manual-add', async (req, res) => {
    try {
      if (!await requireAdmin(req, res)) return;
      const { lessonId, youtubeUrl, whyUseful } = req.body;
      if (!lessonId || !youtubeUrl || !getLessonById(lessonId)) {
        return jsonError(res, 400, 'INVALID_REQUEST', 'A valid lesson and YouTube URL or ID are required.');
      }
      const videoId = extractYouTubeVideoId(String(youtubeUrl));
      if (!videoId) return jsonError(res, 400, 'INVALID_YOUTUBE_URL', 'Enter a valid YouTube URL or 11-character video ID.');
      const validation = await validateYouTubeVideo(videoId);
      if (!validation.success || !validation.video) return jsonError(res, 422, validation.error || 'VIDEO_REJECTED', 'The video could not be validated for injection.');
      const video = validation.video;

      const now = new Date().toISOString();
      const id = `res-${lessonId}-${videoId}`;
      const newResource: LessonResource = {
        id,
        lessonId,
        provider: 'youtube',
        providerVideoId: videoId,
        title: video.title,
        description: video.description,
        channelName: video.channelTitle,
        thumbnailUrl: video.thumbnailUrl,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
        durationSeconds: video.durationSeconds,
        durationFormatted: video.durationFormatted,
        publishedAt: video.publishedAt,
        relevanceScore: video.relevanceScore,
        qualityScore: video.qualityScore,
        resourceType: 'EXTERNAL_YOUTUBE',
        status: 'APPROVED',
        isPrimary: true,
        searchQuery: 'manual addition',
        whyUseful: whyUseful || 'Manually approved high-conviction educational guide.',
        validationStatus: 'approved',
        validatedAt: now,
        createdAt: now,
        updatedAt: now
      };

      const saved = ResourceStore.saveResource(newResource);
      ResourceStore.setPrimary(lessonId, id);

      console.info('[CONTENT STUDIO] manual injection', { lessonId, videoId });
      res.type('application/json').json({ success: true, resource: saved });
    } catch (err: any) {
      console.error('Error adding manual resource:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // ==========================================
  // LICENSE MANAGEMENT API ROUTES
  // ==========================================

  // List licenses
  app.get('/api/licenses/list', async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const db = getFirestoreDb();
      if (db) {
        try {
          const [listSnap, auditSnap] = await Promise.all([
            db.collection('licenses').orderBy('createdAt', 'desc').limit(100).get(),
            db.collection('license_audit').orderBy('createdAt', 'desc').limit(100).get()
          ]);
          return res.json({
            success: true,
            licenses: listSnap.docs.map(d => ({ id: d.id, ...d.data() })),
            audit: auditSnap.docs.map(d => ({ id: d.id, ...d.data() }))
          });
        } catch (dbErr) {
          console.warn('[LICENSE LIST] Firestore read error, falling back to LicenseStore:', dbErr);
        }
      }
      return res.json({
        success: true,
        licenses: LicenseStore.getAll(),
        audit: LicenseStore.getAudit()
      });
    } catch (err: any) {
      console.error('[LICENSE LIST] Error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Generate license
  app.post('/api/licenses/generate', async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { assignedEmail, expiresAt, notes } = req.body || {};
      const rawKey = createRawLicenseKey();
      const db = getFirestoreDb();

      if (db) {
        try {
          const id = db.collection('licenses').doc().id;
          const record = {
            keyHash: hashKey(rawKey),
            keyPrefix: rawKey.slice(0, 8),
            status: 'available',
            assignedUid: null,
            assignedEmail: assignedEmail || null,
            createdAt: nowIso(),
            updatedAt: nowIso(),
            activatedAt: null,
            expiresAt: expiresAt || null,
            maxActivations: 1,
            activationCount: 0,
            createdBy: admin.uid,
            notes: String(notes || '')
          };
          await db.collection('licenses').doc(id).set(record);
          await writeAuditRecord(db, {
            licenseId: id,
            action: 'generate',
            actorUid: admin.uid,
            actorEmail: admin.email || null,
            notes: String(notes || '')
          });
          LicenseStore.generate({ assignedEmail, expiresAt, notes, adminUid: admin.uid, adminEmail: admin.email });
          return res.status(201).json({ success: true, license: { id, key: rawKey } });
        } catch (dbErr) {
          console.warn('[LICENSE GENERATE] Firestore error, falling back to LicenseStore:', dbErr);
        }
      }

      const localResult = LicenseStore.generate({
        assignedEmail,
        expiresAt,
        notes,
        adminUid: admin.uid,
        adminEmail: admin.email
      });
      return res.status(201).json({ success: true, license: localResult });
    } catch (err: any) {
      console.error('[LICENSE GENERATE] Error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Activate license
  app.post('/api/licenses/activate', async (req, res) => {
    try {
      const user = await requireUserToken(req, res);
      if (!user) return;
      const key = String(req.body?.licenseKey || '').trim().toUpperCase();
      if (!key) return jsonError(res, 400, 'LICENSE_REQUIRED', 'Enter your license key.');

      const db = getFirestoreDb();
      if (db) {
        try {
          const snapshot = await db.collection('licenses').where('keyHash', '==', hashKey(key)).limit(1).get();
          if (snapshot.empty) {
            const localRes = LicenseStore.activate({ licenseKey: key, userUid: user.uid, userEmail: user.email });
            if (localRes.success) return res.json({ success: true, message: 'ACCESS_GRANTED' });
            return jsonError(res, 422, 'INVALID_LICENSE', 'This license key could not be verified.');
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
              activatedAt: nowIso(),
              updatedAt: nowIso(),
              activationCount: (license.activationCount || 0) + (license.assignedUid ? 0 : 1)
            });
            tx.set(db.collection('users').doc(user.uid), {
              accessStatus: 'active',
              licenseId: ref.id,
              licenseActivatedAt: nowIso(),
              accessExpiresAt: license.expiresAt || null
            }, { merge: true });
          });
          await writeAuditRecord(db, { licenseId: ref.id, action: 'activate', actorUid: user.uid, actorEmail: user.email || null });
          return res.json({ success: true, message: 'ACCESS_GRANTED' });
        } catch (dbErr: any) {
          const knownCodes = ['LICENSE_ALREADY_ACTIVATED', 'LICENSE_REVOKED', 'LICENSE_SUSPENDED', 'LICENSE_EXPIRED'];
          if (knownCodes.includes(dbErr.message)) {
            return jsonError(res, 422, dbErr.message, dbErr.message.replaceAll('_', ' '));
          }
          console.warn('[LICENSE ACTIVATE] Firestore error, falling back to LicenseStore:', dbErr);
        }
      }

      const fallbackResult = LicenseStore.activate({ licenseKey: key, userUid: user.uid, userEmail: user.email });
      if (!fallbackResult.success) {
        return jsonError(res, 422, fallbackResult.error || 'INVALID_LICENSE', fallbackResult.message || 'Activation failed.');
      }
      return res.json({ success: true, message: 'ACCESS_GRANTED' });
    } catch (err: any) {
      console.error('[LICENSE ACTIVATE] Error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Suspend, Revoke, Reactivate
  app.post('/api/licenses/:action', async (req, res, next) => {
    const action = req.params.action;
    if (!['suspend', 'revoke', 'reactivate'].includes(action)) {
      return next();
    }
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { licenseId, reason } = req.body || {};
      if (!licenseId) return jsonError(res, 400, 'LICENSE_ID_REQUIRED', 'License id is required.');

      const db = getFirestoreDb();
      if (db) {
        try {
          const ref = db.collection('licenses').doc(String(licenseId));
          const snap = await ref.get();
          if (snap.exists) {
            const license = snap.data()!;
            const status = action === 'reactivate' ? (license.assignedUid ? 'active' : 'available') : action === 'revoke' ? 'revoked' : 'suspended';
            await ref.update({ status, updatedAt: nowIso(), lifecycleReason: String(reason || '') });
            if (license.assignedUid) {
              await db.collection('users').doc(license.assignedUid).set({
                accessStatus: status === 'active' ? 'active' : status,
                licenseId: String(licenseId),
                accessExpiresAt: status === 'active' ? license.expiresAt || null : null
              }, { merge: true });
            }
            await writeAuditRecord(db, { licenseId: String(licenseId), action, actorUid: admin.uid, actorEmail: admin.email || null, notes: String(reason || '') });
            LicenseStore.updateStatus(String(licenseId), action as any, admin.uid, admin.email, reason);
            return res.json({ success: true, license: { id: licenseId, status } });
          }
        } catch (dbErr) {
          console.warn('[LICENSE LIFECYCLE] Firestore error, falling back to LicenseStore:', dbErr);
        }
      }

      const updateResult = LicenseStore.updateStatus(String(licenseId), action as any, admin.uid, admin.email, reason);
      if (!updateResult.success) {
        return jsonError(res, 404, updateResult.error || 'LICENSE_NOT_FOUND', updateResult.message || 'License not found.');
      }
      return res.json({ success: true, license: updateResult.license });
    } catch (err: any) {
      console.error('[LICENSE LIFECYCLE] Error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // ==========================================
  // VITE / STATIC SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TRENCHLAB University Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
