import { CandidateVideo, parseYouTubeDuration, scoreVideoCandidate, ScoredVideo } from '../lib/videoScoring';
import { LessonSearchProfile } from '../types';

export interface YouTubeSearchResult {
  success: boolean;
  apiKeyConfigured: boolean;
  videos: ScoredVideo[];
  error?: string;
  quotaExceeded?: boolean;
}

/**
 * Searches YouTube Data API v3 strictly server-side using YOUTUBE_API_KEY.
 */
export async function searchYouTubeForLesson(
  profile: LessonSearchProfile,
  maxResults = 5
): Promise<YouTubeSearchResult> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_YOUTUBE_API_KEY') {
    return {
      success: false,
      apiKeyConfigured: false,
      videos: [],
      error: 'YOUTUBE_API_KEY is not configured in server environment (.env). Configure an API key from Google Cloud Console to enable live discovery.'
    };
  }

  try {
    const query = profile.primarySearchQuery;
    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    searchUrl.searchParams.set('part', 'snippet');
    searchUrl.searchParams.set('q', query);
    searchUrl.searchParams.set('type', 'video');
    searchUrl.searchParams.set('videoEmbeddable', 'true');
    searchUrl.searchParams.set('relevanceLanguage', 'en');
    searchUrl.searchParams.set('maxResults', String(Math.min(maxResults, 10)));
    searchUrl.searchParams.set('key', apiKey);

    const searchRes = await fetch(searchUrl.toString());

    if (!searchRes.ok) {
      const errText = await searchRes.text();
      let isQuota = searchRes.status === 403 && (errText.includes('quota') || errText.includes('rateLimitExceeded'));
      return {
        success: false,
        apiKeyConfigured: true,
        videos: [],
        quotaExceeded: isQuota,
        error: isQuota 
          ? 'YouTube Data API daily quota limit reached.' 
          : `YouTube API error (${searchRes.status}): ${errText.slice(0, 150)}`
      };
    }

    const searchData = await searchRes.json();
    const items = searchData.items || [];
    if (items.length === 0) {
      return {
        success: true,
        apiKeyConfigured: true,
        videos: []
      };
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
        const detRes = await fetch(detailsUrl.toString());
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
      scoredVideos.push(scored);
    }

    // Sort by relevanceScore descending
    scoredVideos.sort((a, b) => (b.relevanceScore + b.qualityScore) - (a.relevanceScore + a.qualityScore));

    return {
      success: true,
      apiKeyConfigured: true,
      videos: scoredVideos
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

/**
 * Perform manual YouTube search for admin review.
 */
export async function manualYouTubeSearch(
  query: string,
  maxResults = 8
): Promise<{ success: boolean; videos: CandidateVideo[]; error?: string; apiKeyConfigured: boolean }> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_YOUTUBE_API_KEY') {
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

    const res = await fetch(searchUrl.toString());
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
