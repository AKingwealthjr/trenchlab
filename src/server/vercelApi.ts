import type { DecodedIdToken } from 'firebase-admin/auth';
import { adminEmails, firebaseAdmin } from './firebaseAdmin';

export function sendJson(res: any, status: number, payload: Record<string, unknown>) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8').send(JSON.stringify(payload));
}

export async function requireAdmin(req: any, res: any): Promise<DecodedIdToken | null> {
  const header = req.headers?.authorization;
  if (!header?.startsWith('Bearer ')) {
    sendJson(res, 401, { success: false, error: 'UNAUTHENTICATED', message: 'Sign in is required.' });
    return null;
  }
  try {
    const token = await firebaseAdmin().auth.verifyIdToken(header.slice(7));
    if (!token.email || !adminEmails().has(token.email.toLowerCase())) {
      sendJson(res, 403, { success: false, error: 'FORBIDDEN', message: 'Administrator access required.' });
      return null;
    }
    return token;
  } catch (error) {
    const code = error instanceof Error && error.message === 'FIREBASE_ADMIN_NOT_CONFIGURED' ? 'FIREBASE_ADMIN_NOT_CONFIGURED' : 'UNAUTHENTICATED';
    sendJson(res, code === 'UNAUTHENTICATED' ? 401 : 503, { success: false, error: code, message: code === 'UNAUTHENTICATED' ? 'Your session could not be verified.' : 'Server authentication is not configured.' });
    return null;
  }
}

export async function requireUser(req: any, res: any): Promise<DecodedIdToken | null> {
  const header = req.headers?.authorization;
  if (!header?.startsWith('Bearer ')) {
    sendJson(res, 401, { success: false, error: 'UNAUTHENTICATED', message: 'Sign in is required.' });
    return null;
  }
  try { return await firebaseAdmin().auth.verifyIdToken(header.slice(7)); }
  catch (error) {
    const code = error instanceof Error && error.message === 'FIREBASE_ADMIN_NOT_CONFIGURED' ? 'FIREBASE_ADMIN_NOT_CONFIGURED' : 'UNAUTHENTICATED';
    sendJson(res, code === 'UNAUTHENTICATED' ? 401 : 503, { success: false, error: code, message: 'Your session could not be verified.' });
    return null;
  }
}
