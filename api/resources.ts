import { firebaseAdmin } from '../src/server/firebaseAdmin';
import { sendJson } from '../src/server/vercelApi';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return sendJson(res, 405, { success: false, error: 'METHOD_NOT_ALLOWED', message: 'Use GET.' });
  try {
    const lessonId = typeof req.query.lessonId === 'string' ? req.query.lessonId : null;
    let query: any = firebaseAdmin().db.collection('lesson_resources').where('status', '==', 'APPROVED');
    if (lessonId) query = query.where('lessonId', '==', lessonId);
    const snapshot = await query.get();
    return sendJson(res, 200, { success: true, resources: snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })) });
  } catch (error) {
    console.error('[RESOURCES] read failure', error);
    return sendJson(res, 503, { success: false, error: 'RESOURCE_SERVICE_UNAVAILABLE', message: 'Video resources are temporarily unavailable.' });
  }
}
