import fs from 'fs';
import path from 'path';
import { LessonResource, ResourceStatus, ResourceType, LessonResourceSummaryStatus } from '../types';

const STORAGE_FILE_PATH = path.resolve(process.cwd(), 'src/data/storedResources.json');

// In-memory registry of resources
let resourcesCache: Map<string, LessonResource> = new Map();
let isInitialized = false;

// Initial verified educational YouTube videos for baseline
const INITIAL_SEEDED_RESOURCES: Partial<LessonResource>[] = [
  {
    lessonId: 'l1-01',
    provider: 'youtube',
    providerVideoId: 'rYQgy8QDEBI',
    title: 'What is Cryptocurrency? (Animated Explanation for Beginners)',
    channelName: 'Whiteboard Crypto',
    thumbnailUrl: 'https://img.youtube.com/vi/rYQgy8QDEBI/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=rYQgy8QDEBI',
    embedUrl: 'https://www.youtube-nocookie.com/embed/rYQgy8QDEBI',
    durationSeconds: 398,
    durationFormatted: '06:38',
    publishedAt: '2021-04-20T12:00:00Z',
    relevanceScore: 98,
    qualityScore: 96,
    resourceType: 'EXTERNAL_YOUTUBE',
    status: 'APPROVED',
    isPrimary: true,
    searchQuery: 'what is cryptocurrency explained for beginners',
    whyUseful: 'Explains digital decentralized ledgers, cryptography, and personal custody without technical jargon.'
  },
  {
    lessonId: 'l1-02',
    provider: 'youtube',
    providerVideoId: 'SSo_EIwHSd4',
    title: 'How Does a Blockchain Work - Simply Explained',
    channelName: 'Simply Explained',
    thumbnailUrl: 'https://img.youtube.com/vi/SSo_EIwHSd4/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
    embedUrl: 'https://www.youtube-nocookie.com/embed/SSo_EIwHSd4',
    durationSeconds: 359,
    durationFormatted: '05:59',
    publishedAt: '2021-02-14T12:00:00Z',
    relevanceScore: 97,
    qualityScore: 95,
    resourceType: 'EXTERNAL_YOUTUBE',
    status: 'APPROVED',
    isPrimary: true,
    searchQuery: 'how does a blockchain work simply explained',
    whyUseful: 'Clear visual breakdown of blocks, cryptographic hashes, distributed consensus, and transaction immutability.'
  },
  {
    lessonId: 'l1-03',
    provider: 'youtube',
    providerVideoId: 't0T8t2a65-Y',
    title: 'The Difference Between Coins and Tokens (Explained)',
    channelName: 'Whiteboard Crypto',
    thumbnailUrl: 'https://img.youtube.com/vi/t0T8t2a65-Y/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=t0T8t2a65-Y',
    embedUrl: 'https://www.youtube-nocookie.com/embed/t0T8t2a65-Y',
    durationSeconds: 512,
    durationFormatted: '08:32',
    publishedAt: '2021-06-18T12:00:00Z',
    relevanceScore: 96,
    qualityScore: 97,
    resourceType: 'EXTERNAL_YOUTUBE',
    status: 'APPROVED',
    isPrimary: true,
    searchQuery: 'difference between coins and tokens crypto',
    whyUseful: 'Explains native Layer-1 coins vs smart contract tokens and why gas fees always require native SOL.'
  },
  {
    lessonId: 'l1-04',
    provider: 'youtube',
    providerVideoId: 'g6B3g-L31_o',
    title: 'What is Market Cap in Cryptocurrency? (Explained)',
    channelName: 'Whiteboard Crypto',
    thumbnailUrl: 'https://img.youtube.com/vi/g6B3g-L31_o/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=g6B3g-L31_o',
    embedUrl: 'https://www.youtube-nocookie.com/embed/g6B3g-L31_o',
    durationSeconds: 495,
    durationFormatted: '08:15',
    publishedAt: '2022-03-15T12:00:00Z',
    relevanceScore: 92,
    qualityScore: 95,
    resourceType: 'EXTERNAL_YOUTUBE',
    status: 'APPROVED',
    isPrimary: true,
    searchQuery: 'crypto market cap vs fdv explained',
    whyUseful: 'Explains circulating vs total supply, unit bias, and market cap dynamics with animated diagrams.'
  },
  {
    lessonId: 'l1-06',
    provider: 'youtube',
    providerVideoId: 'cCOhk_z17m4',
    title: 'What is a Liquidity Pool in Crypto? (Animated)',
    channelName: 'Whiteboard Crypto',
    thumbnailUrl: 'https://img.youtube.com/vi/cCOhk_z17m4/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=cCOhk_z17m4',
    embedUrl: 'https://www.youtube-nocookie.com/embed/cCOhk_z17m4',
    durationSeconds: 702,
    durationFormatted: '11:42',
    publishedAt: '2021-08-10T12:00:00Z',
    relevanceScore: 95,
    qualityScore: 98,
    resourceType: 'EXTERNAL_YOUTUBE',
    status: 'APPROVED',
    isPrimary: true,
    searchQuery: 'crypto liquidity explained whiteboard crypto',
    whyUseful: 'Clear visual demonstration of constant product AMM mechanics, pool ratio pricing, and impermanent loss basics.'
  },
  {
    lessonId: 'l1-12',
    provider: 'youtube',
    providerVideoId: 'FbCUHBhf-rU',
    title: 'Using Solana & Finding GEMS!! Complete Guide',
    channelName: 'Coin Bureau',
    thumbnailUrl: 'https://img.youtube.com/vi/FbCUHBhf-rU/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=FbCUHBhf-rU',
    embedUrl: 'https://www.youtube-nocookie.com/embed/FbCUHBhf-rU',
    durationSeconds: 1180,
    durationFormatted: '19:40',
    publishedAt: '2023-11-20T12:00:00Z',
    relevanceScore: 90,
    qualityScore: 94,
    resourceType: 'EXTERNAL_YOUTUBE',
    status: 'APPROVED',
    isPrimary: true,
    searchQuery: 'solana blockchain explained for beginners',
    whyUseful: 'End-to-end breakdown of the high-speed Solana blockchain architecture, SPL tokens, and decentralized exchanges.'
  },
  {
    lessonId: 'l2-01',
    provider: 'youtube',
    providerVideoId: '476m5_z7h8s',
    title: 'The Ultimate Candlestick Patterns Trading Course',
    channelName: 'Rayner Teo',
    thumbnailUrl: 'https://img.youtube.com/vi/476m5_z7h8s/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=476m5_z7h8s',
    embedUrl: 'https://www.youtube-nocookie.com/embed/476m5_z7h8s',
    durationSeconds: 2300,
    durationFormatted: '38:20',
    publishedAt: '2021-05-18T12:00:00Z',
    relevanceScore: 94,
    qualityScore: 96,
    resourceType: 'EXTERNAL_YOUTUBE',
    status: 'APPROVED',
    isPrimary: true,
    searchQuery: 'candlestick patterns trading course rayner teo',
    whyUseful: 'Mastering open/high/low/close psychology, identifying wick rejection vs real buyer absorption on low timeframes.'
  },
  {
    lessonId: 'l2-04',
    provider: 'youtube',
    providerVideoId: 'P9l6sHpj92c',
    title: 'Support And Resistance Trading Strategy for High Win Rates',
    channelName: 'Rayner Teo',
    thumbnailUrl: 'https://img.youtube.com/vi/P9l6sHpj92c/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=P9l6sHpj92c',
    embedUrl: 'https://www.youtube-nocookie.com/embed/P9l6sHpj92c',
    durationSeconds: 1334,
    durationFormatted: '22:14',
    publishedAt: '2022-01-14T12:00:00Z',
    relevanceScore: 91,
    qualityScore: 93,
    resourceType: 'EXTERNAL_YOUTUBE',
    status: 'APPROVED',
    isPrimary: true,
    searchQuery: 'support and resistance trading strategy rayner teo',
    whyUseful: 'How to draw dynamic and horizontal support zones, avoid false breakouts, and trade reclaims.'
  },
  {
    lessonId: 'l3-01',
    provider: 'youtube',
    providerVideoId: 'aUBid1zJC-U',
    title: "Phantom Wallet: Beginner's Crypto GUIDE!! Step-by-Step!!",
    channelName: 'Coin Bureau',
    thumbnailUrl: 'https://img.youtube.com/vi/aUBid1zJC-U/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=aUBid1zJC-U',
    embedUrl: 'https://www.youtube-nocookie.com/embed/aUBid1zJC-U',
    durationSeconds: 868,
    durationFormatted: '14:28',
    publishedAt: '2022-08-11T12:00:00Z',
    relevanceScore: 96,
    qualityScore: 97,
    resourceType: 'EXTERNAL_YOUTUBE',
    status: 'APPROVED',
    isPrimary: true,
    searchQuery: 'phantom wallet setup tutorial solana coin bureau',
    whyUseful: 'Crucial self-custody fundamentals, seed phrase security, burner wallet strategies, and dApp approval revocation.'
  },
  {
    lessonId: 'l6-02',
    provider: 'youtube',
    providerVideoId: 'SGnKaWT1lA8',
    title: "Don't Buy Crypto Before Doing This!! How to DYOR With Bubblemaps",
    channelName: 'CoinGecko',
    thumbnailUrl: 'https://img.youtube.com/vi/SGnKaWT1lA8/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=SGnKaWT1lA8',
    embedUrl: 'https://www.youtube-nocookie.com/embed/SGnKaWT1lA8',
    durationSeconds: 725,
    durationFormatted: '12:05',
    publishedAt: '2023-07-19T12:00:00Z',
    relevanceScore: 95,
    qualityScore: 96,
    resourceType: 'EXTERNAL_YOUTUBE',
    status: 'APPROVED',
    isPrimary: true,
    searchQuery: 'bubblemaps tutorial crypto wallet cluster coingecko',
    whyUseful: 'Shows how to visually identify clustered wallets, hidden dev allocations, and cross-wallet supply hoarding.'
  },
  {
    lessonId: 'l10-02',
    provider: 'youtube',
    providerVideoId: 'kIq8yXq0Tj4',
    title: 'Risk Management & Position Sizing in Trading',
    channelName: 'Rayner Teo',
    thumbnailUrl: 'https://img.youtube.com/vi/kIq8yXq0Tj4/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=kIq8yXq0Tj4',
    embedUrl: 'https://www.youtube-nocookie.com/embed/kIq8yXq0Tj4',
    durationSeconds: 1263,
    durationFormatted: '21:03',
    publishedAt: '2021-09-02T12:00:00Z',
    relevanceScore: 92,
    qualityScore: 95,
    resourceType: 'EXTERNAL_YOUTUBE',
    status: 'APPROVED',
    isPrimary: true,
    searchQuery: 'position sizing risk management trading tutorial rayner teo',
    whyUseful: 'Mathematical formulas for calculating risk per trade, stop loss placement, and avoiding ruin in volatile assets.'
  }
];

function initStoreIfNeeded() {
  if (isInitialized) return;
  resourcesCache = new Map();

  // Try reading from file
  if (fs.existsSync(STORAGE_FILE_PATH)) {
    try {
      const raw = fs.readFileSync(STORAGE_FILE_PATH, 'utf-8');
      const parsed: LessonResource[] = JSON.parse(raw);
      for (const res of parsed) {
        if (res.status === 'APPROVED' && !res.validatedAt) {
          res.status = 'NEEDS_REVIEW';
          res.isPrimary = false;
          res.validationStatus = 'needs_review';
          res.validationReason = 'Legacy resource requires YouTube revalidation.';
        }
        resourcesCache.set(res.id, res);
      }
    } catch (e) {
      console.error('Failed reading storedResources.json, seeding defaults', e);
    }
  }

  // Historical samples are never enabled by default. Production resources must
  // be discovered and validated against YouTube before they can be approved.
  if (resourcesCache.size === 0 && process.env.ALLOW_LEGACY_RESOURCE_SEED === 'true') {
    for (const seed of INITIAL_SEEDED_RESOURCES) {
      const id = `res-${seed.lessonId}-${seed.providerVideoId}`;
      const now = new Date().toISOString();
      const complete: LessonResource = {
        id,
        lessonId: seed.lessonId!,
        provider: 'youtube',
        providerVideoId: seed.providerVideoId!,
        title: seed.title!,
        description: seed.whyUseful || '',
        channelName: seed.channelName || 'YouTube Educational Channel',
        thumbnailUrl: seed.thumbnailUrl!,
        youtubeUrl: seed.youtubeUrl!,
        embedUrl: seed.embedUrl!,
        durationSeconds: seed.durationSeconds || 600,
        durationFormatted: seed.durationFormatted || '10:00',
        publishedAt: seed.publishedAt || now,
        relevanceScore: seed.relevanceScore || 90,
        qualityScore: seed.qualityScore || 90,
        resourceType: seed.resourceType || 'EXTERNAL_YOUTUBE',
        status: seed.status || 'APPROVED',
        isPrimary: seed.isPrimary ?? true,
        searchQuery: seed.searchQuery || '',
        whyUseful: seed.whyUseful,
        createdAt: now,
        updatedAt: now
      };
      resourcesCache.set(id, complete);
    }
    persistToFile();
  }

  isInitialized = true;
}

function persistToFile() {
  try {
    const list = Array.from(resourcesCache.values());
    const dir = path.dirname(STORAGE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORAGE_FILE_PATH, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist storedResources.json:', err);
  }
}

export const ResourceStore = {
  getAll(): LessonResource[] {
    initStoreIfNeeded();
    return Array.from(resourcesCache.values());
  },

  getByLessonId(lessonId: string, onlyApproved = false): LessonResource[] {
    initStoreIfNeeded();
    const all = Array.from(resourcesCache.values()).filter(r => r.lessonId === lessonId);
    if (onlyApproved) {
      return all.filter(r => r.status === 'APPROVED');
    }
    return all;
  },

  getById(resourceId: string): LessonResource | undefined {
    initStoreIfNeeded();
    return resourcesCache.get(resourceId);
  },

  saveResource(resource: LessonResource): LessonResource {
    initStoreIfNeeded();
    resource.updatedAt = new Date().toISOString();
    resourcesCache.set(resource.id, resource);
    persistToFile();
    return resource;
  },

  approve(resourceId: string, isPrimary = false): LessonResource | null {
    initStoreIfNeeded();
    const res = resourcesCache.get(resourceId);
    if (!res) return null;

    if (isPrimary) {
      // Clear previous primary for this lesson
      for (const item of resourcesCache.values()) {
        if (item.lessonId === res.lessonId && item.isPrimary) {
          item.isPrimary = false;
          item.updatedAt = new Date().toISOString();
        }
      }
    }

    res.status = 'APPROVED';
    res.isPrimary = isPrimary || res.isPrimary;
    res.updatedAt = new Date().toISOString();
    persistToFile();
    return res;
  },

  reject(resourceId: string): LessonResource | null {
    initStoreIfNeeded();
    const res = resourcesCache.get(resourceId);
    if (!res) return null;

    res.status = 'REJECTED';
    res.isPrimary = false;
    res.updatedAt = new Date().toISOString();
    persistToFile();
    return res;
  },

  archive(resourceId: string): LessonResource | null {
    initStoreIfNeeded();
    const res = resourcesCache.get(resourceId);
    if (!res) return null;

    res.status = 'ARCHIVED';
    res.isPrimary = false;
    res.updatedAt = new Date().toISOString();
    persistToFile();
    return res;
  },

  setPrimary(lessonId: string, resourceId: string): LessonResource | null {
    initStoreIfNeeded();
    const target = resourcesCache.get(resourceId);
    if (!target || target.lessonId !== lessonId) return null;

    for (const item of resourcesCache.values()) {
      if (item.lessonId === lessonId) {
        item.isPrimary = (item.id === resourceId);
        item.updatedAt = new Date().toISOString();
      }
    }

    target.status = 'APPROVED';
    persistToFile();
    return target;
  },

  getSummary(allLessonIds: string[]): {
    totalLessons: number;
    approvedResourcesCount: number;
    needsReviewCount: number;
    withoutResourcesCount: number;
    lessonStatusMap: Record<string, LessonResourceSummaryStatus>;
  } {
    initStoreIfNeeded();
    const totalLessons = allLessonIds.length;
    let approvedResourcesCount = 0;
    let needsReviewCount = 0;
    let withoutResourcesCount = 0;
    const lessonStatusMap: Record<string, LessonResourceSummaryStatus> = {};

    for (const lessonId of allLessonIds) {
      const items = Array.from(resourcesCache.values()).filter(r => r.lessonId === lessonId);
      const approved = items.filter(r => r.status === 'APPROVED');
      const discovered = items.filter(r => ['DISCOVERED', 'VALIDATED', 'REVIEWED', 'NEEDS_REVIEW', 'UNAVAILABLE'].includes(r.status));

      approvedResourcesCount += approved.length;
      needsReviewCount += discovered.length;

      if (approved.length > 0) {
        lessonStatusMap[lessonId] = 'RESOURCE_READY';
      } else if (discovered.length > 0) {
        lessonStatusMap[lessonId] = 'NEEDS_REVIEW';
      } else {
        lessonStatusMap[lessonId] = 'NEEDS_RESOURCE';
        withoutResourcesCount++;
      }
    }

    return {
      totalLessons,
      approvedResourcesCount,
      needsReviewCount,
      withoutResourcesCount,
      lessonStatusMap
    };
  }
};
