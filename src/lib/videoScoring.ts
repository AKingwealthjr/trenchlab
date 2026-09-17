import { LessonSearchProfile } from '../types';
import { GLOBAL_NEGATIVE_KEYWORDS, EDUCATIONAL_CHANNELS_ALLOWLIST } from './searchProfiles';

export interface CandidateVideo {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
  thumbnailUrl: string;
  durationSeconds?: number;
  durationFormatted?: string;
  embeddable?: boolean;
}

export interface ScoredVideo extends CandidateVideo {
  relevanceScore: number;
  qualityScore: number;
  isEligible: boolean;
  rejectReason?: string;
  whyUseful: string;
}

/**
 * Parses ISO 8601 duration (e.g. PT14M28S, PT1H2M10S) into seconds and human string.
 */
export function parseYouTubeDuration(isoDuration?: string): { seconds: number; formatted: string } {
  if (!isoDuration) return { seconds: 0, formatted: '00:00' };

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return { seconds: 0, formatted: '00:00' };

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  let formatted = '';
  if (hours > 0) {
    formatted = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    formatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  return { seconds: totalSeconds, formatted };
}

/**
 * Score a candidate video against the lesson search profile.
 */
export function scoreVideoCandidate(
  video: CandidateVideo,
  profile: LessonSearchProfile
): ScoredVideo {
  const lowerTitle = video.title.toLowerCase();
  const lowerDesc = (video.description || '').toLowerCase();
  const lowerChannel = video.channelTitle.toLowerCase();
  const combinedText = `${lowerTitle} ${lowerDesc}`;

  // 1. Check for hard negative / clickbait keywords
  for (const neg of GLOBAL_NEGATIVE_KEYWORDS) {
    if (combinedText.includes(neg)) {
      return {
        ...video,
        relevanceScore: 0,
        qualityScore: 0,
        isEligible: false,
        rejectReason: `Contains clickbait/promotional flag: "${neg}"`,
        whyUseful: 'Rejected due to promotional/unrealistic hype keywords.'
      };
    }
  }

  // If embeddable is explicitly false, reject
  if (video.embeddable === false) {
    return {
      ...video,
      relevanceScore: 0,
      qualityScore: 0,
      isEligible: false,
      rejectReason: 'Video is marked as not embeddable by YouTube creator',
      whyUseful: 'Rejected: cannot be embedded in course player.'
    };
  }

  let relevanceScore = 40; // Base score
  let qualityScore = 50;   // Base quality

  // 2. Exact / Partial Keyword overlap with lesson title
  const titleWords = profile.lessonTitle
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3 && !['what', 'with', 'from', 'your', 'this', 'that', 'into'].includes(w));

  let matchedTitleWords = 0;
  for (const word of titleWords) {
    if (lowerTitle.includes(word)) matchedTitleWords++;
  }
  const titleMatchRatio = titleWords.length > 0 ? matchedTitleWords / titleWords.length : 0;
  relevanceScore += Math.round(titleMatchRatio * 35);

  // 3. Topic overlap
  if (lowerTitle.includes(profile.topic.toLowerCase())) {
    relevanceScore += 15;
  }

  // 4. Learning objective overlap
  const objectiveWords = profile.learningObjective
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 4);
  let matchedObjWords = 0;
  for (const word of objectiveWords) {
    if (combinedText.includes(word)) matchedObjWords++;
  }
  if (matchedObjWords >= 2) {
    relevanceScore += 10;
  }

  // 5. Educational intent signals
  const educationalKeywords = ['tutorial', 'explained', 'guide', 'breakdown', 'course', 'walkthrough', 'basics', 'strategy', 'analysis', 'mastery', 'how to'];
  for (const edu of educationalKeywords) {
    if (lowerTitle.includes(edu)) {
      qualityScore += 6;
      break;
    }
  }

  // 6. Trusted channel quality signal
  const isTrustedChannel = EDUCATIONAL_CHANNELS_ALLOWLIST.some(ch => 
    lowerChannel.includes(ch.toLowerCase())
  );
  if (isTrustedChannel) {
    qualityScore += 20;
    relevanceScore += 5;
  }

  // 7. Video duration check
  const durationSec = video.durationSeconds || 0;
  if (durationSec > 0) {
    // Under 2 mins is too short for a university lesson
    if (durationSec < 120) {
      qualityScore -= 30;
      relevanceScore -= 20;
    } 
    // Ideal educational range: 8 to 35 mins
    else if (durationSec >= 480 && durationSec <= 2100) {
      qualityScore += 12;
    }
    // Very long livestreams (> 1.5 hours) may contain fluff
    else if (durationSec > 5400) {
      qualityScore -= 15;
    }
  }

  // 8. Recency check for fast-evolving DEX / tool topics
  const isFastEvolving = [3, 4, 5, 6, 7].includes(profile.phaseId);
  if (isFastEvolving && video.publishedAt) {
    const pubYear = new Date(video.publishedAt).getFullYear();
    const currentYear = 2025;
    if (pubYear >= currentYear - 2) {
      qualityScore += 10;
    } else if (pubYear < 2023) {
      qualityScore -= 15; // Penalize outdated interface tutorials
    }
  }

  // Clamp scores between 0 and 100
  relevanceScore = Math.max(0, Math.min(100, relevanceScore));
  qualityScore = Math.max(0, Math.min(100, qualityScore));

  const isEligible = relevanceScore >= 45 && qualityScore >= 40;

  // Generate university context explanation
  const whyUseful = `Covers ${profile.topic} with focus on ${profile.learningObjective.slice(0, 70)}... Recommended for ${profile.difficulty.toLowerCase()} operators.`;

  return {
    ...video,
    relevanceScore,
    qualityScore,
    isEligible,
    rejectReason: isEligible ? undefined : 'Relevance or educational quality score below threshold',
    whyUseful
  };
}
