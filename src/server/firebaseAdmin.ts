import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function serviceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('FIREBASE_ADMIN_NOT_CONFIGURED');
  try {
    const parsed = JSON.parse(raw);
    if (!parsed.project_id || !parsed.client_email || !parsed.private_key) throw new Error('Invalid service account');
    return parsed;
  } catch {
    throw new Error('FIREBASE_ADMIN_NOT_CONFIGURED');
  }
}

export function firebaseAdmin() {
  if (!getApps().length) initializeApp({ credential: cert(serviceAccount()) });
  return { auth: getAuth(), db: getFirestore() };
}

export function adminEmails() {
  return new Set((process.env.ADMIN_EMAILS || '1alexkingsley@gmail.com,alexkingsley@gmail.com,precilexis@gmail.com').split(',').map(email => email.trim().toLowerCase()).filter(Boolean));
}
