import { CandidateVideo, parseYouTubeDuration, scoreVideoCandidate, ScoredVideo } from '../lib/videoScoring';
import { Lesson, LessonSearchProfile } from '../types';
import { generateSearchProfile } from '../lib/searchProfiles';

export interface YouTubeSearchResult {
  success: boolean;
  apiKeyConfigured: boolean;
  videos: ScoredVideo[];
  error?: string;
  quotaExceeded?: boolean;
}

export interface YouTubeValidationResult {
  success: boolean;
  apiKeyConfigured: boolean;
  error?: string;
  video?: ScoredVideo;
}

export function extractYouTubeVideoId(value: string): string | null {
  const input = value.trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  try {
    const url = new URL(input);
    const id = url.hostname.includes('youtu.be')
      ? url.pathname.split('/').filter(Boolean)[0]
      : url.searchParams.get('v') || (url.pathname.match(/\/(?:embed|shorts)\/([A-Za-z0-9_-]{11})/) || [])[1];
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    const match = input.match(/(?:v=|\/)([A-Za-z0-9_-]{11})(?:[?&/]|$)/);
    return match?.[1] || null;
  }
}

function getYouTubeApiKey(): string | null {
  const key = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY || '';
  if (!key || key.trim() === '' || key === 'MY_YOUTUBE_API_KEY') return null;
  return key.trim();
}

/** Search is only a candidate source. This calls videos.list before any approval. */
export async function validateYouTubeVideo(videoId: string, profile?: LessonSearchProfile): Promise<YouTubeValidationResult> {
  const apiKey = getYouTubeApiKey();
  if (!apiKey) return { success: false, apiKeyConfigured: false, error: 'YOUTUBE_API_NOT_CONFIGURED' };
  try {
    const url = new URL('https://www.googleapis.com/youtube/v3/videos');
    url.searchParams.set('part', 'snippet,contentDetails,status');
    url.searchParams.set('id', videoId);
    url.searchParams.set('key', apiKey);
    const response = await fetch(url, {
      headers: {
        'Referer': 'https://thetrenchlab.vercel.app/',
        'X-Referer': 'https://thetrenchlab.vercel.app/'
      }
    });
    if (!response.ok) {
      const body = await response.text();
      const quota = response.status === 403 && /quota|rateLimitExceeded/i.test(body);
      const refererBlocked = response.status === 403 && /referer|blocked/i.test(body);
      if (refererBlocked) console.error('[YOUTUBE] API key referer restriction is blocking server requests. Go to Google Cloud Console → API Key → Remove or update HTTP referrer restrictions.');
      return { success: false, apiKeyConfigured: true, error: quota ? 'YOUTUBE_API_QUOTA_REACHED' : refererBlocked ? 'YOUTUBE_API_REFERER_BLOCKED' : `YOUTUBE_API_ERROR_${response.status}` };
    }
    const item = ((await response.json()) as { items?: any[] }).items?.[0];
    if (!item) return { success: false, apiKeyConfigured: true, error: 'VIDEO_NOT_FOUND' };
    if (item.status?.privacyStatus !== 'public') return { success: false, apiKeyConfigured: true, error: 'VIDEO_UNAVAILABLE' };
    if (item.status?.embeddable !== true) return { success: false, apiKeyConfigured: true, error: 'VIDEO_NOT_EMBEDDABLE' };
    const duration = parseYouTubeDuration(item.contentDetails?.duration);
    const candidate: CandidateVideo = {
      id: item.id,
      title: item.snippet?.title || '', description: item.snippet?.description || '', channelTitle: item.snippet?.channelTitle || '',
      publishedAt: item.snippet?.publishedAt || '', thumbnailUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`,
      embeddable: true, durationSeconds: duration.seconds, durationFormatted: duration.formatted
    };
    const fallbackProfile: LessonSearchProfile = { lessonId: 'manual', lessonTitle: candidate.title, lessonDescription: '', phaseId: 0, phaseTitle: '', topic: candidate.title, difficulty: 'BEGINNER', learningObjective: '', primarySearchQuery: '', secondarySearchQueries: [], negativeKeywords: [], preferredVideoLength: 'MEDIUM', preferredContentType: 'educational' };
    const video = scoreVideoCandidate(candidate, profile || fallbackProfile);
    return video.isEligible
      ? { success: true, apiKeyConfigured: true, video }
      : { success: false, apiKeyConfigured: true, error: 'VIDEO_REJECTED' };
  } catch (error) {
    console.error('[YOUTUBE] validation failed', { videoId, error: error instanceof Error ? error.message : String(error) });
    return { success: false, apiKeyConfigured: true, error: 'YOUTUBE_NETWORK_ERROR' };
  }
}

// In-memory cache for YouTube responses: cacheKey = youtube:${lessonId}:${query}
const youtubeResponseCache = new Map<string, ScoredVideo[]>();

/**
 * Executes a single YouTube Data API v3 query with details lookup and candidate scoring.
 */
async function executeYouTubeQuery(
  query: string,
  profile: LessonSearchProfile,
  apiKey: string,
  maxResults: number
): Promise<{ videos: ScoredVideo[]; rawCount: number; quotaExceeded: boolean; error?: string }> {
  try {
    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    searchUrl.searchParams.set('part', 'snippet');
    searchUrl.searchParams.set('q', query);
    searchUrl.searchParams.set('type', 'video');
    searchUrl.searchParams.set('videoEmbeddable', 'true');
    searchUrl.searchParams.set('relevanceLanguage', 'en');
    searchUrl.searchParams.set('maxResults', String(Math.min(maxResults, 10)));
    searchUrl.searchParams.set('key', apiKey);

    const searchRes = await fetch(searchUrl.toString(), {
      headers: {
        'Referer': 'https://thetrenchlab.vercel.app/',
        'X-Referer': 'https://thetrenchlab.vercel.app/'
      }
    });

    if (!searchRes.ok) {
      const errText = await searchRes.text();
      const isQuota = searchRes.status === 403 && (errText.includes('quota') || errText.includes('rateLimitExceeded'));
      const isRefererBlocked = searchRes.status === 403 && (errText.includes('referer') || errText.includes('Referer') || errText.includes('blocked'));
      if (isRefererBlocked) console.error('[YOUTUBE] Referrer restriction is blocking server-side API calls. Remove HTTP referrer restrictions from your API key in Google Cloud Console.');
      return {
        videos: [],
        rawCount: 0,
        quotaExceeded: isQuota,
        error: isQuota
          ? 'YouTube Data API daily quota limit reached.'
          : isRefererBlocked
          ? 'YouTube API key has referrer restrictions blocking server-side calls. In Google Cloud Console, remove HTTP referrer restrictions from this API key.'
          : `YouTube API error (${searchRes.status}): ${errText.slice(0, 150)}`
      };
    }

    const searchData = await searchRes.json();
    const items = searchData.items || [];
    if (items.length === 0) {
      return { videos: [], rawCount: 0, quotaExceeded: false };
    }

    // Extract video IDs to fetch detailed info (durations, embeddability)
    const videoIds = items.map((it: any) => it.id?.videoId).filter(Boolean);
    let detailedVideosMap: Record<string, { durationIso?: string; embeddable?: boolean }> = {};

    if (videoIds.length > 0) {
      const detailsUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
      detailsUrl.searchParams.set('part', 'contentDetails,status');
      detailsUrl.searchParams.set('id', videoIds.join(','));
      detailsUrl.searchParams.set('key', apiKey);

      try {
        const detRes = await fetch(detailsUrl.toString(), {
          headers: {
            'Referer': 'https://thetrenchlab.vercel.app/',
            'X-Referer': 'https://thetrenchlab.vercel.app/'
          }
        });
        if (detRes.ok) {
          const detData = await detRes.json();
          for (const item of (detData.items || [])) {
            detailedVideosMap[item.id] = {
              durationIso: item.contentDetails?.duration,
              embeddable: item.status?.embeddable !== false
            };
          }
        }
      } catch (detErr) {
        console.warn('Could not fetch video details, proceeding with basic snippet data', detErr);
      }
    }

    // Map and score candidates
    const scoredVideos: ScoredVideo[] = [];

    for (const item of items) {
      const vidId = item.id?.videoId;
      if (!vidId) continue;

      const details = detailedVideosMap[vidId] || {};
      const { seconds, formatted } = parseYouTubeDuration(details.durationIso);

      const candidate: CandidateVideo = {
        id: vidId,
        title: item.snippet?.title || '',
        description: item.snippet?.description || '',
        channelTitle: item.snippet?.channelTitle || 'Unknown Channel',
        publishedAt: item.snippet?.publishedAt || '',
        thumbnailUrl: item.snippet?.thumbnails?.high?.url || 
                     item.snippet?.thumbnails?.medium?.url || 
                     `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`,
        durationSeconds: seconds,
        durationFormatted: formatted,
        embeddable: details.embeddable !== false
      };

      const scored = scoreVideoCandidate(candidate, profile);
      // Filter out low relevance candidates (score < 50)
      if (scored.relevanceScore >= 50 && scored.isEligible) {
        scoredVideos.push(scored);
      }
    }

    // Sort by relevanceScore descending
    scoredVideos.sort((a, b) => (b.relevanceScore + b.qualityScore) - (a.relevanceScore + a.qualityScore));

    return {
      videos: scoredVideos,
      rawCount: items.length,
      quotaExceeded: false
    };
  } catch (err: any) {
    return {
      videos: [],
      rawCount: 0,
      quotaExceeded: false,
      error: err instanceof Error ? err.message : String(err)
    };
  }
}

/**
 * Searches YouTube Data API v3 strictly server-side using YOUTUBE_API_KEY.
 * Receives either a Lesson or a LessonSearchProfile.
 * Never uses a global video variable; cached strictly by lessonId and query.
 */
export async function searchYouTubeForLesson(
  lessonOrProfile: Lesson | LessonSearchProfile,
  maxResults = 5
): Promise<YouTubeSearchResult> {
  const apiKey = getYouTubeApiKey();

  if (!apiKey) {
    return {
      success: false,
      apiKeyConfigured: false,
      videos: [],
      error: 'YOUTUBE_API_KEY is not configured in server environment (.env). Configure an API key from Google Cloud Console to enable live discovery.'
    };
  }

  // Derive profile and lesson identifiers
  const profile: LessonSearchProfile = 'primarySearchQuery' in lessonOrProfile
    ? lessonOrProfile
    : generateSearchProfile(lessonOrProfile, `Phase ${lessonOrProfile.phaseId}`);

  const lessonId = profile.lessonId;
  const lessonTitle = profile.lessonTitle;

  // Build query sequence: primary search query, followed by secondary search queries
  const queriesToTry = [
    profile.primarySearchQuery,
    ...(profile.secondarySearchQueries || [])
  ].filter(Boolean);

  let accumulatedVideos: ScoredVideo[] = [];
  const seenVideoIds = new Set<string>();

  for (const query of queriesToTry) {
    // Check server cache first: cacheKey = youtube:${lessonId}:${query}
    const cacheKey = `youtube:${lessonId}:${query}`;
    let queryVideos: ScoredVideo[] = [];
    let rawResultCount = 0;

    if (youtubeResponseCache.has(cacheKey)) {
      queryVideos = youtubeResponseCache.get(cacheKey)!;
      rawResultCount = queryVideos.length;
    } else {
      const res = await executeYouTubeQuery(query, profile, apiKey, maxResults);
      if (res.quotaExceeded) {
        return {
          success: false,
          apiKeyConfigured: true,
          videos: accumulatedVideos,
          quotaExceeded: true,
          error: res.error
        };
      }
      if (res.error && accumulatedVideos.length === 0) {
        return {
          success: false,
          apiKeyConfigured: true,
          videos: [],
          error: res.error
        };
      }

      queryVideos = res.videos;
      rawResultCount = res.rawCount;
      youtubeResponseCache.set(cacheKey, queryVideos);
    }

    // Server-side logging for development & auditing
    console.log('=== YOUTUBE DISCOVERY LOG ===');
    console.log('LESSON:', lessonId);
    console.log('TITLE:', lessonTitle);
    console.log('QUERY:', query);
    console.log('RESULTS:', rawResultCount);
    if (queryVideos.length > 0) {
      console.log('TOP CANDIDATE:', queryVideos[0].title);
      console.log('VIDEO ID:', queryVideos[0].id);
      console.log('SCORE:', queryVideos[0].relevanceScore);
    } else {
      console.log('TOP CANDIDATE: None (relevance below threshold or zero results)');
    }
    console.log('=============================');

    // Accumulate unique candidates
    for (const v of queryVideos) {
      if (!seenVideoIds.has(v.id)) {
        seenVideoIds.add(v.id);
        accumulatedVideos.push(v);
      }
    }

    // If we have at least 2 high-scoring candidates, avoid burning quota with secondary queries
    if (accumulatedVideos.length >= 2) {
      break;
    }
  }

  // Sort accumulated videos by overall score descending
  accumulatedVideos.sort((a, b) => (b.relevanceScore + b.qualityScore) - (a.relevanceScore + a.qualityScore));

  return {
    success: true,
    apiKeyConfigured: true,
    videos: accumulatedVideos.slice(0, maxResults)
  };
}

/**
 * Perform manual YouTube search for admin review.
 */
export async function manualYouTubeSearch(
  query: string,
  maxResults = 8
): Promise<{ success: boolean; videos: CandidateVideo[]; error?: string; apiKeyConfigured: boolean }> {
  const apiKey = getYouTubeApiKey();

  if (!apiKey) {
    return {
      success: false,
      apiKeyConfigured: false,
      videos: [],
      error: 'YOUTUBE_API_KEY is not configured on the server. Please add your key to .env'
    };
  }

  try {
    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    searchUrl.searchParams.set('part', 'snippet');
    searchUrl.searchParams.set('q', query);
    searchUrl.searchParams.set('type', 'video');
    searchUrl.searchParams.set('videoEmbeddable', 'true');
    searchUrl.searchParams.set('relevanceLanguage', 'en');
    searchUrl.searchParams.set('maxResults', String(maxResults));
    searchUrl.searchParams.set('key', apiKey);

    const res = await fetch(searchUrl.toString(), {
      headers: {
        'Referer': 'https://thetrenchlab.vercel.app/',
        'X-Referer': 'https://thetrenchlab.vercel.app/'
      }
    });
    if (!res.ok) {
      return {
        success: false,
        apiKeyConfigured: true,
        videos: [],
        error: `YouTube API returned status ${res.status}`
      };
    }

    const data = await res.json();
    const items = data.items || [];
    const candidates: CandidateVideo[] = items.map((item: any) => {
      const vidId = item.id?.videoId || '';
      return {
        id: vidId,
        title: item.snippet?.title || '',
        description: item.snippet?.description || '',
        channelTitle: item.snippet?.channelTitle || 'Unknown Channel',
        publishedAt: item.snippet?.publishedAt || '',
        thumbnailUrl: item.snippet?.thumbnails?.medium?.url || `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`,
        embeddable: true
      };
    }).filter((c: CandidateVideo) => Boolean(c.id));

    return {
      success: true,
      apiKeyConfigured: true,
      videos: candidates
    };
  } catch (err: any) {
    return {
      success: false,
      apiKeyConfigured: true,
      videos: [],
      error: err instanceof Error ? err.message : String(err)
    };
  }
}
