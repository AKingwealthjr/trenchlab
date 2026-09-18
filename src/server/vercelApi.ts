import { createPublicKey, verify } from 'node:crypto';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { adminEmails, firebaseAdmin } from './firebaseAdmin';

export interface VerifiedClaims {
  uid: string;
  email?: string;
}

let firebaseCertificates: Record<string, string> | null = null;
let certificatesExpireAt = 0;

export async function verifyFirebaseTokenFallback(token: string): Promise<VerifiedClaims | null> {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const decode = (val: string) => JSON.parse(Buffer.from(val.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
    const header = decode(parts[0]) as { kid?: string; alg?: string };
    const claims = decode(parts[1]) as { aud?: string; iss?: string; exp?: number; sub?: string; email?: string };
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || 'trenchlab-production';
    
    if (
      !projectId ||
      header.alg !== 'RS256' ||
      !header.kid ||
      !claims.sub ||
      claims.aud !== projectId ||
      claims.iss !== `https://securetoken.google.com/${projectId}` ||
      !claims.exp ||
      claims.exp <= Date.now() / 1000
    ) {
      return null;
    }

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
    console.warn('[VERCEL API] Token fallback verification failed:', error instanceof Error ? error.message : String(error));
    return null;
  }
}

export function sendJson(res: any, status: number, payload: Record<string, unknown>) {
  if (typeof res.status === 'function') {
    res.status(status);
  }
  if (typeof res.setHeader === 'function') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
  }
  if (typeof res.json === 'function') {
    return res.json(payload);
  }
  return res.send(JSON.stringify(payload));
}

export async function requireAdmin(req: any, res: any): Promise<VerifiedClaims | null> {
  const header = req.headers?.authorization;
  if (!header?.startsWith('Bearer ')) {
    sendJson(res, 401, { success: false, error: 'UNAUTHENTICATED', message: 'Sign in is required.' });
    return null;
  }

  const rawToken = header.slice(7);
  let claims: VerifiedClaims | null = null;

  try {
    claims = await firebaseAdmin().auth.verifyIdToken(rawToken);
  } catch {
    claims = await verifyFirebaseTokenFallback(rawToken);
  }

  if (!claims) {
    sendJson(res, 401, { success: false, error: 'UNAUTHENTICATED', message: 'Your session could not be verified.' });
    return null;
  }

  if (!claims.email || !adminEmails().has(claims.email.toLowerCase())) {
    sendJson(res, 403, { success: false, error: 'FORBIDDEN', message: 'Administrator access required.' });
    return null;
  }

  return claims;
}

export async function requireUser(req: any, res: any): Promise<VerifiedClaims | null> {
  const header = req.headers?.authorization;
  if (!header?.startsWith('Bearer ')) {
    sendJson(res, 401, { success: false, error: 'UNAUTHENTICATED', message: 'Sign in is required.' });
    return null;
  }

  const rawToken = header.slice(7);
  let claims: VerifiedClaims | null = null;

  try {
    claims = await firebaseAdmin().auth.verifyIdToken(rawToken);
  } catch {
    claims = await verifyFirebaseTokenFallback(rawToken);
  }

  if (!claims) {
    sendJson(res, 401, { success: false, error: 'UNAUTHENTICATED', message: 'Your session could not be verified.' });
    return null;
  }

  return claims;
}
