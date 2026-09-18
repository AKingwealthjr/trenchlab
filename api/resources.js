// src/server/firebaseAdmin.ts
import fs from "fs";
import path from "path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
function findServiceAccountFile() {
  const cwd = process.cwd();
  const potentialPaths = [
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH,
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    path.resolve(cwd, "trenchlab-production-firebase-adminsdk-fbsvc-a91535cae0.json"),
    path.resolve(cwd, "serviceAccountKey.json"),
    path.resolve(cwd, "src/server/serviceAccountKey.json")
  ].filter(Boolean);
  for (const filePath of potentialPaths) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(raw);
        if (parsed.project_id && parsed.client_email && parsed.private_key) {
          return parsed;
        }
      }
    } catch {
    }
  }
  try {
    const files = fs.readdirSync(cwd);
    for (const f of files) {
      if (f.includes("firebase-adminsdk") && f.endsWith(".json")) {
        const fullPath = path.join(cwd, f);
        const parsed = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
        if (parsed.project_id && parsed.client_email && parsed.private_key) {
          return parsed;
        }
      }
    }
  } catch {
  }
  return null;
}
function serviceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (raw && raw.trim()) {
    try {
      const parsed = JSON.parse(raw.trim());
      if (parsed.project_id && parsed.client_email && parsed.private_key) return parsed;
    } catch (e) {
      console.warn("[FIREBASE ADMIN] Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON env var:", e);
    }
  }
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (b64 && b64.trim()) {
    try {
      const decoded = Buffer.from(b64.trim(), "base64").toString("utf-8");
      const parsed = JSON.parse(decoded);
      if (parsed.project_id && parsed.client_email && parsed.private_key) return parsed;
    } catch (e) {
      console.warn("[FIREBASE ADMIN] Failed to parse FIREBASE_SERVICE_ACCOUNT_BASE64 env var:", e);
    }
  }
  const fromFile = findServiceAccountFile();
  if (fromFile) return fromFile;
  return {
    type: "service_account",
    project_id: "trenchlab-production",
    private_key_id: "a91535cae038c661a21b29c37eeb3b7538cf1531",
    private_key: [
      "-----BEGIN PRIVATE KEY-----",
      "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5S0mbSyob1vkS",
      "GhI/rhinu+XaE7JAQcmGMUg5V7ZYuTRdlg0KnGqS5So0ziuvKHC+RFra3Vu5rqr9",
      "LX/maQt+A6CUgOUQ0a0TJ3JyqlYJcPhJLPHI0vt4iioAMdP9CuW6nA8rNcVFxP63",
      "CZqL1bZr+8HmA0Nvzr9kGTw0I/Ejv4CYSCVMWJrUskSCxVatUJjzOlnYehaLAFHP",
      "WwODs1pxTlll2CGGVTo0D0/lZwt9T5ZjHJ+Uz+YWoNHpMn7cpMOeQnX+JlGTi/l4",
      "Jb14Opl7wZBQVXOwbFzzw6uGWumxHvYIJxRDBoesIS3RlDvdCZ+IyKxefPgfuZoy",
      "q0rDs3OTAgMBAAECggEAPvizsLeoPWLfLcQ3fHXNwj9su6Li+syA0P6xpW9GNLvo",
      "bH/AueDzpS2FnQGOPg5X1onDeMsuz5lpWfabF3KOqcpQyfdOIduoXrCSyB5UdAv1",
      "DWVdXFs7hDksUfmdKkuITFWaIBy7iN0MlacJY0mDoAok2Oc2BWr1h26+E5g9bOCl",
      "obZVne0vtCZky+nyNyYGQq8Xg2knQIXDBkg11mlc4eNUfpDCXTWJjLRwTGHpYvg5",
      "4zH2sMRCGPQfpo9W4cWA+0LMYFe9n6JRRSOdhJJmWxpBvAJwwMkvEAkgi+hcl3OX",
      "kgIuKUaMzfrgCE/7x8GGrxdqG7Hn25fTVC7LITVMRQKBgQDePDZZmPiSpJmSmsUk",
      "1yEAsnVSeTUvS3R7MfgCg0+SKIvRW2D+TcEaDo3tJxcuG+M6UkQ2VvJ4NB6Sn4uw",
      "yIX0TnfrN/8eIN8cFmRYY4RBv2hBRr0bTOxa/4DaE29dVoN8tjUzvILTA3JElsnb",
      "vmqLpKqlVpBrMvlDYRLjywNJrwKBgQDVckJRz0MGgAk8c4py3lxzezfi0jrstit7",
      "z81s6VeOHDfdC8FrF+QNRUTqcBTYg6O9RXvbZboKcStxgLsdlM71R3AFAVt7Vq0y",
      "/tEDbP+kCGi5XBAAH6nHTyurFlk5Vb++MltAhhevKKBnzhvfYN0PTEHrwSNaboQ0",
      "FXLe6UgBXQKBgAjWQBsD+C5smSa5PMmgPFG4xu2GoFTHHVSgwgnnisx3DEhA5/R0",
      "xw7wMTiS61sMBNcW2luGzZF2ERkneviGoLz8OcyCp4RdLkIBqe/R1TqAD/c4huCF",
      "CIj9y/Pf/feqLwRQgoESJ+mYI30SueghBD+VRqvYa1m35y2EuKmSMwlFAoGBAMaN",
      "dyvrBYpyaCUXxd59ArtaD+6raazw+Ro/f/SkS5IipcS2PsKEgtvlZ+o9QOb37cUP",
      "cdvxkVJNXABFo8ostyhrv8SoMpVVV+BsMbpiFpxcRi7HeQrkaWbCOvj33R/8qFUh",
      "OsmW80k5HZ3ymPL+hCTK5zeLfnuM+uYIXccGcrjxAoGARHlZvUHuOst6o5SnJgID",
      "tUuWoQjRJzl9zn1QID2EoMQ/GU1UZQucHEiTSD8DQrVRNJUV9An4f//jfngBKE77",
      "4tylmfkh/dsphgAjIAEjzJqYUcDTXeRwLlpkMggQP7rQNN3nhWIZ0UtKqiufKmZJ",
      "/NAiVgRWw8DzTK7g7FshY50=",
      "-----END PRIVATE KEY-----"
    ].join("\n") + "\n",
    client_email: "firebase-adminsdk-fbsvc@trenchlab-production.iam.gserviceaccount.com",
    client_id: "106193632566855617729",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40trenchlab-production.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  };
}
function firebaseAdmin() {
  if (!getApps().length) {
    initializeApp({ credential: cert(serviceAccount()) });
  }
  return { auth: getAuth(), db: getFirestore() };
}

// src/server/resourceStore.ts
import fs2 from "fs";
import path2 from "path";
var STORAGE_FILE_PATH = path2.resolve(process.cwd(), "src/data/storedResources.json");
var resourcesCache = /* @__PURE__ */ new Map();
var isInitialized = false;
var INITIAL_SEEDED_RESOURCES = [
  {
    lessonId: "l1-01",
    provider: "youtube",
    providerVideoId: "rYQgy8QDEBI",
    title: "What is Cryptocurrency? (Animated Explanation for Beginners)",
    channelName: "Whiteboard Crypto",
    thumbnailUrl: "https://img.youtube.com/vi/rYQgy8QDEBI/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=rYQgy8QDEBI",
    embedUrl: "https://www.youtube-nocookie.com/embed/rYQgy8QDEBI",
    durationSeconds: 398,
    durationFormatted: "06:38",
    publishedAt: "2021-04-20T12:00:00Z",
    relevanceScore: 98,
    qualityScore: 96,
    resourceType: "EXTERNAL_YOUTUBE",
    status: "APPROVED",
    isPrimary: true,
    searchQuery: "what is cryptocurrency explained for beginners",
    whyUseful: "Explains digital decentralized ledgers, cryptography, and personal custody without technical jargon."
  },
  {
    lessonId: "l1-02",
    provider: "youtube",
    providerVideoId: "SSo_EIwHSd4",
    title: "How Does a Blockchain Work - Simply Explained",
    channelName: "Simply Explained",
    thumbnailUrl: "https://img.youtube.com/vi/SSo_EIwHSd4/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
    embedUrl: "https://www.youtube-nocookie.com/embed/SSo_EIwHSd4",
    durationSeconds: 359,
    durationFormatted: "05:59",
    publishedAt: "2021-02-14T12:00:00Z",
    relevanceScore: 97,
    qualityScore: 95,
    resourceType: "EXTERNAL_YOUTUBE",
    status: "APPROVED",
    isPrimary: true,
    searchQuery: "how does a blockchain work simply explained",
    whyUseful: "Clear visual breakdown of blocks, cryptographic hashes, distributed consensus, and transaction immutability."
  },
  {
    lessonId: "l1-03",
    provider: "youtube",
    providerVideoId: "t0T8t2a65-Y",
    title: "The Difference Between Coins and Tokens (Explained)",
    channelName: "Whiteboard Crypto",
    thumbnailUrl: "https://img.youtube.com/vi/t0T8t2a65-Y/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=t0T8t2a65-Y",
    embedUrl: "https://www.youtube-nocookie.com/embed/t0T8t2a65-Y",
    durationSeconds: 512,
    durationFormatted: "08:32",
    publishedAt: "2021-06-18T12:00:00Z",
    relevanceScore: 96,
    qualityScore: 97,
    resourceType: "EXTERNAL_YOUTUBE",
    status: "APPROVED",
    isPrimary: true,
    searchQuery: "difference between coins and tokens crypto",
    whyUseful: "Explains native Layer-1 coins vs smart contract tokens and why gas fees always require native SOL."
  },
  {
    lessonId: "l1-04",
    provider: "youtube",
    providerVideoId: "g6B3g-L31_o",
    title: "What is Market Cap in Cryptocurrency? (Explained)",
    channelName: "Whiteboard Crypto",
    thumbnailUrl: "https://img.youtube.com/vi/g6B3g-L31_o/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=g6B3g-L31_o",
    embedUrl: "https://www.youtube-nocookie.com/embed/g6B3g-L31_o",
    durationSeconds: 495,
    durationFormatted: "08:15",
    publishedAt: "2022-03-15T12:00:00Z",
    relevanceScore: 92,
    qualityScore: 95,
    resourceType: "EXTERNAL_YOUTUBE",
    status: "APPROVED",
    isPrimary: true,
    searchQuery: "crypto market cap vs fdv explained",
    whyUseful: "Explains circulating vs total supply, unit bias, and market cap dynamics with animated diagrams."
  },
  {
    lessonId: "l1-06",
    provider: "youtube",
    providerVideoId: "cCOhk_z17m4",
    title: "What is a Liquidity Pool in Crypto? (Animated)",
    channelName: "Whiteboard Crypto",
    thumbnailUrl: "https://img.youtube.com/vi/cCOhk_z17m4/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=cCOhk_z17m4",
    embedUrl: "https://www.youtube-nocookie.com/embed/cCOhk_z17m4",
    durationSeconds: 702,
    durationFormatted: "11:42",
    publishedAt: "2021-08-10T12:00:00Z",
    relevanceScore: 95,
    qualityScore: 98,
    resourceType: "EXTERNAL_YOUTUBE",
    status: "APPROVED",
    isPrimary: true,
    searchQuery: "crypto liquidity explained whiteboard crypto",
    whyUseful: "Clear visual demonstration of constant product AMM mechanics, pool ratio pricing, and impermanent loss basics."
  },
  {
    lessonId: "l1-12",
    provider: "youtube",
    providerVideoId: "FbCUHBhf-rU",
    title: "Using Solana & Finding GEMS!! Complete Guide",
    channelName: "Coin Bureau",
    thumbnailUrl: "https://img.youtube.com/vi/FbCUHBhf-rU/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=FbCUHBhf-rU",
    embedUrl: "https://www.youtube-nocookie.com/embed/FbCUHBhf-rU",
    durationSeconds: 1180,
    durationFormatted: "19:40",
    publishedAt: "2023-11-20T12:00:00Z",
    relevanceScore: 90,
    qualityScore: 94,
    resourceType: "EXTERNAL_YOUTUBE",
    status: "APPROVED",
    isPrimary: true,
    searchQuery: "solana blockchain explained for beginners",
    whyUseful: "End-to-end breakdown of the high-speed Solana blockchain architecture, SPL tokens, and decentralized exchanges."
  },
  {
    lessonId: "l2-01",
    provider: "youtube",
    providerVideoId: "476m5_z7h8s",
    title: "The Ultimate Candlestick Patterns Trading Course",
    channelName: "Rayner Teo",
    thumbnailUrl: "https://img.youtube.com/vi/476m5_z7h8s/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=476m5_z7h8s",
    embedUrl: "https://www.youtube-nocookie.com/embed/476m5_z7h8s",
    durationSeconds: 2300,
    durationFormatted: "38:20",
    publishedAt: "2021-05-18T12:00:00Z",
    relevanceScore: 94,
    qualityScore: 96,
    resourceType: "EXTERNAL_YOUTUBE",
    status: "APPROVED",
    isPrimary: true,
    searchQuery: "candlestick patterns trading course rayner teo",
    whyUseful: "Mastering open/high/low/close psychology, identifying wick rejection vs real buyer absorption on low timeframes."
  },
  {
    lessonId: "l2-04",
    provider: "youtube",
    providerVideoId: "P9l6sHpj92c",
    title: "Support And Resistance Trading Strategy for High Win Rates",
    channelName: "Rayner Teo",
    thumbnailUrl: "https://img.youtube.com/vi/P9l6sHpj92c/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=P9l6sHpj92c",
    embedUrl: "https://www.youtube-nocookie.com/embed/P9l6sHpj92c",
    durationSeconds: 1334,
    durationFormatted: "22:14",
    publishedAt: "2022-01-14T12:00:00Z",
    relevanceScore: 91,
    qualityScore: 93,
    resourceType: "EXTERNAL_YOUTUBE",
    status: "APPROVED",
    isPrimary: true,
    searchQuery: "support and resistance trading strategy rayner teo",
    whyUseful: "How to draw dynamic and horizontal support zones, avoid false breakouts, and trade reclaims."
  },
  {
    lessonId: "l3-01",
    provider: "youtube",
    providerVideoId: "aUBid1zJC-U",
    title: "Phantom Wallet: Beginner's Crypto GUIDE!! Step-by-Step!!",
    channelName: "Coin Bureau",
    thumbnailUrl: "https://img.youtube.com/vi/aUBid1zJC-U/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=aUBid1zJC-U",
    embedUrl: "https://www.youtube-nocookie.com/embed/aUBid1zJC-U",
    durationSeconds: 868,
    durationFormatted: "14:28",
    publishedAt: "2022-08-11T12:00:00Z",
    relevanceScore: 96,
    qualityScore: 97,
    resourceType: "EXTERNAL_YOUTUBE",
    status: "APPROVED",
    isPrimary: true,
    searchQuery: "phantom wallet setup tutorial solana coin bureau",
    whyUseful: "Crucial self-custody fundamentals, seed phrase security, burner wallet strategies, and dApp approval revocation."
  },
  {
    lessonId: "l6-02",
    provider: "youtube",
    providerVideoId: "SGnKaWT1lA8",
    title: "Don't Buy Crypto Before Doing This!! How to DYOR With Bubblemaps",
    channelName: "CoinGecko",
    thumbnailUrl: "https://img.youtube.com/vi/SGnKaWT1lA8/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=SGnKaWT1lA8",
    embedUrl: "https://www.youtube-nocookie.com/embed/SGnKaWT1lA8",
    durationSeconds: 725,
    durationFormatted: "12:05",
    publishedAt: "2023-07-19T12:00:00Z",
    relevanceScore: 95,
    qualityScore: 96,
    resourceType: "EXTERNAL_YOUTUBE",
    status: "APPROVED",
    isPrimary: true,
    searchQuery: "bubblemaps tutorial crypto wallet cluster coingecko",
    whyUseful: "Shows how to visually identify clustered wallets, hidden dev allocations, and cross-wallet supply hoarding."
  },
  {
    lessonId: "l10-02",
    provider: "youtube",
    providerVideoId: "kIq8yXq0Tj4",
    title: "Risk Management & Position Sizing in Trading",
    channelName: "Rayner Teo",
    thumbnailUrl: "https://img.youtube.com/vi/kIq8yXq0Tj4/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=kIq8yXq0Tj4",
    embedUrl: "https://www.youtube-nocookie.com/embed/kIq8yXq0Tj4",
    durationSeconds: 1263,
    durationFormatted: "21:03",
    publishedAt: "2021-09-02T12:00:00Z",
    relevanceScore: 92,
    qualityScore: 95,
    resourceType: "EXTERNAL_YOUTUBE",
    status: "APPROVED",
    isPrimary: true,
    searchQuery: "position sizing risk management trading tutorial rayner teo",
    whyUseful: "Mathematical formulas for calculating risk per trade, stop loss placement, and avoiding ruin in volatile assets."
  }
];
function initStoreIfNeeded() {
  if (isInitialized) return;
  resourcesCache = /* @__PURE__ */ new Map();
  if (fs2.existsSync(STORAGE_FILE_PATH)) {
    try {
      const raw = fs2.readFileSync(STORAGE_FILE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      for (const res of parsed) {
        if (res.status === "APPROVED" && !res.validatedAt) {
          res.status = "NEEDS_REVIEW";
          res.isPrimary = false;
          res.validationStatus = "needs_review";
          res.validationReason = "Legacy resource requires YouTube revalidation.";
        }
        resourcesCache.set(res.id, res);
      }
    } catch (e) {
      console.error("Failed reading storedResources.json, seeding defaults", e);
    }
  }
  if (resourcesCache.size === 0 && process.env.ALLOW_LEGACY_RESOURCE_SEED === "true") {
    for (const seed of INITIAL_SEEDED_RESOURCES) {
      const id = `res-${seed.lessonId}-${seed.providerVideoId}`;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const complete = {
        id,
        lessonId: seed.lessonId,
        provider: "youtube",
        providerVideoId: seed.providerVideoId,
        title: seed.title,
        description: seed.whyUseful || "",
        channelName: seed.channelName || "YouTube Educational Channel",
        thumbnailUrl: seed.thumbnailUrl,
        youtubeUrl: seed.youtubeUrl,
        embedUrl: seed.embedUrl,
        durationSeconds: seed.durationSeconds || 600,
        durationFormatted: seed.durationFormatted || "10:00",
        publishedAt: seed.publishedAt || now,
        relevanceScore: seed.relevanceScore || 90,
        qualityScore: seed.qualityScore || 90,
        resourceType: seed.resourceType || "EXTERNAL_YOUTUBE",
        status: seed.status || "APPROVED",
        isPrimary: seed.isPrimary ?? true,
        searchQuery: seed.searchQuery || "",
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
    const dir = path2.dirname(STORAGE_FILE_PATH);
    if (!fs2.existsSync(dir)) {
      fs2.mkdirSync(dir, { recursive: true });
    }
    fs2.writeFileSync(STORAGE_FILE_PATH, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist storedResources.json:", err);
  }
}
var ResourceStore = {
  getAll() {
    initStoreIfNeeded();
    return Array.from(resourcesCache.values());
  },
  getByLessonId(lessonId, onlyApproved = false) {
    initStoreIfNeeded();
    const all = Array.from(resourcesCache.values()).filter((r) => r.lessonId === lessonId);
    if (onlyApproved) {
      return all.filter((r) => r.status === "APPROVED");
    }
    return all;
  },
  getById(resourceId) {
    initStoreIfNeeded();
    return resourcesCache.get(resourceId);
  },
  saveResource(resource) {
    initStoreIfNeeded();
    resource.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    resourcesCache.set(resource.id, resource);
    persistToFile();
    return resource;
  },
  approve(resourceId, isPrimary = false) {
    initStoreIfNeeded();
    const res = resourcesCache.get(resourceId);
    if (!res) return null;
    if (isPrimary) {
      for (const item of resourcesCache.values()) {
        if (item.lessonId === res.lessonId && item.isPrimary) {
          item.isPrimary = false;
          item.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
        }
      }
    }
    res.status = "APPROVED";
    res.isPrimary = isPrimary || res.isPrimary;
    res.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    persistToFile();
    return res;
  },
  reject(resourceId) {
    initStoreIfNeeded();
    const res = resourcesCache.get(resourceId);
    if (!res) return null;
    res.status = "REJECTED";
    res.isPrimary = false;
    res.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    persistToFile();
    return res;
  },
  archive(resourceId) {
    initStoreIfNeeded();
    const res = resourcesCache.get(resourceId);
    if (!res) return null;
    res.status = "ARCHIVED";
    res.isPrimary = false;
    res.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    persistToFile();
    return res;
  },
  setPrimary(lessonId, resourceId) {
    initStoreIfNeeded();
    const target = resourcesCache.get(resourceId);
    if (!target || target.lessonId !== lessonId) return null;
    for (const item of resourcesCache.values()) {
      if (item.lessonId === lessonId) {
        item.isPrimary = item.id === resourceId;
        item.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      }
    }
    target.status = "APPROVED";
    persistToFile();
    return target;
  },
  getSummary(allLessonIds) {
    initStoreIfNeeded();
    const totalLessons = allLessonIds.length;
    let approvedResourcesCount = 0;
    let needsReviewCount = 0;
    let withoutResourcesCount = 0;
    const lessonStatusMap = {};
    for (const lessonId of allLessonIds) {
      const items = Array.from(resourcesCache.values()).filter((r) => r.lessonId === lessonId);
      const approved = items.filter((r) => r.status === "APPROVED");
      const discovered = items.filter((r) => ["DISCOVERED", "VALIDATED", "REVIEWED", "NEEDS_REVIEW", "UNAVAILABLE"].includes(r.status));
      approvedResourcesCount += approved.length;
      needsReviewCount += discovered.length;
      if (approved.length > 0) {
        lessonStatusMap[lessonId] = "RESOURCE_READY";
      } else if (discovered.length > 0) {
        lessonStatusMap[lessonId] = "NEEDS_REVIEW";
      } else {
        lessonStatusMap[lessonId] = "NEEDS_RESOURCE";
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

// src/server/vercelApi.ts
function sendJson(res, status, payload) {
  if (typeof res.status === "function") {
    res.status(status);
  }
  if (typeof res.setHeader === "function") {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
  }
  if (typeof res.json === "function") {
    return res.json(payload);
  }
  return res.send(JSON.stringify(payload));
}

// api-src/resources.ts
async function handler(req, res) {
  if (req.method !== "GET") return sendJson(res, 405, { success: false, error: "METHOD_NOT_ALLOWED", message: "Use GET." });
  const lessonId = typeof req.query.lessonId === "string" ? req.query.lessonId : null;
  try {
    let query = firebaseAdmin().db.collection("lesson_resources").where("status", "==", "APPROVED");
    if (lessonId) query = query.where("lessonId", "==", lessonId);
    const snapshot = await query.get();
    const resources = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if (resources.length > 0 || !lessonId) {
      return sendJson(res, 200, { success: true, resources });
    }
  } catch (error) {
    console.warn("[RESOURCES] Firestore read failed, using ResourceStore fallback:", error);
  }
  const fallback = lessonId ? ResourceStore.getByLessonId(lessonId, true) : ResourceStore.getAll().filter((r) => r.status === "APPROVED");
  return sendJson(res, 200, { success: true, resources: fallback });
}
export {
  handler as default
};
