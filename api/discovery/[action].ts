import { firebaseAdmin } from '../../src/server/firebaseAdmin';
import { requireAdmin, sendJson } from '../../src/server/vercelApi';
import { CURRICULUM_DATA, getLessonById } from '../../src/data/curriculumData';
import { extractYouTubeVideoId, searchYouTubeForLesson, validateYouTubeVideo } from '../../src/server/youtubeService';
import { generateSearchProfile } from '../../src/lib/searchProfiles';
import type { LessonResource } from '../../src/types';

const resources = () => firebaseAdmin().db.collection('lesson_resources');
const now = () => new Date().toISOString();
const allLessonIds = () => CURRICULUM_DATA.flatMap(phase => phase.lessons.map(lesson => lesson.id));

async function listResources() {
  const snapshot = await resources().get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LessonResource));
}

function resourceFromVideo(lessonId: string, video: any, query: string, existing?: LessonResource): LessonResource {
  const createdAt = existing?.createdAt || now();
  return {
    id: `res-${lessonId}-${video.id}`, lessonId, provider: 'youtube', providerVideoId: video.id,
    title: video.title, description: video.description || '', channelName: video.channelTitle,
    thumbnailUrl: video.thumbnailUrl, youtubeUrl: `https://www.youtube.com/watch?v=${video.id}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`, durationSeconds: video.durationSeconds,
    durationFormatted: video.durationFormatted, publishedAt: video.publishedAt, relevanceScore: video.relevanceScore,
    qualityScore: video.qualityScore, resourceType: 'EXTERNAL_YOUTUBE', status: existing?.status || 'DISCOVERED',
    isPrimary: existing?.isPrimary || false, searchQuery: query, whyUseful: video.whyUseful,
    validationStatus: existing?.validationStatus || 'candidate', createdAt, updatedAt: now()
  };
}

async function status() {
  const data = await listResources();
  const ids = allLessonIds();
  const summary = ids.reduce((acc, lessonId) => {
    const lessonResources = data.filter(resource => resource.lessonId === lessonId);
    if (lessonResources.some(resource => resource.status === 'APPROVED')) acc.approvedResourcesCount++;
    else if (lessonResources.length) acc.needsReviewCount++;
    else acc.withoutResourcesCount++;
    return acc;
  }, { totalLessons: ids.length, approvedResourcesCount: 0, needsReviewCount: 0, withoutResourcesCount: 0 });
  return { success: true, apiKeyConfigured: Boolean(process.env.YOUTUBE_API_KEY?.trim()), totalLessons: ids.length, summary };
}

export default async function handler(req: any, res: any) {
  const action = Array.isArray(req.query.action) ? req.query.action[0] : req.query.action;
  const admin = await requireAdmin(req, res);
  if (!admin) return;
  try {
    if (req.method === 'GET' && action === 'status') return sendJson(res, 200, await status());
    if (req.method === 'GET' && action === 'resources') return sendJson(res, 200, { success: true, resources: await listResources() });

    if (req.method !== 'POST') return sendJson(res, 405, { success: false, error: 'METHOD_NOT_ALLOWED', message: 'Use the documented request method.' });
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    if (action === 'manual-validate') {
      const videoId = extractYouTubeVideoId(String(body.youtubeUrl || body.videoId || ''));
      if (!videoId) return sendJson(res, 400, { success: false, error: 'INVALID_YOUTUBE_URL', message: 'Enter a valid YouTube URL or video ID.' });
      const validation = await validateYouTubeVideo(videoId);
      if (!validation.success || !validation.video) return sendJson(res, validation.error === 'YOUTUBE_API_NOT_CONFIGURED' ? 503 : 422, { success: false, error: validation.error || 'VIDEO_REJECTED', message: 'The video could not be validated.' });
      return sendJson(res, 200, { success: true, video: validation.video });
    }

    if (action === 'manual-add') {
      const lesson = getLessonById(body.lessonId);
      const videoId = extractYouTubeVideoId(String(body.youtubeUrl || ''));
      if (!lesson || !videoId) return sendJson(res, 400, { success: false, error: 'INVALID_REQUEST', message: 'A valid lesson and YouTube URL are required.' });
      const validation = await validateYouTubeVideo(videoId, generateSearchProfile(lesson.lesson, lesson.phase.title));
      if (!validation.success || !validation.video) return sendJson(res, 422, { success: false, error: validation.error || 'VIDEO_REJECTED', message: 'The video could not be validated.' });
      const resource = resourceFromVideo(lesson.lesson.id, validation.video, 'manual addition');
      resource.status = 'APPROVED'; resource.isPrimary = true; resource.validationStatus = 'approved'; resource.validatedAt = now(); resource.whyUseful = String(body.whyUseful || validation.video.whyUseful || '');
      const batch = firebaseAdmin().db.batch();
      const prior = await resources().where('lessonId', '==', lesson.lesson.id).get();
      prior.docs.forEach(doc => batch.update(doc.ref, { isPrimary: false, updatedAt: now() }));
      batch.set(resources().doc(resource.id), resource); await batch.commit();
      return sendJson(res, 200, { success: true, resource });
    }

    if (action === 'discover-single') {
      const lesson = getLessonById(body.lessonId);
      if (!lesson) return sendJson(res, 404, { success: false, error: 'LESSON_NOT_FOUND', message: 'Lesson not found.' });
      const profile = generateSearchProfile(lesson.lesson, lesson.phase.title);
      const result = await searchYouTubeForLesson(profile, Math.min(Number(body.maxResults) || 4, 5));
      if (!result.success) return sendJson(res, result.quotaExceeded ? 429 : 503, { success: false, error: result.quotaExceeded ? 'YOUTUBE_API_QUOTA_REACHED' : result.error || 'YOUTUBE_API_ERROR', message: result.error || 'Discovery failed.' });
      const existing = await listResources();
      const discovered = result.videos.map(video => resourceFromVideo(lesson.lesson.id, video, profile.primarySearchQuery, existing.find(item => item.id === `res-${lesson.lesson.id}-${video.id}`)));
      const batch = firebaseAdmin().db.batch(); discovered.forEach(resource => batch.set(resources().doc(resource.id), resource)); await batch.commit();
      return sendJson(res, 200, { success: true, videosFound: discovered.length, resources: discovered });
    }

    if (action === 'discover-batch') {
      const existing = await listResources();
      const pending = allLessonIds().filter(id => !existing.some(resource => resource.lessonId === id && resource.status === 'APPROVED')).slice(0, 3);
      const results: Record<string, unknown> = {};
      for (const lessonId of pending) {
        const lesson = getLessonById(lessonId)!; const profile = generateSearchProfile(lesson.lesson, lesson.phase.title);
        const result = await searchYouTubeForLesson(profile, 3);
        if (!result.success) { results[lessonId] = { success: false, error: result.error }; if (result.quotaExceeded) break; continue; }
        const batch = firebaseAdmin().db.batch();
        result.videos.forEach(video => { const resource = resourceFromVideo(lessonId, video, profile.primarySearchQuery, existing.find(item => item.id === `res-${lessonId}-${video.id}`)); batch.set(resources().doc(resource.id), resource); });
        await batch.commit(); results[lessonId] = { success: true, found: result.videos.length };
      }
      return sendJson(res, 200, { success: true, processedCount: Object.keys(results).length, results });
    }

    if (action === 'approve') {
      const document = await resources().doc(String(body.resourceId || '')).get();
      if (!document.exists) return sendJson(res, 404, { success: false, error: 'RESOURCE_NOT_FOUND', message: 'Resource not found.' });
      const candidate = document.data() as LessonResource;
      const validation = await validateYouTubeVideo(candidate.providerVideoId);
      if (!validation.success || !validation.video) { await document.ref.update({ status: 'UNAVAILABLE', isPrimary: false, validationStatus: 'unavailable', validationReason: validation.error || 'Validation failed', updatedAt: now() }); return sendJson(res, 422, { success: false, error: validation.error || 'VIDEO_REJECTED', message: 'The video could not be approved.' }); }
      const batch = firebaseAdmin().db.batch(); const sameLesson = await resources().where('lessonId', '==', candidate.lessonId).get();
      sameLesson.docs.forEach(doc => batch.update(doc.ref, { isPrimary: false, updatedAt: now() }));
      batch.update(document.ref, { ...resourceFromVideo(candidate.lessonId, validation.video, candidate.searchQuery, candidate), status: 'APPROVED', isPrimary: true, validationStatus: 'approved', validatedAt: now(), validationReason: null }); await batch.commit();
      return sendJson(res, 200, { success: true });
    }

    if (action === 'reject') { await resources().doc(String(body.resourceId || '')).update({ status: 'REJECTED', isPrimary: false, validationStatus: 'rejected', updatedAt: now() }); return sendJson(res, 200, { success: true }); }
    return sendJson(res, 404, { success: false, error: 'UNKNOWN_ACTION', message: 'Unknown API action.' });
  } catch (error) {
    console.error('[CONTENT STUDIO] API failure', error);
    return sendJson(res, 500, { success: false, error: 'INTERNAL_ERROR', message: 'The server could not complete the request.' });
  }
}
