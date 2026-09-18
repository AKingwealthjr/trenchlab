import { firebaseAdmin } from '../src/server/firebaseAdmin';
import { ResourceStore } from '../src/server/resourceStore';
import { sendJson } from '../src/server/vercelApi';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return sendJson(res, 405, { success: false, error: 'METHOD_NOT_ALLOWED', message: 'Use GET.' });
  const lessonId = typeof req.query.lessonId === 'string' ? req.query.lessonId : null;
  try {
    let query: any = firebaseAdmin().db.collection('lesson_resources').where('status', '==', 'APPROVED');
    if (lessonId) query = query.where('lessonId', '==', lessonId);
    const snapshot = await query.get();
    const resources = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    if (resources.length > 0 || !lessonId) {
      return sendJson(res, 200, { success: true, resources });
    }
  } catch (error) {
    console.warn('[RESOURCES] Firestore read failed, using ResourceStore fallback:', error);
  }
  const fallback = lessonId ? ResourceStore.getByLessonId(lessonId, true) : ResourceStore.getAll().filter(r => r.status === 'APPROVED');
  return sendJson(res, 200, { success: true, resources: fallback });
}
