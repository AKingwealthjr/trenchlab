import fs from 'fs';
import path from 'path';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function findServiceAccountFile(): any | null {
  const cwd = process.cwd();
  const potentialPaths = [
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH,
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    path.resolve(cwd, 'trenchlab-production-firebase-adminsdk-fbsvc-a91535cae0.json'),
    path.resolve(cwd, 'serviceAccountKey.json'),
    path.resolve(cwd, 'src/server/serviceAccountKey.json')
  ].filter(Boolean) as string[];

  for (const filePath of potentialPaths) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.project_id && parsed.client_email && parsed.private_key) {
          return parsed;
        }
      }
    } catch {
      // Continue searching
    }
  }

  // Scan root directory for any firebase-adminsdk file
  try {
    const files = fs.readdirSync(cwd);
    for (const f of files) {
      if (f.includes('firebase-adminsdk') && f.endsWith('.json')) {
        const fullPath = path.join(cwd, f);
        const parsed = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        if (parsed.project_id && parsed.client_email && parsed.private_key) {
          return parsed;
        }
      }
    }
  } catch {
    // Ignore directory read errors
  }

  return null;
}

function serviceAccount() {
  // 1. Check raw JSON string in environment variable
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (raw && raw.trim()) {
    try {
      const parsed = JSON.parse(raw.trim());
      if (parsed.project_id && parsed.client_email && parsed.private_key) return parsed;
    } catch (e) {
      console.warn('[FIREBASE ADMIN] Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON env var:', e);
    }
  }

  // 2. Check base64 encoded JSON in environment variable
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (b64 && b64.trim()) {
    try {
      const decoded = Buffer.from(b64.trim(), 'base64').toString('utf-8');
      const parsed = JSON.parse(decoded);
      if (parsed.project_id && parsed.client_email && parsed.private_key) return parsed;
    } catch (e) {
      console.warn('[FIREBASE ADMIN] Failed to parse FIREBASE_SERVICE_ACCOUNT_BASE64 env var:', e);
    }
  }

  // 3. Check file on disk
  const fromFile = findServiceAccountFile();
  if (fromFile) return fromFile;

  throw new Error('FIREBASE_ADMIN_NOT_CONFIGURED');
}

export function firebaseAdmin() {
  if (!getApps().length) {
    initializeApp({ credential: cert(serviceAccount()) });
  }
  return { auth: getAuth(), db: getFirestore() };
}

export function adminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS || '1alexkingsley@gmail.com,alexkingsley@gmail.com,precilexis@gmail.com')
      .split(',')
      .map(email => email.trim().toLowerCase())
      .filter(Boolean)
  );
}
