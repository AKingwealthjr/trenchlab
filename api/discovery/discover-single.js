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
function adminEmails() {
  const defaults = [
    "vipkingwealth@gmail.com",
    "1alexkingsley@gmail.com",
    "alexkingsley@gmail.com",
    "precilexis@gmail.com"
  ];
  const envAdmins = (process.env.ADMIN_EMAILS || "").replace(/['"]/g, "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
  return /* @__PURE__ */ new Set([...defaults, ...envAdmins]);
}

// src/server/vercelApi.ts
import { createPublicKey, verify } from "node:crypto";
var firebaseCertificates = null;
var certificatesExpireAt = 0;
async function verifyFirebaseTokenFallback(token) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const decode = (val) => JSON.parse(Buffer.from(val.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
    const header = decode(parts[0]);
    const claims = decode(parts[1]);
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || "trenchlab-production";
    if (!projectId || header.alg !== "RS256" || !header.kid || !claims.sub || claims.aud !== projectId || claims.iss !== `https://securetoken.google.com/${projectId}` || !claims.exp || claims.exp <= Date.now() / 1e3) {
      return null;
    }
    if (!firebaseCertificates || Date.now() >= certificatesExpireAt) {
      const response = await fetch("https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com");
      if (!response.ok) return null;
      firebaseCertificates = await response.json();
      const maxAge = Number(response.headers.get("cache-control")?.match(/max-age=(\d+)/)?.[1] || 3600);
      certificatesExpireAt = Date.now() + maxAge * 1e3;
    }
    const certificate = firebaseCertificates[header.kid];
    if (!certificate) return null;
    const signature = Buffer.from(parts[2].replace(/-/g, "+").replace(/_/g, "/"), "base64");
    const valid = verify("RSA-SHA256", Buffer.from(`${parts[0]}.${parts[1]}`), createPublicKey(certificate), signature);
    return valid ? { uid: claims.sub, email: claims.email } : null;
  } catch (error) {
    console.warn("[VERCEL API] Token fallback verification failed:", error instanceof Error ? error.message : String(error));
    return null;
  }
}
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
async function requireAdmin(req, res) {
  const header = req.headers?.authorization;
  if (!header?.startsWith("Bearer ")) {
    sendJson(res, 401, { success: false, error: "UNAUTHENTICATED", message: "Sign in is required." });
    return null;
  }
  const rawToken = header.slice(7);
  let claims = null;
  try {
    claims = await firebaseAdmin().auth.verifyIdToken(rawToken);
  } catch {
    claims = await verifyFirebaseTokenFallback(rawToken);
  }
  if (!claims) {
    sendJson(res, 401, { success: false, error: "UNAUTHENTICATED", message: "Your session could not be verified." });
    return null;
  }
  if (!claims.email || !adminEmails().has(claims.email.toLowerCase())) {
    sendJson(res, 403, { success: false, error: "FORBIDDEN", message: "Administrator access required." });
    return null;
  }
  return claims;
}

// src/data/curriculumPhases3to6.ts
var PHASES_3_TO_6 = [
  {
    id: 3,
    title: "PHASE 03 \u2014 SOLANA TRADING STACK",
    subtitle: "Execution Infrastructure, Wallets, Routers, and Bonding Curves",
    description: "Master the mechanics of Solana execution. Understand how Phantom, Jupiter, Raydium, and Pump.fun interact, how bonding curves work, and how to verify blocks on Solscan.",
    levelRequired: 3,
    badge: "SOLANA_OPERATOR",
    practicalAssignment: {
      title: "Explain the Lifecycle of a Newly Launched Solana Token",
      description: "Write a comprehensive technical walkthrough tracking a token from bonding curve creation to DEX liquidity migration.",
      task: "Document: (1) Creation on Pump.fun, (2) Bonding curve accumulation, (3) Migration to Raydium, (4) LP token burning, and (5) Priority fee optimization during high volume."
    },
    quiz: {
      id: "quiz-03",
      phaseId: 3,
      title: "Phase 03 Assessment: Solana Infrastructure & Routers",
      passingScore: 75,
      questions: [
        {
          id: "q3-1",
          question: "What is the primary operational rule for Phase 03?",
          options: [
            "Trade blindly without checking metrics",
            "Enforce rigorous analytical confirmation and defined risk parameters",
            "Risk entire portfolio on one coin",
            "Ignore liquidity depth"
          ],
          correctIndex: 1,
          explanation: "Disciplined operators prioritize capital preservation and confluence verification before execution.",
          type: "multiple-choice"
        }
      ]
    },
    lessons: [
      {
        id: "l3-01",
        phaseId: 3,
        lessonNumber: 1,
        title: "Phantom Wallet Setup & Advanced Security",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Phantom Wallet Setup & Advanced Security in real-world trading environments",
          "Identify key risk factors and signals associated with Phantom Wallet Setup & Advanced Security",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Phantom Wallet Setup & Advanced Security",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Phantom Wallet Setup & Advanced Security is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Phantom Wallet Setup & Advanced Security identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Phantom Wallet Setup & Advanced Security.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Phantom Wallet Setup & Advanced Security?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Phantom Wallet Setup & Advanced Security Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Phantom Wallet Setup & Advanced Security and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l3-02",
        phaseId: 3,
        lessonNumber: 2,
        title: "Jupiter Aggregator: Best Execution & Dynamic Routing",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Jupiter Aggregator: Best Execution & Dynamic Routing in real-world trading environments",
          "Identify key risk factors and signals associated with Jupiter Aggregator: Best Execution & Dynamic Routing",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Jupiter Aggregator: Best Execution & Dynamic Routing",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Jupiter Aggregator: Best Execution & Dynamic Routing is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Jupiter Aggregator: Best Execution & Dynamic Routing identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Jupiter Aggregator: Best Execution & Dynamic Routing.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Jupiter Aggregator: Best Execution & Dynamic Routing?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Jupiter Aggregator: Best Execution & Dynamic Routing Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Jupiter Aggregator: Best Execution & Dynamic Routing and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l3-03",
        phaseId: 3,
        lessonNumber: 3,
        title: "Raydium & AMM Liquidity Mechanics",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Raydium & AMM Liquidity Mechanics in real-world trading environments",
          "Identify key risk factors and signals associated with Raydium & AMM Liquidity Mechanics",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Raydium & AMM Liquidity Mechanics",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Raydium & AMM Liquidity Mechanics is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Raydium & AMM Liquidity Mechanics identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Raydium & AMM Liquidity Mechanics.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Raydium & AMM Liquidity Mechanics?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Raydium & AMM Liquidity Mechanics Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Raydium & AMM Liquidity Mechanics and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l3-04",
        phaseId: 3,
        lessonNumber: 4,
        title: "Pump.fun & Bonding Curves Explained",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Pump.fun & Bonding Curves Explained in real-world trading environments",
          "Identify key risk factors and signals associated with Pump.fun & Bonding Curves Explained",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Pump.fun & Bonding Curves Explained",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Pump.fun & Bonding Curves Explained is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Pump.fun & Bonding Curves Explained identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Pump.fun & Bonding Curves Explained.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Pump.fun & Bonding Curves Explained?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Pump.fun & Bonding Curves Explained Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Pump.fun & Bonding Curves Explained and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l3-05",
        phaseId: 3,
        lessonNumber: 5,
        title: "Priority Fees & Jito Tip Bundles on Solana",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Understand how validator compute unit limits dictate transaction landing speed",
          "Configure dynamic priority fees in Phantom and third-party routers",
          "Understand Jito tip bundles and how snipers secure first-block inclusion"
        ],
        videos: [],
        keyConcepts: [
          "Priority Fees",
          "Compute Units (CU)",
          "Jito Tip Bundles",
          "Mev Bribes"
        ],
        deepDive: [
          "During extreme network congestion or high-volatility launches, the standard 0.000005 SOL base fee is not enough to guarantee block inclusion.",
          "Solana validators order transactions based on Priority Fee per Compute Unit (micro-lamports). If your compute budget is too low, validators simply drop the packet.",
          "Jito bundles allow traders to package a transaction directly with an upfront tip paid to the leader validator, bypassing public mempool front-running."
        ],
        realWorldExample: "During a hyped token migration to Raydium, retail swaps with standard fees fail repeatedly for 3 minutes while price doubles. An operator with dynamic priority fees and a 0.005 SOL Jito tip lands on the first block at the base price.",
        commonMistakes: [
          "Setting fixed priority fees too low during breaking viral news events.",
          "Overpaying priority fees on microscopic trades, causing fee bleed."
        ],
        checkQuestions: [
          {
            "question": "What is the primary function of a Jito tip bundle on Solana?",
            "options": [
              "To bypass gas fees entirely",
              "To deliver private, atomic transaction bundles directly to validators with tip incentives",
              "To reverse failed transactions",
              "To buy tokens before they are minted"
            ],
            "correctIndex": 1,
            "explanation": "Jito bundles send transactions directly to Jito-Solana validators off the public peer-to-peer gossip network, preventing front-running and ensuring atomic inclusion."
          }
        ],
        assignment: {
          title: "Priority Fees & Jito Tip Bundles on Solana Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Priority Fees & Jito Tip Bundles on Solana and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l3-06",
        phaseId: 3,
        lessonNumber: 6,
        title: "RPC Nodes: Public vs Dedicated Private Endpoints",
        difficulty: "INTERMEDIATE",
        estimatedTime: "18 min",
        objectives: [
          "Understand how Remote Procedure Call (RPC) nodes mediate between wallet and blockchain",
          "Identify the limitations and rate-limits of public RPC endpoints",
          "Set up custom dedicated RPC providers (Helius, QuickNode, Triton) for low latency"
        ],
        videos: [],
        keyConcepts: [
          "RPC Node",
          "Rate Limiting",
          "Public vs Private Endpoints",
          "Sub-Second Latency"
        ],
        deepDive: [
          "Every time you check balances or broadcast a swap, your wallet contacts an RPC node. Public endpoints provided by Phantom or default networks are heavily throttled and rate-limited.",
          "During high-traffic memecoin runs, public RPCs return 429 Too Many Requests errors, showing stale prices and dropping swap submissions.",
          "Connecting a private RPC endpoint gives you dedicated bandwidth, immediate transaction propagation, and websockets that update balance changes in milliseconds."
        ],
        realWorldExample: "A trader on default public RPC sees a pump 8 seconds late and their buy transaction drops due to rate limiting. Another trader using a dedicated Helius RPC catches the exact tick and fills cleanly.",
        commonMistakes: [
          "Relying on overloaded public RPCs for volatile low-cap executions.",
          "Exposing private RPC API keys in public GitHub repositories."
        ],
        checkQuestions: [
          {
            "question": "What error commonly indicates that your wallet is using an overloaded public RPC node?",
            "options": [
              "404 Not Found",
              "429 Too Many Requests / Rate Limit Exceeded",
              "500 Internal Blockchain Fault",
              "200 OK"
            ],
            "correctIndex": 1,
            "explanation": "HTTP 429 status code indicates that the public RPC provider has throttled your requests due to excessive traffic."
          }
        ],
        assignment: {
          title: "RPC Nodes: Public vs Dedicated Private Endpoints Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of RPC Nodes: Public vs Dedicated Private Endpoints and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l3-07",
        phaseId: 3,
        lessonNumber: 7,
        title: "Solana Explorer & Solscan: Auditing On-Chain Signatures",
        difficulty: "INTERMEDIATE",
        estimatedTime: "20 min",
        objectives: [
          "Navigate transaction logs and program invocations on Solscan",
          "Decode inner instructions to verify actual token transfers and fee deductions",
          "Confirm transaction finality and slot confirmation states"
        ],
        videos: [],
        keyConcepts: [
          "Solscan",
          "Program Invocations",
          "Inner Instructions",
          "Transaction Signatures"
        ],
        deepDive: [
          "Solscan is the ultimate truth terminal for Solana. User interfaces on DEXs can lag or show erroneous data, but raw on-chain signatures never lie.",
          "By inspecting a transaction signature, you can verify which program was invoked (e.g. Raydium AMM, Jupiter, Token Program) and the exact amounts transferred.",
          "Inner instruction inspection reveals hidden fees, routing intermediaries, and exact token balances credited to your Associated Token Account."
        ],
        realWorldExample: "A swap appears to fail in a DEX UI with a red banner. The trader checks the transaction signature on Solscan and discovers the swap actually confirmed in the block with zero slippage error.",
        commonMistakes: [
          "Panicking when a frontend UI hangs without checking the transaction signature on Solscan.",
          "Not verifying whether a token transfer actually hit the correct recipient wallet."
        ],
        checkQuestions: [
          {
            "question": "What confirms that a transaction on Solana is permanently irreversible?",
            "options": [
              "Frontend confirmation toast",
              "Finalized commitment status on Solscan",
              "Telegram notification bot",
              "Estimated time counter"
            ],
            "correctIndex": 1,
            "explanation": 'Once a transaction reaches "Finalized" commitment (voted on by a supermajority of the validator cluster), it is cryptographically permanent.'
          }
        ],
        assignment: {
          title: "Solana Explorer & Solscan: Auditing On-Chain Signatures Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Solana Explorer & Solscan: Auditing On-Chain Signatures and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l3-08",
        phaseId: 3,
        lessonNumber: 8,
        title: "Raydium CLMM vs Standard CPMM Pools",
        difficulty: "ADVANCED",
        estimatedTime: "16 min",
        objectives: [
          "Differentiate Concentrated Liquidity (CLMM) from Constant Product (CPMM) pools",
          "Understand how concentrated tick ranges amplify capital efficiency and price impact",
          "Recognize volatility traps when price exits a concentrated liquidity band"
        ],
        videos: [],
        keyConcepts: [
          "CLMM",
          "CPMM (Constant Product)",
          "Tick Ranges",
          "Liquidity Depth"
        ],
        deepDive: [
          "Standard Constant Product Market Makers (CPMM) distribute liquidity across the entire curve from zero to infinity (x * y = k).",
          "Concentrated Liquidity Market Makers (CLMM) allow LPs to allocate liquidity strictly within defined price intervals (ticks). This provides 100x deeper liquidity inside the band.",
          "However, if price breaks outside the active concentrated band, liquidity drops to zero instantly, causing violent slippage spikes for market orders."
        ],
        realWorldExample: "A memecoin trades in a tight CLMM range between $0.05 and $0.07. When a whale market buys $20,000, price surges through $0.07. Beyond $0.07, no liquidity exists in the band, catapulting price to $0.15 on tiny volume.",
        commonMistakes: [
          "Executing large market orders into a CLMM pool without checking active tick depth.",
          "Assuming all Raydium pools behave with identical constant-product slippage."
        ],
        checkQuestions: [
          {
            "question": "What happens in a CLMM pool when price moves outside the active concentrated liquidity range?",
            "options": [
              "Trading is halted",
              "Liquidity inside that specific band drops to zero, dramatically increasing slippage",
              "Tokens are returned to wallet",
              "The pool converts to a CEX orderbook"
            ],
            "correctIndex": 1,
            "explanation": "Once price exits the LP concentrated range, the liquidity providers are 100% in one asset and provide zero active depth beyond the boundary."
          }
        ],
        assignment: {
          title: "Raydium CLMM vs Standard CPMM Pools Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Raydium CLMM vs Standard CPMM Pools and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l3-09",
        phaseId: 3,
        lessonNumber: 9,
        title: "Meteora Dynamic AMM & DLMM Pools",
        difficulty: "ADVANCED",
        estimatedTime: "18 min",
        objectives: [
          "Understand Meteora DLMM (Dynamic Liquidity Market Maker) bin mechanics",
          "Analyze dynamic fee models that scale with market volatility",
          "Identify how liquidity shape distributions (spot, curve, bid-ask) impact trade routing"
        ],
        videos: [],
        keyConcepts: [
          "Meteora DLMM",
          "Discrete Price Bins",
          "Dynamic Swap Fees",
          "Zero Slippage Bins"
        ],
        deepDive: [
          "Meteora DLMM organizes liquidity into discrete price bins. Trades occurring entirely within a single bin experience zero slippage.",
          "Meteora introduces dynamic fees: during periods of intense volatility, swap fees automatically increase to compensate LPs and dampen predatory toxic arbitrage.",
          "Understanding bin mechanics helps traders anticipate support floors where large volumes of liquidity bins have been stacked."
        ],
        realWorldExample: "During a volatile token launch, a Meteora DLMM pool fee increases from 0.25% to 2.5% dynamically as volatility surges, preserving liquidity depth and preventing sandwich bots from draining the pool.",
        commonMistakes: [
          "Failing to notice higher dynamic fees during peak volatility on Meteora swaps.",
          "Confusing discrete bin swaps with continuous bonding curve swaps."
        ],
        checkQuestions: [
          {
            "question": "What unique advantage does trading within a single active Meteora DLMM bin offer?",
            "options": [
              "Zero slippage on the portion of the trade executed within the bin",
              "No blockchain gas fee",
              "100% cashback",
              "Guaranteed profit"
            ],
            "correctIndex": 0,
            "explanation": "Inside a single discrete bin, price is constant, meaning trades executing strictly within that bin incur zero price impact/slippage."
          }
        ],
        assignment: {
          title: "Meteora Dynamic AMM & DLMM Pools Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Meteora Dynamic AMM & DLMM Pools and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l3-10",
        phaseId: 3,
        lessonNumber: 10,
        title: "Token Accounts & Associated Token Accounts (ATAs)",
        difficulty: "BEGINNER",
        estimatedTime: "14 min",
        objectives: [
          "Understand why Solana requires separate Associated Token Accounts (ATAs) for each token",
          "Calculate the rent exemption cost (~0.002 SOL) per new token account",
          "Use tools to close empty ATAs and reclaim locked SOL rent"
        ],
        videos: [],
        keyConcepts: [
          "Associated Token Account (ATA)",
          "Rent Exemption",
          "SPL Token Program",
          "Reclaiming Rent"
        ],
        deepDive: [
          "On Solana, your main wallet address does not hold SPL tokens directly. Instead, a unique Associated Token Account (ATA) derived from your wallet and the token mint is created.",
          'Creating an ATA requires locking approximately 0.002039 SOL as "rent exemption" to store the account data on validators RAM.',
          "Active memecoin traders who trade hundreds of tokens often have 0.2 to 0.5 SOL locked up in dormant zero-balance token accounts that can be closed to reclaim funds."
        ],
        realWorldExample: "An active trencher notices their SOL balance is 0.4 SOL lower than expected after 200 quick trades. They run a rent reclamation tool (like Sol Incinerator or Phantom Manage Tokens), close 180 empty ATAs, and immediately recover 0.36 SOL.",
        commonMistakes: [
          "Closing an ATA while still holding a microscopic residual token dust balance that has future value.",
          "Not realizing that every new token traded deducts rent on first buy."
        ],
        checkQuestions: [
          {
            "question": "Why does your SOL balance decrease slightly when you buy a brand-new token for the first time?",
            "options": [
              "DEX fee theft",
              "Creation of an Associated Token Account (ATA) requiring ~0.002 SOL rent exemption",
              "Solana network tax",
              "Phantom subscription fee"
            ],
            "correctIndex": 1,
            "explanation": "Creating a new on-chain token account requires locking rent in SOL to allocate storage on validator nodes."
          }
        ],
        assignment: {
          title: "Token Accounts & Associated Token Accounts (ATAs) Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Token Accounts & Associated Token Accounts (ATAs) and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l3-11",
        phaseId: 3,
        lessonNumber: 11,
        title: "Burner Wallets & Hardware Wallet Partitioning",
        difficulty: "INTERMEDIATE",
        estimatedTime: "16 min",
        objectives: [
          "Implement an air-gapped 3-tier wallet architecture (Vault, Staging, Burner)",
          "Isolate high-risk memecoin dApp connections from long-term capital",
          "Establish a strict fund transfer protocol to prevent catastrophic draining"
        ],
        videos: [],
        keyConcepts: [
          "Vault Wallet",
          "Burner Wallet",
          "Isolation Architecture",
          "Malicious Approvals"
        ],
        deepDive: [
          "In the trenches, interacting with experimental launchpads, claim sites, and DEXs exposes your wallet to malicious smart contract drainers.",
          "A professional operator never connects their primary vault or cold storage hardware wallet to unknown dApps.",
          "The 3-tier architecture maintains: (1) Vault for long-term reserves (no dApp connections), (2) Staging wallet for liquidity allocation, and (3) Burner wallets with strictly disposable funds for daily execution."
        ],
        realWorldExample: "A trader accidentally signs a phishing transaction on a spoofed Telegram link. Because they used an isolated burner wallet with only 0.5 SOL, their loss is capped at $70, while their 200 SOL vault remains completely untouched.",
        commonMistakes: [
          "Connecting a ledger or main storage wallet to new memecoin claim airdrops.",
          "Storing recovery seed phrases in cloud notes, screenshots, or email."
        ],
        checkQuestions: [
          {
            "question": 'What is the primary role of a "Burner Wallet" in on-chain memecoin trading?',
            "options": [
              "To hold long-term investments",
              "To interact with high-risk DEXs and contracts with minimal capital exposure",
              "To bypass blockchain taxes",
              "To avoid paying gas fees"
            ],
            "correctIndex": 1,
            "explanation": "Burner wallets contain only the immediate capital needed for a trade, ensuring that a malicious drainer contract can never access your main funds."
          }
        ],
        assignment: {
          title: "Burner Wallets & Hardware Wallet Partitioning Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Burner Wallets & Hardware Wallet Partitioning and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l3-12",
        phaseId: 3,
        lessonNumber: 12,
        title: "Slippage Tolerance & Price Impact Guards on Solana Swaps",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Distinguish between Slippage Tolerance (market movement) and Price Impact (liquidity depth)",
          "Calculate optimal slippage percentages for various pool liquidity depths",
          "Prevent maximum extractable value (MEV) exploitation caused by excessive slippage"
        ],
        videos: [],
        keyConcepts: [
          "Slippage Tolerance",
          "Price Impact",
          "Slippage Guard",
          "Sandwich Exploits"
        ],
        deepDive: [
          "Slippage tolerance is the maximum price deviation you permit between transaction submission and block execution.",
          "Price impact is the deterministic price movement caused by your trade size relative to pool liquidity reserves.",
          'Setting slippage to 20% or 50% "just to ensure the trade lands" is an open invitation for MEV bots to front-run and sandwich your swap, handing you the worst possible fill.'
        ],
        realWorldExample: "A trader sets 25% slippage on a $1,000 swap in a $10,000 pool. An MEV searcher detects the transaction in the mempool, buys ahead of them, lets the user fill at +24.9% worst price, and dumps immediately for guaranteed profit.",
        commonMistakes: [
          "Using automatic 20%+ slippage on low-volatility pairs.",
          "Confusing high price impact (small pool) with high slippage settings."
        ],
        checkQuestions: [
          {
            "question": "Why is setting 30% slippage dangerous on a decentralized exchange?",
            "options": [
              "The blockchain will reject the transaction",
              "MEV sandwich bots will deliberately manipulate the price up to your 30% limit to extract profit",
              "Your wallet will be deleted",
              "Gas fees triple automatically"
            ],
            "correctIndex": 1,
            "explanation": "Arbitrage and sandwich bots scan for high slippage transactions and manipulate the fill price to the exact outer limit of your tolerance."
          }
        ],
        assignment: {
          title: "Slippage Tolerance & Price Impact Guards on Solana Swaps Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Slippage Tolerance & Price Impact Guards on Solana Swaps and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l3-13",
        phaseId: 3,
        lessonNumber: 13,
        title: "MEV & Sandwich Attack Protection on Solana",
        difficulty: "ADVANCED",
        estimatedTime: "18 min",
        objectives: [
          "Understand how MEV searchers detect pending swaps and execute sandwich attacks",
          "Enable MEV protection features in routers and custom swap settings",
          "Recognize the on-chain signature pattern of a sandwich attack"
        ],
        videos: [],
        keyConcepts: [
          "MEV (Maximal Extractable Value)",
          "Sandwich Attack",
          "Front-Running",
          "Private RPC Routing"
        ],
        deepDive: [
          "A sandwich attack occurs when a bot places a buy order immediately before your transaction and a sell order immediately after it in the exact same slot.",
          "Because the bot pushes the price up to your maximum slippage limit, you receive significantly fewer tokens than you should have.",
          "Protection requires three layers: (1) keeping slippage below 1-2% whenever possible, (2) using private routing or Jito bundle protection, and (3) avoiding massive single market orders in shallow liquidity pools."
        ],
        realWorldExample: "A user buys 10 SOL worth of a token. On Solscan, the block shows: Bot buys 20 SOL (TX 1), User buys 10 SOL (TX 2), Bot sells 20 SOL (TX 3). The bot pocketed 1.2 SOL in risk-free profit extracted directly from the user fill.",
        commonMistakes: [
          "Assuming Solana has zero MEV because it does not have a traditional public Ethereum mempool.",
          "Ignoring Jupiter built-in MEV protection toggles."
        ],
        checkQuestions: [
          {
            "question": "What three consecutive transactions characterize a classic sandwich attack on-chain?",
            "options": [
              "Transfer, stake, unstake",
              "Attacker buy, victim buy, attacker sell in the same block",
              "Mint, burn, freeze",
              "Deposit, borrow, liquidate"
            ],
            "correctIndex": 1,
            "explanation": "The attacker buys ahead of the victim to artificially inflate price, absorbs the victim swap at the top, and sells immediately behind them for profit."
          }
        ],
        assignment: {
          title: "MEV & Sandwich Attack Protection on Solana Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of MEV & Sandwich Attack Protection on Solana and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l3-14",
        phaseId: 3,
        lessonNumber: 14,
        title: "Trading Bots Overview: Telegram & Desktop Execution Bots",
        difficulty: "INTERMEDIATE",
        estimatedTime: "20 min",
        objectives: [
          "Evaluate Telegram trading bots (Photon, BullX, Trojan, Banana Gun) vs web interfaces",
          "Configure auto-buy, auto-slippage, and quick tip settings",
          "Understand the custodial security tradeoffs of bot-generated private keys"
        ],
        videos: [],
        keyConcepts: [
          "Telegram Bots",
          "Execution Speed",
          "Auto-Buy / Auto-Sell",
          "Private Key Custody"
        ],
        deepDive: [
          "In high-speed Solana trading, standard browser web interfaces can introduce 3 to 10 seconds of latency due to frontend rendering and wallet popups.",
          "Execution bots (such as Trojan, BullX, or Photon) communicate directly with private RPC clusters, achieving 1-click execution under 800 milliseconds.",
          "However, using trading bots requires depositing funds into a hot private key generated by the bot server. Never store your core net worth inside bot wallets; treat them strictly as transactional burner fuel."
        ],
        realWorldExample: "When a major influencer posts an address, traders using Phantom web popups take 8 seconds to approve and fill at 4x the price. A bot trader using pre-set 1-click auto-buy fills within 600 milliseconds at the base price.",
        commonMistakes: [
          "Leaving large balances of SOL sitting indefinitely inside third-party Telegram bot wallets.",
          "Not enabling anti-MEV and auto-slippage toggles in bot settings."
        ],
        checkQuestions: [
          {
            "question": "What is the primary operational trade-off when using Telegram execution bots?",
            "options": [
              "Faster execution speed vs increased custodial risk of hot server-stored private keys",
              "Higher fees with slower execution",
              "Inability to trade on Solana",
              "Mandatory KYC requirements"
            ],
            "correctIndex": 0,
            "explanation": "Bots provide unmatched execution speed and 1-click swaps, but require entrusting funds to a hot wallet key managed by the bot platform."
          }
        ],
        assignment: {
          title: "Trading Bots Overview: Telegram & Desktop Execution Bots Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Trading Bots Overview: Telegram & Desktop Execution Bots and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      }
    ]
  },
  {
    id: 4,
    title: "PHASE 04 \u2014 DEXSCREENER MASTERY",
    subtitle: "Terminal Navigation, Layouts, Filters & Real-Time Analytics",
    description: "Turn DexScreener from a price-watching toy into a tactical command center.",
    levelRequired: 4,
    badge: "DEX_NAVIGATOR",
    practicalAssignment: {
      title: "Build Your Custom DexScreener Layout",
      description: "Configure a personalized multi-chart watchlist and filter setup.",
      task: "Save a custom view with 3 active pairs, volume threshold filters, and transaction alerts."
    },
    quiz: {
      id: "quiz-04",
      phaseId: 4,
      title: "Phase 04 Assessment: DexScreener Operational Competence",
      passingScore: 75,
      questions: [
        {
          id: "q4-1",
          question: "What is the primary operational rule for Phase 04?",
          options: [
            "Trade blindly without checking metrics",
            "Enforce rigorous analytical confirmation and defined risk parameters",
            "Risk entire portfolio on one coin",
            "Ignore liquidity depth"
          ],
          correctIndex: 1,
          explanation: "Disciplined operators prioritize capital preservation and confluence verification before execution.",
          type: "multiple-choice"
        }
      ]
    },
    lessons: [
      {
        id: "l4-01",
        phaseId: 4,
        lessonNumber: 1,
        title: "DexScreener Interface & Custom Layouts",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master DexScreener Interface & Custom Layouts in real-world trading environments",
          "Identify key risk factors and signals associated with DexScreener Interface & Custom Layouts",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "DexScreener Interface & Custom Layouts",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "DexScreener Interface & Custom Layouts is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring DexScreener Interface & Custom Layouts identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on DexScreener Interface & Custom Layouts.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing DexScreener Interface & Custom Layouts?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "DexScreener Interface & Custom Layouts Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of DexScreener Interface & Custom Layouts and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l4-02",
        phaseId: 4,
        lessonNumber: 2,
        title: "New Pairs vs Trending: Filtering the Noise",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master New Pairs vs Trending: Filtering the Noise in real-world trading environments",
          "Identify key risk factors and signals associated with New Pairs vs Trending: Filtering the Noise",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "New Pairs vs Trending: Filtering the Noise",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "New Pairs vs Trending: Filtering the Noise is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring New Pairs vs Trending: Filtering the Noise identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on New Pairs vs Trending: Filtering the Noise.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing New Pairs vs Trending: Filtering the Noise?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "New Pairs vs Trending: Filtering the Noise Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of New Pairs vs Trending: Filtering the Noise and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l4-03",
        phaseId: 4,
        lessonNumber: 3,
        title: "Setting Up Custom Price & Volume Alerts on DexScreener",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Setting Up Custom Price & Volume Alerts on DexScreener in real-world trading environments",
          "Identify key risk factors and signals associated with Setting Up Custom Price & Volume Alerts on DexScreener",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Setting Up Custom Price & Volume Alerts on DexScreener",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Setting Up Custom Price & Volume Alerts on DexScreener is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Setting Up Custom Price & Volume Alerts on DexScreener identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Setting Up Custom Price & Volume Alerts on DexScreener.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Setting Up Custom Price & Volume Alerts on DexScreener?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Setting Up Custom Price & Volume Alerts on DexScreener Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Setting Up Custom Price & Volume Alerts on DexScreener and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l4-04",
        phaseId: 4,
        lessonNumber: 4,
        title: "Identifying Wash Trading & Fake Volume Rings",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Identifying Wash Trading & Fake Volume Rings in real-world trading environments",
          "Identify key risk factors and signals associated with Identifying Wash Trading & Fake Volume Rings",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Identifying Wash Trading & Fake Volume Rings",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Identifying Wash Trading & Fake Volume Rings is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Identifying Wash Trading & Fake Volume Rings identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Identifying Wash Trading & Fake Volume Rings.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Identifying Wash Trading & Fake Volume Rings?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Identifying Wash Trading & Fake Volume Rings Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Identifying Wash Trading & Fake Volume Rings and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l4-05",
        phaseId: 4,
        lessonNumber: 5,
        title: "Multi-Charts Setup for Simultaneous Token Tracking",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Multi-Charts Setup for Simultaneous Token Tracking in real-world trading environments",
          "Identify key risk factors and signals associated with Multi-Charts Setup for Simultaneous Token Tracking",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Multi-Charts Setup for Simultaneous Token Tracking",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Multi-Charts Setup for Simultaneous Token Tracking is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Multi-Charts Setup for Simultaneous Token Tracking identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Multi-Charts Setup for Simultaneous Token Tracking.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Multi-Charts Setup for Simultaneous Token Tracking?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Multi-Charts Setup for Simultaneous Token Tracking Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Multi-Charts Setup for Simultaneous Token Tracking and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l4-06",
        phaseId: 4,
        lessonNumber: 6,
        title: "Reading Liquidity Locks & Burn Badges on DexScreener",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Reading Liquidity Locks & Burn Badges on DexScreener in real-world trading environments",
          "Identify key risk factors and signals associated with Reading Liquidity Locks & Burn Badges on DexScreener",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Reading Liquidity Locks & Burn Badges on DexScreener",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Reading Liquidity Locks & Burn Badges on DexScreener is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Reading Liquidity Locks & Burn Badges on DexScreener identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Reading Liquidity Locks & Burn Badges on DexScreener.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Reading Liquidity Locks & Burn Badges on DexScreener?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Reading Liquidity Locks & Burn Badges on DexScreener Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Reading Liquidity Locks & Burn Badges on DexScreener and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l4-07",
        phaseId: 4,
        lessonNumber: 7,
        title: "Top Traders Tab: Inspecting PnL & Holding Percentages",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Top Traders Tab: Inspecting PnL & Holding Percentages in real-world trading environments",
          "Identify key risk factors and signals associated with Top Traders Tab: Inspecting PnL & Holding Percentages",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Top Traders Tab: Inspecting PnL & Holding Percentages",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Top Traders Tab: Inspecting PnL & Holding Percentages is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Top Traders Tab: Inspecting PnL & Holding Percentages identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Top Traders Tab: Inspecting PnL & Holding Percentages.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Top Traders Tab: Inspecting PnL & Holding Percentages?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Top Traders Tab: Inspecting PnL & Holding Percentages Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Top Traders Tab: Inspecting PnL & Holding Percentages and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l4-08",
        phaseId: 4,
        lessonNumber: 8,
        title: "Transaction Filters: Whale Buys vs Micro-Dust Snipes",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Transaction Filters: Whale Buys vs Micro-Dust Snipes in real-world trading environments",
          "Identify key risk factors and signals associated with Transaction Filters: Whale Buys vs Micro-Dust Snipes",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Transaction Filters: Whale Buys vs Micro-Dust Snipes",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Transaction Filters: Whale Buys vs Micro-Dust Snipes is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Transaction Filters: Whale Buys vs Micro-Dust Snipes identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Transaction Filters: Whale Buys vs Micro-Dust Snipes.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Transaction Filters: Whale Buys vs Micro-Dust Snipes?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Transaction Filters: Whale Buys vs Micro-Dust Snipes Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Transaction Filters: Whale Buys vs Micro-Dust Snipes and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l4-09",
        phaseId: 4,
        lessonNumber: 9,
        title: "Integrating Technical Indicators into DexScreener Charts",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Integrating Technical Indicators into DexScreener Charts in real-world trading environments",
          "Identify key risk factors and signals associated with Integrating Technical Indicators into DexScreener Charts",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Integrating Technical Indicators into DexScreener Charts",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Integrating Technical Indicators into DexScreener Charts is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Integrating Technical Indicators into DexScreener Charts identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Integrating Technical Indicators into DexScreener Charts.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Integrating Technical Indicators into DexScreener Charts?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Integrating Technical Indicators into DexScreener Charts Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Integrating Technical Indicators into DexScreener Charts and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l4-10",
        phaseId: 4,
        lessonNumber: 10,
        title: "Detecting Ghost Volume and Bot Spikes",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Detecting Ghost Volume and Bot Spikes in real-world trading environments",
          "Identify key risk factors and signals associated with Detecting Ghost Volume and Bot Spikes",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Detecting Ghost Volume and Bot Spikes",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Detecting Ghost Volume and Bot Spikes is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Detecting Ghost Volume and Bot Spikes identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Detecting Ghost Volume and Bot Spikes.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Detecting Ghost Volume and Bot Spikes?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Detecting Ghost Volume and Bot Spikes Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Detecting Ghost Volume and Bot Spikes and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l4-11",
        phaseId: 4,
        lessonNumber: 11,
        title: "Mobile vs Desktop Workflow Optimization on DexScreener",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Mobile vs Desktop Workflow Optimization on DexScreener in real-world trading environments",
          "Identify key risk factors and signals associated with Mobile vs Desktop Workflow Optimization on DexScreener",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Mobile vs Desktop Workflow Optimization on DexScreener",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Mobile vs Desktop Workflow Optimization on DexScreener is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Mobile vs Desktop Workflow Optimization on DexScreener identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Mobile vs Desktop Workflow Optimization on DexScreener.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Mobile vs Desktop Workflow Optimization on DexScreener?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Mobile vs Desktop Workflow Optimization on DexScreener Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Mobile vs Desktop Workflow Optimization on DexScreener and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l4-12",
        phaseId: 4,
        lessonNumber: 12,
        title: "DexScreener vs Alternative DEX Aggregators",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master DexScreener vs Alternative DEX Aggregators in real-world trading environments",
          "Identify key risk factors and signals associated with DexScreener vs Alternative DEX Aggregators",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "DexScreener vs Alternative DEX Aggregators",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "DexScreener vs Alternative DEX Aggregators is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring DexScreener vs Alternative DEX Aggregators identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on DexScreener vs Alternative DEX Aggregators.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing DexScreener vs Alternative DEX Aggregators?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "DexScreener vs Alternative DEX Aggregators Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of DexScreener vs Alternative DEX Aggregators and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      }
    ]
  },
  {
    id: 5,
    title: "PHASE 05 \u2014 BIRDEYE ANALYTICS",
    subtitle: "On-Chain Data, Trader Profiling, and Holder Metrics",
    description: "Leverage Birdeye for granular on-chain data that raw charts cannot show.",
    levelRequired: 5,
    badge: "ONCHAIN_ANALYST",
    practicalAssignment: {
      title: "Complete a 15-Minute Birdeye Due Diligence Audit",
      description: "Audit 5 active trending tokens on Birdeye.",
      task: "Record Unique Traders, Net Money Flow, Top 10 Holder %, and Security Audit status."
    },
    quiz: {
      id: "quiz-05",
      phaseId: 5,
      title: "Phase 05 Assessment: Birdeye Due Diligence & Holder Analytics",
      passingScore: 75,
      questions: [
        {
          id: "q5-1",
          question: "What is the primary operational rule for Phase 05?",
          options: [
            "Trade blindly without checking metrics",
            "Enforce rigorous analytical confirmation and defined risk parameters",
            "Risk entire portfolio on one coin",
            "Ignore liquidity depth"
          ],
          correctIndex: 1,
          explanation: "Disciplined operators prioritize capital preservation and confluence verification before execution.",
          type: "multiple-choice"
        }
      ]
    },
    lessons: [
      {
        id: "l5-01",
        phaseId: 5,
        lessonNumber: 1,
        title: "Birdeye Overview & Statistical Edge",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Birdeye Overview & Statistical Edge in real-world trading environments",
          "Identify key risk factors and signals associated with Birdeye Overview & Statistical Edge",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Birdeye Overview & Statistical Edge",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Birdeye Overview & Statistical Edge is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Birdeye Overview & Statistical Edge identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Birdeye Overview & Statistical Edge.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Birdeye Overview & Statistical Edge?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Birdeye Overview & Statistical Edge Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Birdeye Overview & Statistical Edge and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l5-02",
        phaseId: 5,
        lessonNumber: 2,
        title: "Unique Traders vs Raw Transaction Volume on Birdeye",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Unique Traders vs Raw Transaction Volume on Birdeye in real-world trading environments",
          "Identify key risk factors and signals associated with Unique Traders vs Raw Transaction Volume on Birdeye",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Unique Traders vs Raw Transaction Volume on Birdeye",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Unique Traders vs Raw Transaction Volume on Birdeye is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Unique Traders vs Raw Transaction Volume on Birdeye identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Unique Traders vs Raw Transaction Volume on Birdeye.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Unique Traders vs Raw Transaction Volume on Birdeye?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Unique Traders vs Raw Transaction Volume on Birdeye Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Unique Traders vs Raw Transaction Volume on Birdeye and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l5-03",
        phaseId: 5,
        lessonNumber: 3,
        title: "Birdeye Leaderboards: Spotting High-Win-Rate Wallets",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Birdeye Leaderboards: Spotting High-Win-Rate Wallets in real-world trading environments",
          "Identify key risk factors and signals associated with Birdeye Leaderboards: Spotting High-Win-Rate Wallets",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Birdeye Leaderboards: Spotting High-Win-Rate Wallets",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Birdeye Leaderboards: Spotting High-Win-Rate Wallets is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Birdeye Leaderboards: Spotting High-Win-Rate Wallets identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Birdeye Leaderboards: Spotting High-Win-Rate Wallets.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Birdeye Leaderboards: Spotting High-Win-Rate Wallets?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Birdeye Leaderboards: Spotting High-Win-Rate Wallets Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Birdeye Leaderboards: Spotting High-Win-Rate Wallets and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l5-04",
        phaseId: 5,
        lessonNumber: 4,
        title: "Token Overview & Security Scores on Birdeye",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Token Overview & Security Scores on Birdeye in real-world trading environments",
          "Identify key risk factors and signals associated with Token Overview & Security Scores on Birdeye",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Token Overview & Security Scores on Birdeye",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Token Overview & Security Scores on Birdeye is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Token Overview & Security Scores on Birdeye identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Token Overview & Security Scores on Birdeye.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Token Overview & Security Scores on Birdeye?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Token Overview & Security Scores on Birdeye Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Token Overview & Security Scores on Birdeye and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l5-05",
        phaseId: 5,
        lessonNumber: 5,
        title: "Net Money Flow Inflows vs Outflows",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Net Money Flow Inflows vs Outflows in real-world trading environments",
          "Identify key risk factors and signals associated with Net Money Flow Inflows vs Outflows",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Net Money Flow Inflows vs Outflows",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Net Money Flow Inflows vs Outflows is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Net Money Flow Inflows vs Outflows identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Net Money Flow Inflows vs Outflows.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Net Money Flow Inflows vs Outflows?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Net Money Flow Inflows vs Outflows Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Net Money Flow Inflows vs Outflows and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l5-06",
        phaseId: 5,
        lessonNumber: 6,
        title: "Historical Price & Liquidity Depth Analysis",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Historical Price & Liquidity Depth Analysis in real-world trading environments",
          "Identify key risk factors and signals associated with Historical Price & Liquidity Depth Analysis",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Historical Price & Liquidity Depth Analysis",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Historical Price & Liquidity Depth Analysis is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Historical Price & Liquidity Depth Analysis identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Historical Price & Liquidity Depth Analysis.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Historical Price & Liquidity Depth Analysis?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Historical Price & Liquidity Depth Analysis Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Historical Price & Liquidity Depth Analysis and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l5-07",
        phaseId: 5,
        lessonNumber: 7,
        title: "Tracking Token Holder Distribution Trends",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Tracking Token Holder Distribution Trends in real-world trading environments",
          "Identify key risk factors and signals associated with Tracking Token Holder Distribution Trends",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Tracking Token Holder Distribution Trends",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Tracking Token Holder Distribution Trends is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Tracking Token Holder Distribution Trends identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Tracking Token Holder Distribution Trends.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Tracking Token Holder Distribution Trends?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Tracking Token Holder Distribution Trends Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Tracking Token Holder Distribution Trends and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l5-08",
        phaseId: 5,
        lessonNumber: 8,
        title: "Setting Up Custom Screener Presets on Birdeye",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Setting Up Custom Screener Presets on Birdeye in real-world trading environments",
          "Identify key risk factors and signals associated with Setting Up Custom Screener Presets on Birdeye",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Setting Up Custom Screener Presets on Birdeye",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Setting Up Custom Screener Presets on Birdeye is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Setting Up Custom Screener Presets on Birdeye identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Setting Up Custom Screener Presets on Birdeye.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Setting Up Custom Screener Presets on Birdeye?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Setting Up Custom Screener Presets on Birdeye Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Setting Up Custom Screener Presets on Birdeye and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l5-09",
        phaseId: 5,
        lessonNumber: 9,
        title: "Birdeye API & Real-Time Data Feeds Overview",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Birdeye API & Real-Time Data Feeds Overview in real-world trading environments",
          "Identify key risk factors and signals associated with Birdeye API & Real-Time Data Feeds Overview",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Birdeye API & Real-Time Data Feeds Overview",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Birdeye API & Real-Time Data Feeds Overview is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Birdeye API & Real-Time Data Feeds Overview identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Birdeye API & Real-Time Data Feeds Overview.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Birdeye API & Real-Time Data Feeds Overview?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Birdeye API & Real-Time Data Feeds Overview Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Birdeye API & Real-Time Data Feeds Overview and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l5-10",
        phaseId: 5,
        lessonNumber: 10,
        title: "Birdeye & DexScreener Dual-Screen Confluence Workflow",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Birdeye & DexScreener Dual-Screen Confluence Workflow in real-world trading environments",
          "Identify key risk factors and signals associated with Birdeye & DexScreener Dual-Screen Confluence Workflow",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Birdeye & DexScreener Dual-Screen Confluence Workflow",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Birdeye & DexScreener Dual-Screen Confluence Workflow is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Birdeye & DexScreener Dual-Screen Confluence Workflow identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Birdeye & DexScreener Dual-Screen Confluence Workflow.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Birdeye & DexScreener Dual-Screen Confluence Workflow?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Birdeye & DexScreener Dual-Screen Confluence Workflow Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Birdeye & DexScreener Dual-Screen Confluence Workflow and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      }
    ]
  },
  {
    id: 6,
    title: "PHASE 06 \u2014 TOKEN SAFETY & RUG DETECTION",
    subtitle: "Security Auditing, Contract Verification, and Insider Wallet Analysis",
    description: "Learn how to identify rugs, scams, and traps BEFORE you put capital in.",
    levelRequired: 6,
    badge: "SECURITY_OFFICER",
    practicalAssignment: {
      title: "Conduct a Live Rug Audit on 3 Fresh Tokens",
      description: "Audit 3 newly created tokens and document pass/fail for each critical security test.",
      task: "Document: Mint Authority, Freeze Authority, LP Burn/Lock, Top 10 Holder %, and Bubblemaps clusters."
    },
    quiz: {
      id: "quiz-06",
      phaseId: 6,
      title: "Phase 06 Assessment: Rug Detection & Token Security",
      passingScore: 75,
      questions: [
        {
          id: "q6-1",
          question: "What is the primary operational rule for Phase 06?",
          options: [
            "Trade blindly without checking metrics",
            "Enforce rigorous analytical confirmation and defined risk parameters",
            "Risk entire portfolio on one coin",
            "Ignore liquidity depth"
          ],
          correctIndex: 1,
          explanation: "Disciplined operators prioritize capital preservation and confluence verification before execution.",
          type: "multiple-choice"
        }
      ]
    },
    lessons: [
      {
        id: "l6-01",
        phaseId: 6,
        lessonNumber: 1,
        title: "Mint Authority & Freeze Authority: The Non-Negotiables",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Mint Authority & Freeze Authority: The Non-Negotiables in real-world trading environments",
          "Identify key risk factors and signals associated with Mint Authority & Freeze Authority: The Non-Negotiables",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Mint Authority & Freeze Authority: The Non-Negotiables",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Mint Authority & Freeze Authority: The Non-Negotiables is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Mint Authority & Freeze Authority: The Non-Negotiables identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Mint Authority & Freeze Authority: The Non-Negotiables.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Mint Authority & Freeze Authority: The Non-Negotiables?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Mint Authority & Freeze Authority: The Non-Negotiables Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Mint Authority & Freeze Authority: The Non-Negotiables and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l6-02",
        phaseId: 6,
        lessonNumber: 2,
        title: "Bubblemaps & Clustered Insider Wallets",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Bubblemaps & Clustered Insider Wallets in real-world trading environments",
          "Identify key risk factors and signals associated with Bubblemaps & Clustered Insider Wallets",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Bubblemaps & Clustered Insider Wallets",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Bubblemaps & Clustered Insider Wallets is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Bubblemaps & Clustered Insider Wallets identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Bubblemaps & Clustered Insider Wallets.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Bubblemaps & Clustered Insider Wallets?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Bubblemaps & Clustered Insider Wallets Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Bubblemaps & Clustered Insider Wallets and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l6-03",
        phaseId: 6,
        lessonNumber: 3,
        title: "LP Token Burns vs LP Token Locks: How Developers Pull Liquidity",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master LP Token Burns vs LP Token Locks: How Developers Pull Liquidity in real-world trading environments",
          "Identify key risk factors and signals associated with LP Token Burns vs LP Token Locks: How Developers Pull Liquidity",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "LP Token Burns vs LP Token Locks: How Developers Pull Liquidity",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "LP Token Burns vs LP Token Locks: How Developers Pull Liquidity is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring LP Token Burns vs LP Token Locks: How Developers Pull Liquidity identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on LP Token Burns vs LP Token Locks: How Developers Pull Liquidity.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing LP Token Burns vs LP Token Locks: How Developers Pull Liquidity?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "LP Token Burns vs LP Token Locks: How Developers Pull Liquidity Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of LP Token Burns vs LP Token Locks: How Developers Pull Liquidity and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l6-04",
        phaseId: 6,
        lessonNumber: 4,
        title: "RugCheck.xyz Walkthrough & Automated Risk Audits",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master RugCheck.xyz Walkthrough & Automated Risk Audits in real-world trading environments",
          "Identify key risk factors and signals associated with RugCheck.xyz Walkthrough & Automated Risk Audits",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "RugCheck.xyz Walkthrough & Automated Risk Audits",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "RugCheck.xyz Walkthrough & Automated Risk Audits is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring RugCheck.xyz Walkthrough & Automated Risk Audits identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on RugCheck.xyz Walkthrough & Automated Risk Audits.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing RugCheck.xyz Walkthrough & Automated Risk Audits?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "RugCheck.xyz Walkthrough & Automated Risk Audits Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of RugCheck.xyz Walkthrough & Automated Risk Audits and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l6-05",
        phaseId: 6,
        lessonNumber: 5,
        title: "Top 10 Holder Concentration Risk: The 20% Rule",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Top 10 Holder Concentration Risk: The 20% Rule in real-world trading environments",
          "Identify key risk factors and signals associated with Top 10 Holder Concentration Risk: The 20% Rule",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Top 10 Holder Concentration Risk: The 20% Rule",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Top 10 Holder Concentration Risk: The 20% Rule is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Top 10 Holder Concentration Risk: The 20% Rule identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Top 10 Holder Concentration Risk: The 20% Rule.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Top 10 Holder Concentration Risk: The 20% Rule?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Top 10 Holder Concentration Risk: The 20% Rule Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Top 10 Holder Concentration Risk: The 20% Rule and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l6-06",
        phaseId: 6,
        lessonNumber: 6,
        title: "HoneyPots & Blacklists on Solana: Can You Sell?",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master HoneyPots & Blacklists on Solana: Can You Sell? in real-world trading environments",
          "Identify key risk factors and signals associated with HoneyPots & Blacklists on Solana: Can You Sell?",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "HoneyPots & Blacklists on Solana: Can You Sell?",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "HoneyPots & Blacklists on Solana: Can You Sell? is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring HoneyPots & Blacklists on Solana: Can You Sell? identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on HoneyPots & Blacklists on Solana: Can You Sell?.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing HoneyPots & Blacklists on Solana: Can You Sell??",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "HoneyPots & Blacklists on Solana: Can You Sell? Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of HoneyPots & Blacklists on Solana: Can You Sell? and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l6-07",
        phaseId: 6,
        lessonNumber: 7,
        title: "Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets in real-world trading environments",
          "Identify key risk factors and signals associated with Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l6-08",
        phaseId: 6,
        lessonNumber: 8,
        title: "Social Engineering Red Flags: Fake Influencers & Stolen Content",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Social Engineering Red Flags: Fake Influencers & Stolen Content in real-world trading environments",
          "Identify key risk factors and signals associated with Social Engineering Red Flags: Fake Influencers & Stolen Content",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Social Engineering Red Flags: Fake Influencers & Stolen Content",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Social Engineering Red Flags: Fake Influencers & Stolen Content is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Social Engineering Red Flags: Fake Influencers & Stolen Content identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Social Engineering Red Flags: Fake Influencers & Stolen Content.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Social Engineering Red Flags: Fake Influencers & Stolen Content?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Social Engineering Red Flags: Fake Influencers & Stolen Content Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Social Engineering Red Flags: Fake Influencers & Stolen Content and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l6-09",
        phaseId: 6,
        lessonNumber: 9,
        title: "Metadata Mutability & Image Swapping Vulnerabilities",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Metadata Mutability & Image Swapping Vulnerabilities in real-world trading environments",
          "Identify key risk factors and signals associated with Metadata Mutability & Image Swapping Vulnerabilities",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Metadata Mutability & Image Swapping Vulnerabilities",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Metadata Mutability & Image Swapping Vulnerabilities is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Metadata Mutability & Image Swapping Vulnerabilities identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Metadata Mutability & Image Swapping Vulnerabilities.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Metadata Mutability & Image Swapping Vulnerabilities?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Metadata Mutability & Image Swapping Vulnerabilities Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Metadata Mutability & Image Swapping Vulnerabilities and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l6-10",
        phaseId: 6,
        lessonNumber: 10,
        title: "Telegram & Twitter Verification: Spotting Bottled Engagement",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Telegram & Twitter Verification: Spotting Bottled Engagement in real-world trading environments",
          "Identify key risk factors and signals associated with Telegram & Twitter Verification: Spotting Bottled Engagement",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Telegram & Twitter Verification: Spotting Bottled Engagement",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Telegram & Twitter Verification: Spotting Bottled Engagement is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Telegram & Twitter Verification: Spotting Bottled Engagement identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Telegram & Twitter Verification: Spotting Bottled Engagement.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Telegram & Twitter Verification: Spotting Bottled Engagement?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Telegram & Twitter Verification: Spotting Bottled Engagement Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Telegram & Twitter Verification: Spotting Bottled Engagement and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l6-11",
        phaseId: 6,
        lessonNumber: 11,
        title: "Volume Bot Injections & Bundler Sniping Detection",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Volume Bot Injections & Bundler Sniping Detection in real-world trading environments",
          "Identify key risk factors and signals associated with Volume Bot Injections & Bundler Sniping Detection",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Volume Bot Injections & Bundler Sniping Detection",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Volume Bot Injections & Bundler Sniping Detection is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Volume Bot Injections & Bundler Sniping Detection identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Volume Bot Injections & Bundler Sniping Detection.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Volume Bot Injections & Bundler Sniping Detection?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Volume Bot Injections & Bundler Sniping Detection Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Volume Bot Injections & Bundler Sniping Detection and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l6-12",
        phaseId: 6,
        lessonNumber: 12,
        title: "Coordinated Developer Dumps: Timing the Liquidity Rug",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Coordinated Developer Dumps: Timing the Liquidity Rug in real-world trading environments",
          "Identify key risk factors and signals associated with Coordinated Developer Dumps: Timing the Liquidity Rug",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Coordinated Developer Dumps: Timing the Liquidity Rug",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Coordinated Developer Dumps: Timing the Liquidity Rug is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Coordinated Developer Dumps: Timing the Liquidity Rug identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Coordinated Developer Dumps: Timing the Liquidity Rug.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Coordinated Developer Dumps: Timing the Liquidity Rug?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Coordinated Developer Dumps: Timing the Liquidity Rug Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Coordinated Developer Dumps: Timing the Liquidity Rug and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l6-13",
        phaseId: 6,
        lessonNumber: 13,
        title: "The Pre-Flight Safety Checklist: 60-Second Security Audit",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master The Pre-Flight Safety Checklist: 60-Second Security Audit in real-world trading environments",
          "Identify key risk factors and signals associated with The Pre-Flight Safety Checklist: 60-Second Security Audit",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "The Pre-Flight Safety Checklist: 60-Second Security Audit",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "The Pre-Flight Safety Checklist: 60-Second Security Audit is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring The Pre-Flight Safety Checklist: 60-Second Security Audit identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Pre-Flight Safety Checklist: 60-Second Security Audit.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Pre-Flight Safety Checklist: 60-Second Security Audit?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Pre-Flight Safety Checklist: 60-Second Security Audit Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Pre-Flight Safety Checklist: 60-Second Security Audit and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      }
    ]
  }
];

// src/data/curriculumPhases7to12.ts
var PHASES_7_TO_12 = [
  {
    id: 7,
    title: "PHASE 07 \u2014 WALLET INTELLIGENCE",
    subtitle: "Tracking Smart Money, Copy-Trading Hazards, and Insider Wallets",
    description: "Track the operators who consistently extract profit from the trenches.",
    levelRequired: 7,
    badge: "WALLET_TRACKER",
    practicalAssignment: {
      title: "Build a 10-Wallet Smart Money Tracking Watchlist",
      description: "Identify and verify 10 high-performing Solana trader wallets.",
      task: "Document win rate, average hold time, and token entry timing for each wallet."
    },
    quiz: {
      id: "quiz-07",
      phaseId: 7,
      title: "Phase 07 Assessment: Wallet Intelligence & On-Chain Forensics",
      passingScore: 75,
      questions: [
        {
          id: "q7-1",
          question: "What is the primary operational rule for Phase 07?",
          options: [
            "Trade blindly without checking metrics",
            "Enforce rigorous analytical confirmation and defined risk parameters",
            "Risk entire portfolio on one coin",
            "Ignore liquidity depth"
          ],
          correctIndex: 1,
          explanation: "Disciplined operators prioritize capital preservation and confluence verification before execution.",
          type: "multiple-choice"
        }
      ]
    },
    lessons: [
      {
        id: "l7-01",
        phaseId: 7,
        lessonNumber: 1,
        title: "Reading Raw Wallets & PnL Audits",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Reading Raw Wallets & PnL Audits in real-world trading environments",
          "Identify key risk factors and signals associated with Reading Raw Wallets & PnL Audits",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Reading Raw Wallets & PnL Audits",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Reading Raw Wallets & PnL Audits is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Reading Raw Wallets & PnL Audits identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Reading Raw Wallets & PnL Audits.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Reading Raw Wallets & PnL Audits?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Reading Raw Wallets & PnL Audits Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Reading Raw Wallets & PnL Audits and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l7-02",
        phaseId: 7,
        lessonNumber: 2,
        title: "Solscan Deep Dive: Deciphering SPL Token Transfer Histories",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Solscan Deep Dive: Deciphering SPL Token Transfer Histories in real-world trading environments",
          "Identify key risk factors and signals associated with Solscan Deep Dive: Deciphering SPL Token Transfer Histories",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Solscan Deep Dive: Deciphering SPL Token Transfer Histories",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Solscan Deep Dive: Deciphering SPL Token Transfer Histories is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Solscan Deep Dive: Deciphering SPL Token Transfer Histories identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Solscan Deep Dive: Deciphering SPL Token Transfer Histories.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Solscan Deep Dive: Deciphering SPL Token Transfer Histories?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Solscan Deep Dive: Deciphering SPL Token Transfer Histories Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Solscan Deep Dive: Deciphering SPL Token Transfer Histories and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l7-03",
        phaseId: 7,
        lessonNumber: 3,
        title: "Identifying Smart Money Wallets vs Dev Cabal Wallets",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Identifying Smart Money Wallets vs Dev Cabal Wallets in real-world trading environments",
          "Identify key risk factors and signals associated with Identifying Smart Money Wallets vs Dev Cabal Wallets",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Identifying Smart Money Wallets vs Dev Cabal Wallets",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Identifying Smart Money Wallets vs Dev Cabal Wallets is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Identifying Smart Money Wallets vs Dev Cabal Wallets identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Identifying Smart Money Wallets vs Dev Cabal Wallets.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Identifying Smart Money Wallets vs Dev Cabal Wallets?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Identifying Smart Money Wallets vs Dev Cabal Wallets Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Identifying Smart Money Wallets vs Dev Cabal Wallets and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l7-04",
        phaseId: 7,
        lessonNumber: 4,
        title: "Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges in real-world trading environments",
          "Identify key risk factors and signals associated with Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l7-05",
        phaseId: 7,
        lessonNumber: 5,
        title: "Filter Bubblemaps Clustered Transfers & Direct Transfers",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Filter Bubblemaps Clustered Transfers & Direct Transfers in real-world trading environments",
          "Identify key risk factors and signals associated with Filter Bubblemaps Clustered Transfers & Direct Transfers",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Filter Bubblemaps Clustered Transfers & Direct Transfers",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Filter Bubblemaps Clustered Transfers & Direct Transfers is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Filter Bubblemaps Clustered Transfers & Direct Transfers identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Filter Bubblemaps Clustered Transfers & Direct Transfers.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Filter Bubblemaps Clustered Transfers & Direct Transfers?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Filter Bubblemaps Clustered Transfers & Direct Transfers Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Filter Bubblemaps Clustered Transfers & Direct Transfers and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l7-06",
        phaseId: 7,
        lessonNumber: 6,
        title: "Building a Personal Wallet Watchlist in Telegram & DexScreener",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Building a Personal Wallet Watchlist in Telegram & DexScreener in real-world trading environments",
          "Identify key risk factors and signals associated with Building a Personal Wallet Watchlist in Telegram & DexScreener",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Building a Personal Wallet Watchlist in Telegram & DexScreener",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Building a Personal Wallet Watchlist in Telegram & DexScreener is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Building a Personal Wallet Watchlist in Telegram & DexScreener identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Building a Personal Wallet Watchlist in Telegram & DexScreener.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Building a Personal Wallet Watchlist in Telegram & DexScreener?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Building a Personal Wallet Watchlist in Telegram & DexScreener Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Building a Personal Wallet Watchlist in Telegram & DexScreener and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l7-07",
        phaseId: 7,
        lessonNumber: 7,
        title: "Copy-Trading Risks: Latency, Frontrunning & Slippage Traps",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Copy-Trading Risks: Latency, Frontrunning & Slippage Traps in real-world trading environments",
          "Identify key risk factors and signals associated with Copy-Trading Risks: Latency, Frontrunning & Slippage Traps",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Copy-Trading Risks: Latency, Frontrunning & Slippage Traps",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Copy-Trading Risks: Latency, Frontrunning & Slippage Traps is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Copy-Trading Risks: Latency, Frontrunning & Slippage Traps identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Copy-Trading Risks: Latency, Frontrunning & Slippage Traps.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Copy-Trading Risks: Latency, Frontrunning & Slippage Traps?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Copy-Trading Risks: Latency, Frontrunning & Slippage Traps Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Copy-Trading Risks: Latency, Frontrunning & Slippage Traps and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l7-08",
        phaseId: 7,
        lessonNumber: 8,
        title: "Tracking Early Buyers & Snipers on Pump.fun Launches",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Tracking Early Buyers & Snipers on Pump.fun Launches in real-world trading environments",
          "Identify key risk factors and signals associated with Tracking Early Buyers & Snipers on Pump.fun Launches",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Tracking Early Buyers & Snipers on Pump.fun Launches",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Tracking Early Buyers & Snipers on Pump.fun Launches is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Tracking Early Buyers & Snipers on Pump.fun Launches identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Tracking Early Buyers & Snipers on Pump.fun Launches.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Tracking Early Buyers & Snipers on Pump.fun Launches?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Tracking Early Buyers & Snipers on Pump.fun Launches Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Tracking Early Buyers & Snipers on Pump.fun Launches and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l7-09",
        phaseId: 7,
        lessonNumber: 9,
        title: "Identifying Insider Sniping Rings & Bundled Buys",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Identifying Insider Sniping Rings & Bundled Buys in real-world trading environments",
          "Identify key risk factors and signals associated with Identifying Insider Sniping Rings & Bundled Buys",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Identifying Insider Sniping Rings & Bundled Buys",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Identifying Insider Sniping Rings & Bundled Buys is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Identifying Insider Sniping Rings & Bundled Buys identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Identifying Insider Sniping Rings & Bundled Buys.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Identifying Insider Sniping Rings & Bundled Buys?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Identifying Insider Sniping Rings & Bundled Buys Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Identifying Insider Sniping Rings & Bundled Buys and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l7-10",
        phaseId: 7,
        lessonNumber: 10,
        title: "PnL Verification: Filtering Out Unrealized Paper Gains",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master PnL Verification: Filtering Out Unrealized Paper Gains in real-world trading environments",
          "Identify key risk factors and signals associated with PnL Verification: Filtering Out Unrealized Paper Gains",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "PnL Verification: Filtering Out Unrealized Paper Gains",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "PnL Verification: Filtering Out Unrealized Paper Gains is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring PnL Verification: Filtering Out Unrealized Paper Gains identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on PnL Verification: Filtering Out Unrealized Paper Gains.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing PnL Verification: Filtering Out Unrealized Paper Gains?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "PnL Verification: Filtering Out Unrealized Paper Gains Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of PnL Verification: Filtering Out Unrealized Paper Gains and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l7-11",
        phaseId: 7,
        lessonNumber: 11,
        title: "Analyzing Wallet Holding Time & Distribution Behavior",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Analyzing Wallet Holding Time & Distribution Behavior in real-world trading environments",
          "Identify key risk factors and signals associated with Analyzing Wallet Holding Time & Distribution Behavior",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Analyzing Wallet Holding Time & Distribution Behavior",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Analyzing Wallet Holding Time & Distribution Behavior is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Analyzing Wallet Holding Time & Distribution Behavior identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Analyzing Wallet Holding Time & Distribution Behavior.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Analyzing Wallet Holding Time & Distribution Behavior?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Analyzing Wallet Holding Time & Distribution Behavior Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Analyzing Wallet Holding Time & Distribution Behavior and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l7-12",
        phaseId: 7,
        lessonNumber: 12,
        title: "The Daily Smart Money Flow Routine",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master The Daily Smart Money Flow Routine in real-world trading environments",
          "Identify key risk factors and signals associated with The Daily Smart Money Flow Routine",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "The Daily Smart Money Flow Routine",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "The Daily Smart Money Flow Routine is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring The Daily Smart Money Flow Routine identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Daily Smart Money Flow Routine.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Daily Smart Money Flow Routine?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Daily Smart Money Flow Routine Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Daily Smart Money Flow Routine and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      }
    ]
  },
  {
    id: 8,
    title: "PHASE 08 \u2014 VOLUME & ORGANIC DEMAND",
    subtitle: "Decoding Market Interest, Wash Trading, and Liquidity Inflows",
    description: "Understand what real demand looks like vs manufactured illusions.",
    levelRequired: 8,
    badge: "VOLUME_SPECIALIST",
    practicalAssignment: {
      title: "Distinguish Organic Volume from Wash Trading",
      description: "Compare 2 tokens on DexScreener with similar 24h volume ($500K+).",
      task: "Prove which token is experiencing real organic retail demand vs automated wash bots."
    },
    quiz: {
      id: "quiz-08",
      phaseId: 8,
      title: "Phase 08 Assessment: Volume Analysis & Demand Verification",
      passingScore: 75,
      questions: [
        {
          id: "q8-1",
          question: "What is the primary operational rule for Phase 08?",
          options: [
            "Trade blindly without checking metrics",
            "Enforce rigorous analytical confirmation and defined risk parameters",
            "Risk entire portfolio on one coin",
            "Ignore liquidity depth"
          ],
          correctIndex: 1,
          explanation: "Disciplined operators prioritize capital preservation and confluence verification before execution.",
          type: "multiple-choice"
        }
      ]
    },
    lessons: [
      {
        id: "l8-01",
        phaseId: 8,
        lessonNumber: 1,
        title: "Raw Volume vs Volume Acceleration",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Raw Volume vs Volume Acceleration in real-world trading environments",
          "Identify key risk factors and signals associated with Raw Volume vs Volume Acceleration",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Raw Volume vs Volume Acceleration",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Raw Volume vs Volume Acceleration is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Raw Volume vs Volume Acceleration identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Raw Volume vs Volume Acceleration.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Raw Volume vs Volume Acceleration?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Raw Volume vs Volume Acceleration Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Raw Volume vs Volume Acceleration and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l8-02",
        phaseId: 8,
        lessonNumber: 2,
        title: "Identifying Organic Community Volume vs Market Maker Wash Trading",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Identifying Organic Community Volume vs Market Maker Wash Trading in real-world trading environments",
          "Identify key risk factors and signals associated with Identifying Organic Community Volume vs Market Maker Wash Trading",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Identifying Organic Community Volume vs Market Maker Wash Trading",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Identifying Organic Community Volume vs Market Maker Wash Trading is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Identifying Organic Community Volume vs Market Maker Wash Trading identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Identifying Organic Community Volume vs Market Maker Wash Trading.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Identifying Organic Community Volume vs Market Maker Wash Trading?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Identifying Organic Community Volume vs Market Maker Wash Trading Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Identifying Organic Community Volume vs Market Maker Wash Trading and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l8-03",
        phaseId: 8,
        lessonNumber: 3,
        title: "Volume-to-Market-Cap (V/MC) Ratio Benchmarks",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Volume-to-Market-Cap (V/MC) Ratio Benchmarks in real-world trading environments",
          "Identify key risk factors and signals associated with Volume-to-Market-Cap (V/MC) Ratio Benchmarks",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Volume-to-Market-Cap (V/MC) Ratio Benchmarks",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Volume-to-Market-Cap (V/MC) Ratio Benchmarks is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Volume-to-Market-Cap (V/MC) Ratio Benchmarks identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Volume-to-Market-Cap (V/MC) Ratio Benchmarks.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Volume-to-Market-Cap (V/MC) Ratio Benchmarks?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Volume-to-Market-Cap (V/MC) Ratio Benchmarks Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Volume-to-Market-Cap (V/MC) Ratio Benchmarks and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l8-04",
        phaseId: 8,
        lessonNumber: 4,
        title: "Transaction Count vs Volume: Retail vs Whales",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Transaction Count vs Volume: Retail vs Whales in real-world trading environments",
          "Identify key risk factors and signals associated with Transaction Count vs Volume: Retail vs Whales",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Transaction Count vs Volume: Retail vs Whales",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Transaction Count vs Volume: Retail vs Whales is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Transaction Count vs Volume: Retail vs Whales identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Transaction Count vs Volume: Retail vs Whales.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Transaction Count vs Volume: Retail vs Whales?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Transaction Count vs Volume: Retail vs Whales Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Transaction Count vs Volume: Retail vs Whales and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l8-05",
        phaseId: 8,
        lessonNumber: 5,
        title: "Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN)",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN) in real-world trading environments",
          "Identify key risk factors and signals associated with Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN)",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN)",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN) is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN) identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN).",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN)?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN) Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN) and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l8-06",
        phaseId: 8,
        lessonNumber: 6,
        title: "Exhaustion Volume vs Breakout Volume",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Exhaustion Volume vs Breakout Volume in real-world trading environments",
          "Identify key risk factors and signals associated with Exhaustion Volume vs Breakout Volume",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Exhaustion Volume vs Breakout Volume",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Exhaustion Volume vs Breakout Volume is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Exhaustion Volume vs Breakout Volume identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Exhaustion Volume vs Breakout Volume.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Exhaustion Volume vs Breakout Volume?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Exhaustion Volume vs Breakout Volume Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Exhaustion Volume vs Breakout Volume and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l8-07",
        phaseId: 8,
        lessonNumber: 7,
        title: "Buy-to-Sell Pressure Imbalances: Order Flow Dynamics",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Buy-to-Sell Pressure Imbalances: Order Flow Dynamics in real-world trading environments",
          "Identify key risk factors and signals associated with Buy-to-Sell Pressure Imbalances: Order Flow Dynamics",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Buy-to-Sell Pressure Imbalances: Order Flow Dynamics",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Buy-to-Sell Pressure Imbalances: Order Flow Dynamics is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Buy-to-Sell Pressure Imbalances: Order Flow Dynamics identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Buy-to-Sell Pressure Imbalances: Order Flow Dynamics.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Buy-to-Sell Pressure Imbalances: Order Flow Dynamics?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Buy-to-Sell Pressure Imbalances: Order Flow Dynamics Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Buy-to-Sell Pressure Imbalances: Order Flow Dynamics and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l8-08",
        phaseId: 8,
        lessonNumber: 8,
        title: "Time-of-Day Volume Cycles (Asia, Europe, US Market Hours)",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Time-of-Day Volume Cycles (Asia, Europe, US Market Hours) in real-world trading environments",
          "Identify key risk factors and signals associated with Time-of-Day Volume Cycles (Asia, Europe, US Market Hours)",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Time-of-Day Volume Cycles (Asia, Europe, US Market Hours)",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Time-of-Day Volume Cycles (Asia, Europe, US Market Hours) is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Time-of-Day Volume Cycles (Asia, Europe, US Market Hours) identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Time-of-Day Volume Cycles (Asia, Europe, US Market Hours).",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Time-of-Day Volume Cycles (Asia, Europe, US Market Hours)?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Time-of-Day Volume Cycles (Asia, Europe, US Market Hours) Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Time-of-Day Volume Cycles (Asia, Europe, US Market Hours) and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l8-09",
        phaseId: 8,
        lessonNumber: 9,
        title: "Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes in real-world trading environments",
          "Identify key risk factors and signals associated with Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l8-10",
        phaseId: 8,
        lessonNumber: 10,
        title: "Bonding Curve Migration Volume Surges",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Bonding Curve Migration Volume Surges in real-world trading environments",
          "Identify key risk factors and signals associated with Bonding Curve Migration Volume Surges",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Bonding Curve Migration Volume Surges",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Bonding Curve Migration Volume Surges is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Bonding Curve Migration Volume Surges identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Bonding Curve Migration Volume Surges.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Bonding Curve Migration Volume Surges?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Bonding Curve Migration Volume Surges Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Bonding Curve Migration Volume Surges and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l8-11",
        phaseId: 8,
        lessonNumber: 11,
        title: "Sustained Volume vs Single-Candle Pump-and-Dump Spikes",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Sustained Volume vs Single-Candle Pump-and-Dump Spikes in real-world trading environments",
          "Identify key risk factors and signals associated with Sustained Volume vs Single-Candle Pump-and-Dump Spikes",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Sustained Volume vs Single-Candle Pump-and-Dump Spikes",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Sustained Volume vs Single-Candle Pump-and-Dump Spikes is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Sustained Volume vs Single-Candle Pump-and-Dump Spikes identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Sustained Volume vs Single-Candle Pump-and-Dump Spikes.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Sustained Volume vs Single-Candle Pump-and-Dump Spikes?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Sustained Volume vs Single-Candle Pump-and-Dump Spikes Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Sustained Volume vs Single-Candle Pump-and-Dump Spikes and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l8-12",
        phaseId: 8,
        lessonNumber: 12,
        title: "Volume Confluence Scoring Framework",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Volume Confluence Scoring Framework in real-world trading environments",
          "Identify key risk factors and signals associated with Volume Confluence Scoring Framework",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Volume Confluence Scoring Framework",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Volume Confluence Scoring Framework is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Volume Confluence Scoring Framework identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Volume Confluence Scoring Framework.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Volume Confluence Scoring Framework?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Volume Confluence Scoring Framework Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Volume Confluence Scoring Framework and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      }
    ]
  },
  {
    id: 9,
    title: "PHASE 09 \u2014 MEMECOIN ENTRY STRATEGIES",
    subtitle: "High-Probability Setups: Retests, Reclaims & Bonding Curve Plays",
    description: "Stop buying tops. Master the 8 repeatable entry setups used by profitable trench operators.",
    levelRequired: 9,
    badge: "ENTRY_TACTICIAN",
    practicalAssignment: {
      title: "Execute and Document 5 Strategy Setups in Your Journal",
      description: "Identify and document 5 setups that match our core entry strategies.",
      task: "For each: screenshot setup, document invalidation price, target TP levels, and execution outcome."
    },
    quiz: {
      id: "quiz-09",
      phaseId: 9,
      title: "Phase 09 Assessment: Entry Strategy Execution & Discipline",
      passingScore: 75,
      questions: [
        {
          id: "q9-1",
          question: "What is the primary operational rule for Phase 09?",
          options: [
            "Trade blindly without checking metrics",
            "Enforce rigorous analytical confirmation and defined risk parameters",
            "Risk entire portfolio on one coin",
            "Ignore liquidity depth"
          ],
          correctIndex: 1,
          explanation: "Disciplined operators prioritize capital preservation and confluence verification before execution.",
          type: "multiple-choice"
        }
      ]
    },
    lessons: [
      {
        id: "l9-01",
        phaseId: 9,
        lessonNumber: 1,
        title: "Strategy 01: The Pullback & S/R Re-Test Entry",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Strategy 01: The Pullback & S/R Re-Test Entry in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 01: The Pullback & S/R Re-Test Entry",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Strategy 01: The Pullback & S/R Re-Test Entry",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Strategy 01: The Pullback & S/R Re-Test Entry is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Strategy 01: The Pullback & S/R Re-Test Entry identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 01: The Pullback & S/R Re-Test Entry.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 01: The Pullback & S/R Re-Test Entry?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 01: The Pullback & S/R Re-Test Entry Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 01: The Pullback & S/R Re-Test Entry and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l9-02",
        phaseId: 9,
        lessonNumber: 2,
        title: "Strategy 02: The Support Reclaim (Liquidity Sweep Entry)",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Strategy 02: The Support Reclaim (Liquidity Sweep Entry) in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 02: The Support Reclaim (Liquidity Sweep Entry)",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Strategy 02: The Support Reclaim (Liquidity Sweep Entry)",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Strategy 02: The Support Reclaim (Liquidity Sweep Entry) is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Strategy 02: The Support Reclaim (Liquidity Sweep Entry) identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 02: The Support Reclaim (Liquidity Sweep Entry).",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 02: The Support Reclaim (Liquidity Sweep Entry)?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 02: The Support Reclaim (Liquidity Sweep Entry) Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 02: The Support Reclaim (Liquidity Sweep Entry) and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l9-03",
        phaseId: 9,
        lessonNumber: 3,
        title: "Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce)",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce) in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce)",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce)",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce) is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce) identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce).",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce)?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce) Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce) and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l9-04",
        phaseId: 9,
        lessonNumber: 4,
        title: "Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l9-05",
        phaseId: 9,
        lessonNumber: 5,
        title: "Strategy 05: The Consolidation Range Breakout Entry",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Strategy 05: The Consolidation Range Breakout Entry in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 05: The Consolidation Range Breakout Entry",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Strategy 05: The Consolidation Range Breakout Entry",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Strategy 05: The Consolidation Range Breakout Entry is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Strategy 05: The Consolidation Range Breakout Entry identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 05: The Consolidation Range Breakout Entry.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 05: The Consolidation Range Breakout Entry?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 05: The Consolidation Range Breakout Entry Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 05: The Consolidation Range Breakout Entry and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l9-06",
        phaseId: 9,
        lessonNumber: 6,
        title: "Strategy 06: The Golden Pocket Fibonacci Retracement Entry",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Strategy 06: The Golden Pocket Fibonacci Retracement Entry in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 06: The Golden Pocket Fibonacci Retracement Entry",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Strategy 06: The Golden Pocket Fibonacci Retracement Entry",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Strategy 06: The Golden Pocket Fibonacci Retracement Entry is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Strategy 06: The Golden Pocket Fibonacci Retracement Entry identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 06: The Golden Pocket Fibonacci Retracement Entry.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 06: The Golden Pocket Fibonacci Retracement Entry?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 06: The Golden Pocket Fibonacci Retracement Entry Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 06: The Golden Pocket Fibonacci Retracement Entry and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l9-07",
        phaseId: 9,
        lessonNumber: 7,
        title: "Strategy 07: The Smart Money Wallet Inflow Follow",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Strategy 07: The Smart Money Wallet Inflow Follow in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 07: The Smart Money Wallet Inflow Follow",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Strategy 07: The Smart Money Wallet Inflow Follow",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Strategy 07: The Smart Money Wallet Inflow Follow is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Strategy 07: The Smart Money Wallet Inflow Follow identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 07: The Smart Money Wallet Inflow Follow.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 07: The Smart Money Wallet Inflow Follow?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 07: The Smart Money Wallet Inflow Follow Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 07: The Smart Money Wallet Inflow Follow and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l9-08",
        phaseId: 9,
        lessonNumber: 8,
        title: "Strategy 08: The Second-Leg Continuation Play",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Strategy 08: The Second-Leg Continuation Play in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 08: The Second-Leg Continuation Play",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Strategy 08: The Second-Leg Continuation Play",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Strategy 08: The Second-Leg Continuation Play is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Strategy 08: The Second-Leg Continuation Play identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 08: The Second-Leg Continuation Play.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 08: The Second-Leg Continuation Play?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 08: The Second-Leg Continuation Play Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 08: The Second-Leg Continuation Play and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l9-09",
        phaseId: 9,
        lessonNumber: 9,
        title: "Entry Timing: Limit Bids vs Aggressive Market Swaps",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Entry Timing: Limit Bids vs Aggressive Market Swaps in real-world trading environments",
          "Identify key risk factors and signals associated with Entry Timing: Limit Bids vs Aggressive Market Swaps",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Entry Timing: Limit Bids vs Aggressive Market Swaps",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Entry Timing: Limit Bids vs Aggressive Market Swaps is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Entry Timing: Limit Bids vs Aggressive Market Swaps identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Entry Timing: Limit Bids vs Aggressive Market Swaps.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Entry Timing: Limit Bids vs Aggressive Market Swaps?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Entry Timing: Limit Bids vs Aggressive Market Swaps Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Entry Timing: Limit Bids vs Aggressive Market Swaps and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l9-10",
        phaseId: 9,
        lessonNumber: 10,
        title: "Scaling In: Staggered DCA vs Single Bullet Entry",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Scaling In: Staggered DCA vs Single Bullet Entry in real-world trading environments",
          "Identify key risk factors and signals associated with Scaling In: Staggered DCA vs Single Bullet Entry",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Scaling In: Staggered DCA vs Single Bullet Entry",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Scaling In: Staggered DCA vs Single Bullet Entry is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Scaling In: Staggered DCA vs Single Bullet Entry identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Scaling In: Staggered DCA vs Single Bullet Entry.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Scaling In: Staggered DCA vs Single Bullet Entry?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Scaling In: Staggered DCA vs Single Bullet Entry Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Scaling In: Staggered DCA vs Single Bullet Entry and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l9-11",
        phaseId: 9,
        lessonNumber: 11,
        title: "Invalidating an Entry: When to Cut Immediately",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Invalidating an Entry: When to Cut Immediately in real-world trading environments",
          "Identify key risk factors and signals associated with Invalidating an Entry: When to Cut Immediately",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Invalidating an Entry: When to Cut Immediately",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Invalidating an Entry: When to Cut Immediately is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Invalidating an Entry: When to Cut Immediately identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Invalidating an Entry: When to Cut Immediately.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Invalidating an Entry: When to Cut Immediately?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Invalidating an Entry: When to Cut Immediately Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Invalidating an Entry: When to Cut Immediately and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l9-12",
        phaseId: 9,
        lessonNumber: 12,
        title: "Managing Slippage During High-Volatility Breakouts",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Managing Slippage During High-Volatility Breakouts in real-world trading environments",
          "Identify key risk factors and signals associated with Managing Slippage During High-Volatility Breakouts",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Managing Slippage During High-Volatility Breakouts",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Managing Slippage During High-Volatility Breakouts is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Managing Slippage During High-Volatility Breakouts identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Managing Slippage During High-Volatility Breakouts.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Managing Slippage During High-Volatility Breakouts?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Managing Slippage During High-Volatility Breakouts Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Managing Slippage During High-Volatility Breakouts and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l9-13",
        phaseId: 9,
        lessonNumber: 13,
        title: "Avoiding Top-Tick FOMO Entries: The 3-Candle Rule",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Avoiding Top-Tick FOMO Entries: The 3-Candle Rule in real-world trading environments",
          "Identify key risk factors and signals associated with Avoiding Top-Tick FOMO Entries: The 3-Candle Rule",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Avoiding Top-Tick FOMO Entries: The 3-Candle Rule",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Avoiding Top-Tick FOMO Entries: The 3-Candle Rule is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Avoiding Top-Tick FOMO Entries: The 3-Candle Rule identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Avoiding Top-Tick FOMO Entries: The 3-Candle Rule.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Avoiding Top-Tick FOMO Entries: The 3-Candle Rule?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Avoiding Top-Tick FOMO Entries: The 3-Candle Rule Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Avoiding Top-Tick FOMO Entries: The 3-Candle Rule and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      }
    ]
  },
  {
    id: 10,
    title: "PHASE 10 \u2014 RISK MANAGEMENT",
    subtitle: "Position Sizing, Capital Preservation, and Ruin Prevention",
    description: "The difference between a trader who lasts 2 weeks and one who lasts 2 years.",
    levelRequired: 10,
    badge: "RISK_OFFICER",
    practicalAssignment: {
      title: "Calculate Position Sizes for 5 Scenarios",
      description: "Use the TRENCHLAB Position Sizing Calculator to size 5 simulated trades.",
      task: "Document portfolio size, risk %, entry, invalidation, and calculated SOL position size."
    },
    quiz: {
      id: "quiz-10",
      phaseId: 10,
      title: "Phase 10 Assessment: Risk Mathematics & Position Sizing",
      passingScore: 75,
      questions: [
        {
          id: "q10-1",
          question: "What is the primary operational rule for Phase 10?",
          options: [
            "Trade blindly without checking metrics",
            "Enforce rigorous analytical confirmation and defined risk parameters",
            "Risk entire portfolio on one coin",
            "Ignore liquidity depth"
          ],
          correctIndex: 1,
          explanation: "Disciplined operators prioritize capital preservation and confluence verification before execution.",
          type: "multiple-choice"
        }
      ]
    },
    lessons: [
      {
        id: "l10-01",
        phaseId: 10,
        lessonNumber: 1,
        title: "The Golden Rule of Capital Preservation: Survival First",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master The Golden Rule of Capital Preservation: Survival First in real-world trading environments",
          "Identify key risk factors and signals associated with The Golden Rule of Capital Preservation: Survival First",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "The Golden Rule of Capital Preservation: Survival First",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "The Golden Rule of Capital Preservation: Survival First is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring The Golden Rule of Capital Preservation: Survival First identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Golden Rule of Capital Preservation: Survival First.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Golden Rule of Capital Preservation: Survival First?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Golden Rule of Capital Preservation: Survival First Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Golden Rule of Capital Preservation: Survival First and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l10-02",
        phaseId: 10,
        lessonNumber: 2,
        title: "Interactive Position Sizing Calculator Mastery",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Interactive Position Sizing Calculator Mastery in real-world trading environments",
          "Identify key risk factors and signals associated with Interactive Position Sizing Calculator Mastery",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Interactive Position Sizing Calculator Mastery",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Interactive Position Sizing Calculator Mastery is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Interactive Position Sizing Calculator Mastery identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Interactive Position Sizing Calculator Mastery.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Interactive Position Sizing Calculator Mastery?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Interactive Position Sizing Calculator Mastery Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Interactive Position Sizing Calculator Mastery and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l10-03",
        phaseId: 10,
        lessonNumber: 3,
        title: "Calculating Maximum Risk Per Trade (1-2% Account Rule)",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Calculating Maximum Risk Per Trade (1-2% Account Rule) in real-world trading environments",
          "Identify key risk factors and signals associated with Calculating Maximum Risk Per Trade (1-2% Account Rule)",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Calculating Maximum Risk Per Trade (1-2% Account Rule)",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Calculating Maximum Risk Per Trade (1-2% Account Rule) is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Calculating Maximum Risk Per Trade (1-2% Account Rule) identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Calculating Maximum Risk Per Trade (1-2% Account Rule).",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Calculating Maximum Risk Per Trade (1-2% Account Rule)?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Calculating Maximum Risk Per Trade (1-2% Account Rule) Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Calculating Maximum Risk Per Trade (1-2% Account Rule) and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l10-04",
        phaseId: 10,
        lessonNumber: 4,
        title: "Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs in real-world trading environments",
          "Identify key risk factors and signals associated with Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l10-05",
        phaseId: 10,
        lessonNumber: 5,
        title: "Portfolio Allocation: Moonshots vs Core Sol Holdings",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Portfolio Allocation: Moonshots vs Core Sol Holdings in real-world trading environments",
          "Identify key risk factors and signals associated with Portfolio Allocation: Moonshots vs Core Sol Holdings",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Portfolio Allocation: Moonshots vs Core Sol Holdings",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Portfolio Allocation: Moonshots vs Core Sol Holdings is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Portfolio Allocation: Moonshots vs Core Sol Holdings identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Portfolio Allocation: Moonshots vs Core Sol Holdings.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Portfolio Allocation: Moonshots vs Core Sol Holdings?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Portfolio Allocation: Moonshots vs Core Sol Holdings Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Portfolio Allocation: Moonshots vs Core Sol Holdings and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l10-06",
        phaseId: 10,
        lessonNumber: 6,
        title: "The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible in real-world trading environments",
          "Identify key risk factors and signals associated with The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l10-07",
        phaseId: 10,
        lessonNumber: 7,
        title: "Setting Invalidation Levels Based on Market Structure, Not Dollars",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Setting Invalidation Levels Based on Market Structure, Not Dollars in real-world trading environments",
          "Identify key risk factors and signals associated with Setting Invalidation Levels Based on Market Structure, Not Dollars",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Setting Invalidation Levels Based on Market Structure, Not Dollars",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Setting Invalidation Levels Based on Market Structure, Not Dollars is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Setting Invalidation Levels Based on Market Structure, Not Dollars identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Setting Invalidation Levels Based on Market Structure, Not Dollars.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Setting Invalidation Levels Based on Market Structure, Not Dollars?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Setting Invalidation Levels Based on Market Structure, Not Dollars Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Setting Invalidation Levels Based on Market Structure, Not Dollars and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l10-08",
        phaseId: 10,
        lessonNumber: 8,
        title: "Daily Loss Limits: The Kill Switch Protocol",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Daily Loss Limits: The Kill Switch Protocol in real-world trading environments",
          "Identify key risk factors and signals associated with Daily Loss Limits: The Kill Switch Protocol",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Daily Loss Limits: The Kill Switch Protocol",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Daily Loss Limits: The Kill Switch Protocol is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Daily Loss Limits: The Kill Switch Protocol identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Daily Loss Limits: The Kill Switch Protocol.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Daily Loss Limits: The Kill Switch Protocol?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Daily Loss Limits: The Kill Switch Protocol Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Daily Loss Limits: The Kill Switch Protocol and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l10-09",
        phaseId: 10,
        lessonNumber: 9,
        title: "Managing Exposure Across Multiple Correlated Memecoins",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Managing Exposure Across Multiple Correlated Memecoins in real-world trading environments",
          "Identify key risk factors and signals associated with Managing Exposure Across Multiple Correlated Memecoins",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Managing Exposure Across Multiple Correlated Memecoins",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Managing Exposure Across Multiple Correlated Memecoins is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Managing Exposure Across Multiple Correlated Memecoins identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Managing Exposure Across Multiple Correlated Memecoins.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Managing Exposure Across Multiple Correlated Memecoins?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Managing Exposure Across Multiple Correlated Memecoins Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Managing Exposure Across Multiple Correlated Memecoins and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l10-10",
        phaseId: 10,
        lessonNumber: 10,
        title: "Sizing Down During Low-Volume Chop & Downtrends",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Sizing Down During Low-Volume Chop & Downtrends in real-world trading environments",
          "Identify key risk factors and signals associated with Sizing Down During Low-Volume Chop & Downtrends",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Sizing Down During Low-Volume Chop & Downtrends",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Sizing Down During Low-Volume Chop & Downtrends is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Sizing Down During Low-Volume Chop & Downtrends identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Sizing Down During Low-Volume Chop & Downtrends.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Sizing Down During Low-Volume Chop & Downtrends?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Sizing Down During Low-Volume Chop & Downtrends Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Sizing Down During Low-Volume Chop & Downtrends and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l10-11",
        phaseId: 10,
        lessonNumber: 11,
        title: "Protecting Profits: Bankrolling and Securing Cold Storage Wins",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Protecting Profits: Bankrolling and Securing Cold Storage Wins in real-world trading environments",
          "Identify key risk factors and signals associated with Protecting Profits: Bankrolling and Securing Cold Storage Wins",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Protecting Profits: Bankrolling and Securing Cold Storage Wins",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Protecting Profits: Bankrolling and Securing Cold Storage Wins is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Protecting Profits: Bankrolling and Securing Cold Storage Wins identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Protecting Profits: Bankrolling and Securing Cold Storage Wins.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Protecting Profits: Bankrolling and Securing Cold Storage Wins?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Protecting Profits: Bankrolling and Securing Cold Storage Wins Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Protecting Profits: Bankrolling and Securing Cold Storage Wins and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l10-12",
        phaseId: 10,
        lessonNumber: 12,
        title: "Gas & Priority Fee Budgeting: Avoiding Fee Bleed",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Gas & Priority Fee Budgeting: Avoiding Fee Bleed in real-world trading environments",
          "Identify key risk factors and signals associated with Gas & Priority Fee Budgeting: Avoiding Fee Bleed",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Gas & Priority Fee Budgeting: Avoiding Fee Bleed",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Gas & Priority Fee Budgeting: Avoiding Fee Bleed is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Gas & Priority Fee Budgeting: Avoiding Fee Bleed identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Gas & Priority Fee Budgeting: Avoiding Fee Bleed.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Gas & Priority Fee Budgeting: Avoiding Fee Bleed?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Gas & Priority Fee Budgeting: Avoiding Fee Bleed Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Gas & Priority Fee Budgeting: Avoiding Fee Bleed and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l10-13",
        phaseId: 10,
        lessonNumber: 13,
        title: "Managing Black Swan Events & Flash Crashes",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Managing Black Swan Events & Flash Crashes in real-world trading environments",
          "Identify key risk factors and signals associated with Managing Black Swan Events & Flash Crashes",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Managing Black Swan Events & Flash Crashes",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Managing Black Swan Events & Flash Crashes is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Managing Black Swan Events & Flash Crashes identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Managing Black Swan Events & Flash Crashes.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Managing Black Swan Events & Flash Crashes?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Managing Black Swan Events & Flash Crashes Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Managing Black Swan Events & Flash Crashes and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l10-14",
        phaseId: 10,
        lessonNumber: 14,
        title: "The Operator Risk Management Audit Checklist",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master The Operator Risk Management Audit Checklist in real-world trading environments",
          "Identify key risk factors and signals associated with The Operator Risk Management Audit Checklist",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "The Operator Risk Management Audit Checklist",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "The Operator Risk Management Audit Checklist is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring The Operator Risk Management Audit Checklist identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Operator Risk Management Audit Checklist.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Operator Risk Management Audit Checklist?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Operator Risk Management Audit Checklist Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Operator Risk Management Audit Checklist and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      }
    ]
  },
  {
    id: 11,
    title: "PHASE 11 \u2014 PROFIT MANAGEMENT & PSYCHOLOGY",
    subtitle: "Exit Frameworks, Scaling Out, and Conquering Emotional Sabotage",
    description: "Taking profit is the hardest skill in crypto. Master tiered scaling and emotional regulation.",
    levelRequired: 11,
    badge: "PROFIT_MASTER",
    practicalAssignment: {
      title: "Write Your Personal Take-Profit & Loss Recovery Protocol",
      description: "Draft your mandatory trading rules document.",
      task: "Define your exact TP1/TP2/TP3 rules, daily loss limit kill switch, and post-loss cooldown routine."
    },
    quiz: {
      id: "quiz-11",
      phaseId: 11,
      title: "Phase 11 Assessment: Profit Frameworks & Psychological Regulation",
      passingScore: 75,
      questions: [
        {
          id: "q11-1",
          question: "What is the primary operational rule for Phase 11?",
          options: [
            "Trade blindly without checking metrics",
            "Enforce rigorous analytical confirmation and defined risk parameters",
            "Risk entire portfolio on one coin",
            "Ignore liquidity depth"
          ],
          correctIndex: 1,
          explanation: "Disciplined operators prioritize capital preservation and confluence verification before execution.",
          type: "multiple-choice"
        }
      ]
    },
    lessons: [
      {
        id: "l11-01",
        phaseId: 11,
        lessonNumber: 1,
        title: "The Tiered Profit Framework: TP1, TP2, TP3 & Runners",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master The Tiered Profit Framework: TP1, TP2, TP3 & Runners in real-world trading environments",
          "Identify key risk factors and signals associated with The Tiered Profit Framework: TP1, TP2, TP3 & Runners",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "The Tiered Profit Framework: TP1, TP2, TP3 & Runners",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "The Tiered Profit Framework: TP1, TP2, TP3 & Runners is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring The Tiered Profit Framework: TP1, TP2, TP3 & Runners identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Tiered Profit Framework: TP1, TP2, TP3 & Runners.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Tiered Profit Framework: TP1, TP2, TP3 & Runners?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Tiered Profit Framework: TP1, TP2, TP3 & Runners Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Tiered Profit Framework: TP1, TP2, TP3 & Runners and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l11-02",
        phaseId: 11,
        lessonNumber: 2,
        title: "Trading Psychology: Conquering FOMO, Greed & Revenge",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Trading Psychology: Conquering FOMO, Greed & Revenge in real-world trading environments",
          "Identify key risk factors and signals associated with Trading Psychology: Conquering FOMO, Greed & Revenge",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Trading Psychology: Conquering FOMO, Greed & Revenge",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Trading Psychology: Conquering FOMO, Greed & Revenge is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Trading Psychology: Conquering FOMO, Greed & Revenge identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Trading Psychology: Conquering FOMO, Greed & Revenge.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Trading Psychology: Conquering FOMO, Greed & Revenge?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Trading Psychology: Conquering FOMO, Greed & Revenge Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Trading Psychology: Conquering FOMO, Greed & Revenge and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l11-03",
        phaseId: 11,
        lessonNumber: 3,
        title: "De-Risking to Free Roll: Pulling Initial Capital on Double",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master De-Risking to Free Roll: Pulling Initial Capital on Double in real-world trading environments",
          "Identify key risk factors and signals associated with De-Risking to Free Roll: Pulling Initial Capital on Double",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "De-Risking to Free Roll: Pulling Initial Capital on Double",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "De-Risking to Free Roll: Pulling Initial Capital on Double is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring De-Risking to Free Roll: Pulling Initial Capital on Double identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on De-Risking to Free Roll: Pulling Initial Capital on Double.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing De-Risking to Free Roll: Pulling Initial Capital on Double?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "De-Risking to Free Roll: Pulling Initial Capital on Double Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of De-Risking to Free Roll: Pulling Initial Capital on Double and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l11-04",
        phaseId: 11,
        lessonNumber: 4,
        title: "Trailing Stops Using Market Structure Swing Lows",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Trailing Stops Using Market Structure Swing Lows in real-world trading environments",
          "Identify key risk factors and signals associated with Trailing Stops Using Market Structure Swing Lows",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Trailing Stops Using Market Structure Swing Lows",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Trailing Stops Using Market Structure Swing Lows is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Trailing Stops Using Market Structure Swing Lows identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Trailing Stops Using Market Structure Swing Lows.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Trailing Stops Using Market Structure Swing Lows?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Trailing Stops Using Market Structure Swing Lows Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Trailing Stops Using Market Structure Swing Lows and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l11-05",
        phaseId: 11,
        lessonNumber: 5,
        title: 'The "Round Number" Psychological Trap ($1M, $10M, $100M MC)',
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          'Master The "Round Number" Psychological Trap ($1M, $10M, $100M MC) in real-world trading environments',
          'Identify key risk factors and signals associated with The "Round Number" Psychological Trap ($1M, $10M, $100M MC)',
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          'The "Round Number" Psychological Trap ($1M, $10M, $100M MC)',
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          'The "Round Number" Psychological Trap ($1M, $10M, $100M MC) is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.',
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: 'An operator monitoring The "Round Number" Psychological Trap ($1M, $10M, $100M MC) identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.',
        commonMistakes: [
          'Entering without waiting for confirmation on The "Round Number" Psychological Trap ($1M, $10M, $100M MC).',
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: 'What is the most critical principle when analyzing The "Round Number" Psychological Trap ($1M, $10M, $100M MC)?',
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: 'The "Round Number" Psychological Trap ($1M, $10M, $100M MC) Practical Audit',
          instructions: 'Observe 3 live Solana tokens demonstrating principles of The "Round Number" Psychological Trap ($1M, $10M, $100M MC) and document your findings.',
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l11-06",
        phaseId: 11,
        lessonNumber: 6,
        title: 'Dealing with "Should-Have-Held" Regret & Seller Remorse',
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          'Master Dealing with "Should-Have-Held" Regret & Seller Remorse in real-world trading environments',
          'Identify key risk factors and signals associated with Dealing with "Should-Have-Held" Regret & Seller Remorse',
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          'Dealing with "Should-Have-Held" Regret & Seller Remorse',
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          'Dealing with "Should-Have-Held" Regret & Seller Remorse is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.',
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: 'An operator monitoring Dealing with "Should-Have-Held" Regret & Seller Remorse identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.',
        commonMistakes: [
          'Entering without waiting for confirmation on Dealing with "Should-Have-Held" Regret & Seller Remorse.',
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: 'What is the most critical principle when analyzing Dealing with "Should-Have-Held" Regret & Seller Remorse?',
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: 'Dealing with "Should-Have-Held" Regret & Seller Remorse Practical Audit',
          instructions: 'Observe 3 live Solana tokens demonstrating principles of Dealing with "Should-Have-Held" Regret & Seller Remorse and document your findings.',
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l11-07",
        phaseId: 11,
        lessonNumber: 7,
        title: "The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses in real-world trading environments",
          "Identify key risk factors and signals associated with The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l11-08",
        phaseId: 11,
        lessonNumber: 8,
        title: "Overcoming Overtrading & Dopamine Addiction in the Trenches",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Overcoming Overtrading & Dopamine Addiction in the Trenches in real-world trading environments",
          "Identify key risk factors and signals associated with Overcoming Overtrading & Dopamine Addiction in the Trenches",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Overcoming Overtrading & Dopamine Addiction in the Trenches",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Overcoming Overtrading & Dopamine Addiction in the Trenches is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Overcoming Overtrading & Dopamine Addiction in the Trenches identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Overcoming Overtrading & Dopamine Addiction in the Trenches.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Overcoming Overtrading & Dopamine Addiction in the Trenches?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Overcoming Overtrading & Dopamine Addiction in the Trenches Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Overcoming Overtrading & Dopamine Addiction in the Trenches and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l11-09",
        phaseId: 11,
        lessonNumber: 9,
        title: "Managing Win Streaks: The Danger of Euphoric Sizing",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Managing Win Streaks: The Danger of Euphoric Sizing in real-world trading environments",
          "Identify key risk factors and signals associated with Managing Win Streaks: The Danger of Euphoric Sizing",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Managing Win Streaks: The Danger of Euphoric Sizing",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Managing Win Streaks: The Danger of Euphoric Sizing is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Managing Win Streaks: The Danger of Euphoric Sizing identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Managing Win Streaks: The Danger of Euphoric Sizing.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Managing Win Streaks: The Danger of Euphoric Sizing?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Managing Win Streaks: The Danger of Euphoric Sizing Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Managing Win Streaks: The Danger of Euphoric Sizing and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l11-10",
        phaseId: 11,
        lessonNumber: 10,
        title: "Managing Losing Streaks: Preserving Mental Capital",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Managing Losing Streaks: Preserving Mental Capital in real-world trading environments",
          "Identify key risk factors and signals associated with Managing Losing Streaks: Preserving Mental Capital",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Managing Losing Streaks: Preserving Mental Capital",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Managing Losing Streaks: Preserving Mental Capital is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Managing Losing Streaks: Preserving Mental Capital identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Managing Losing Streaks: Preserving Mental Capital.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Managing Losing Streaks: Preserving Mental Capital?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Managing Losing Streaks: Preserving Mental Capital Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Managing Losing Streaks: Preserving Mental Capital and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l11-11",
        phaseId: 11,
        lessonNumber: 11,
        title: "Building a Daily Routine & Trading Journal Habit",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Building a Daily Routine & Trading Journal Habit in real-world trading environments",
          "Identify key risk factors and signals associated with Building a Daily Routine & Trading Journal Habit",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Building a Daily Routine & Trading Journal Habit",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Building a Daily Routine & Trading Journal Habit is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Building a Daily Routine & Trading Journal Habit identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Building a Daily Routine & Trading Journal Habit.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Building a Daily Routine & Trading Journal Habit?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Building a Daily Routine & Trading Journal Habit Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Building a Daily Routine & Trading Journal Habit and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l11-12",
        phaseId: 11,
        lessonNumber: 12,
        title: "The Long-Term Operator Mindset: Compound Growth Over Overnight Millions",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master The Long-Term Operator Mindset: Compound Growth Over Overnight Millions in real-world trading environments",
          "Identify key risk factors and signals associated with The Long-Term Operator Mindset: Compound Growth Over Overnight Millions",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "The Long-Term Operator Mindset: Compound Growth Over Overnight Millions",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "The Long-Term Operator Mindset: Compound Growth Over Overnight Millions is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring The Long-Term Operator Mindset: Compound Growth Over Overnight Millions identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Long-Term Operator Mindset: Compound Growth Over Overnight Millions.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Long-Term Operator Mindset: Compound Growth Over Overnight Millions?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Long-Term Operator Mindset: Compound Growth Over Overnight Millions Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Long-Term Operator Mindset: Compound Growth Over Overnight Millions and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      }
    ]
  },
  {
    id: 12,
    title: "PHASE 12 \u2014 ADVANCED TRENCHLAB & SYSTEM BUILDING",
    subtitle: "Building Your Personal On-Chain Trading System & Confluence Matrix",
    description: "Synthesize everything you have learned into an individualized, repeatable trading edge.",
    levelRequired: 12,
    badge: "SYSTEM_BUILDER",
    practicalAssignment: {
      title: "The TrenchLab Capstone Trading System Defense",
      description: "Build and submit your complete personal trading plan.",
      task: "Document your setup criteria, checklist, risk rules, daily routine, and backtested results."
    },
    quiz: {
      id: "quiz-12",
      phaseId: 12,
      title: "Phase 12 Assessment: System Mastery & Capstone Verification",
      passingScore: 75,
      questions: [
        {
          id: "q12-1",
          question: "What is the primary operational rule for Phase 12?",
          options: [
            "Trade blindly without checking metrics",
            "Enforce rigorous analytical confirmation and defined risk parameters",
            "Risk entire portfolio on one coin",
            "Ignore liquidity depth"
          ],
          correctIndex: 1,
          explanation: "Disciplined operators prioritize capital preservation and confluence verification before execution.",
          type: "multiple-choice"
        }
      ]
    },
    lessons: [
      {
        id: "l12-01",
        phaseId: 12,
        lessonNumber: 1,
        title: "Multi-Signal Confirmation & Confluence Scoring",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Multi-Signal Confirmation & Confluence Scoring in real-world trading environments",
          "Identify key risk factors and signals associated with Multi-Signal Confirmation & Confluence Scoring",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Multi-Signal Confirmation & Confluence Scoring",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Multi-Signal Confirmation & Confluence Scoring is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Multi-Signal Confirmation & Confluence Scoring identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Multi-Signal Confirmation & Confluence Scoring.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Multi-Signal Confirmation & Confluence Scoring?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Multi-Signal Confirmation & Confluence Scoring Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Multi-Signal Confirmation & Confluence Scoring and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l12-02",
        phaseId: 12,
        lessonNumber: 2,
        title: "Building Your Personal Memecoin Trading System",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Building Your Personal Memecoin Trading System in real-world trading environments",
          "Identify key risk factors and signals associated with Building Your Personal Memecoin Trading System",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Building Your Personal Memecoin Trading System",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Building Your Personal Memecoin Trading System is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Building Your Personal Memecoin Trading System identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Building Your Personal Memecoin Trading System.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Building Your Personal Memecoin Trading System?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Building Your Personal Memecoin Trading System Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Building Your Personal Memecoin Trading System and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l12-03",
        phaseId: 12,
        lessonNumber: 3,
        title: "Creating Automated Telegram Scrapers & Alert Filters",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Creating Automated Telegram Scrapers & Alert Filters in real-world trading environments",
          "Identify key risk factors and signals associated with Creating Automated Telegram Scrapers & Alert Filters",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Creating Automated Telegram Scrapers & Alert Filters",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Creating Automated Telegram Scrapers & Alert Filters is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Creating Automated Telegram Scrapers & Alert Filters identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Creating Automated Telegram Scrapers & Alert Filters.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Creating Automated Telegram Scrapers & Alert Filters?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Creating Automated Telegram Scrapers & Alert Filters Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Creating Automated Telegram Scrapers & Alert Filters and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l12-04",
        phaseId: 12,
        lessonNumber: 4,
        title: "Advanced Solscan API & Program Logs Inspection",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Advanced Solscan API & Program Logs Inspection in real-world trading environments",
          "Identify key risk factors and signals associated with Advanced Solscan API & Program Logs Inspection",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Advanced Solscan API & Program Logs Inspection",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Advanced Solscan API & Program Logs Inspection is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Advanced Solscan API & Program Logs Inspection identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Advanced Solscan API & Program Logs Inspection.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Advanced Solscan API & Program Logs Inspection?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Advanced Solscan API & Program Logs Inspection Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Advanced Solscan API & Program Logs Inspection and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l12-05",
        phaseId: 12,
        lessonNumber: 5,
        title: "Custom DexScreener & Birdeye Workspace Architecture",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Custom DexScreener & Birdeye Workspace Architecture in real-world trading environments",
          "Identify key risk factors and signals associated with Custom DexScreener & Birdeye Workspace Architecture",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Custom DexScreener & Birdeye Workspace Architecture",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Custom DexScreener & Birdeye Workspace Architecture is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Custom DexScreener & Birdeye Workspace Architecture identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Custom DexScreener & Birdeye Workspace Architecture.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Custom DexScreener & Birdeye Workspace Architecture?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Custom DexScreener & Birdeye Workspace Architecture Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Custom DexScreener & Birdeye Workspace Architecture and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l12-06",
        phaseId: 12,
        lessonNumber: 6,
        title: "Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs in real-world trading environments",
          "Identify key risk factors and signals associated with Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l12-07",
        phaseId: 12,
        lessonNumber: 7,
        title: "The Pre-Market Morning Audit Protocol",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master The Pre-Market Morning Audit Protocol in real-world trading environments",
          "Identify key risk factors and signals associated with The Pre-Market Morning Audit Protocol",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "The Pre-Market Morning Audit Protocol",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "The Pre-Market Morning Audit Protocol is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring The Pre-Market Morning Audit Protocol identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Pre-Market Morning Audit Protocol.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Pre-Market Morning Audit Protocol?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Pre-Market Morning Audit Protocol Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Pre-Market Morning Audit Protocol and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l12-08",
        phaseId: 12,
        lessonNumber: 8,
        title: "Backtesting Your Setups: Recording 50 Historical Trades",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Backtesting Your Setups: Recording 50 Historical Trades in real-world trading environments",
          "Identify key risk factors and signals associated with Backtesting Your Setups: Recording 50 Historical Trades",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Backtesting Your Setups: Recording 50 Historical Trades",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Backtesting Your Setups: Recording 50 Historical Trades is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Backtesting Your Setups: Recording 50 Historical Trades identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Backtesting Your Setups: Recording 50 Historical Trades.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Backtesting Your Setups: Recording 50 Historical Trades?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Backtesting Your Setups: Recording 50 Historical Trades Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Backtesting Your Setups: Recording 50 Historical Trades and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l12-09",
        phaseId: 12,
        lessonNumber: 9,
        title: "Weekly PnL & Process Review: Eliminating Bad Habits",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Weekly PnL & Process Review: Eliminating Bad Habits in real-world trading environments",
          "Identify key risk factors and signals associated with Weekly PnL & Process Review: Eliminating Bad Habits",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Weekly PnL & Process Review: Eliminating Bad Habits",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Weekly PnL & Process Review: Eliminating Bad Habits is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Weekly PnL & Process Review: Eliminating Bad Habits identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Weekly PnL & Process Review: Eliminating Bad Habits.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Weekly PnL & Process Review: Eliminating Bad Habits?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Weekly PnL & Process Review: Eliminating Bad Habits Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Weekly PnL & Process Review: Eliminating Bad Habits and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l12-10",
        phaseId: 12,
        lessonNumber: 10,
        title: "Developing Asymmetric Bet Sizing for Elite Setups",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Developing Asymmetric Bet Sizing for Elite Setups in real-world trading environments",
          "Identify key risk factors and signals associated with Developing Asymmetric Bet Sizing for Elite Setups",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Developing Asymmetric Bet Sizing for Elite Setups",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Developing Asymmetric Bet Sizing for Elite Setups is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Developing Asymmetric Bet Sizing for Elite Setups identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Developing Asymmetric Bet Sizing for Elite Setups.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Developing Asymmetric Bet Sizing for Elite Setups?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Developing Asymmetric Bet Sizing for Elite Setups Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Developing Asymmetric Bet Sizing for Elite Setups and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l12-11",
        phaseId: 12,
        lessonNumber: 11,
        title: "Transitioning from Part-Time Trencher to Full-Time Operator",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master Transitioning from Part-Time Trencher to Full-Time Operator in real-world trading environments",
          "Identify key risk factors and signals associated with Transitioning from Part-Time Trencher to Full-Time Operator",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "Transitioning from Part-Time Trencher to Full-Time Operator",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "Transitioning from Part-Time Trencher to Full-Time Operator is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring Transitioning from Part-Time Trencher to Full-Time Operator identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Transitioning from Part-Time Trencher to Full-Time Operator.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Transitioning from Part-Time Trencher to Full-Time Operator?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Transitioning from Part-Time Trencher to Full-Time Operator Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Transitioning from Part-Time Trencher to Full-Time Operator and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      },
      {
        id: "l12-12",
        phaseId: 12,
        lessonNumber: 12,
        title: "The TrenchLab Graduation: Capstone System Defense",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 min",
        objectives: [
          "Master The TrenchLab Graduation: Capstone System Defense in real-world trading environments",
          "Identify key risk factors and signals associated with The TrenchLab Graduation: Capstone System Defense",
          "Execute structured strategies while preserving capital"
        ],
        videos: [],
        keyConcepts: [
          "The TrenchLab Graduation: Capstone System Defense",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
        ],
        deepDive: [
          "The TrenchLab Graduation: Capstone System Defense is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
        ],
        realWorldExample: "An operator monitoring The TrenchLab Graduation: Capstone System Defense identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The TrenchLab Graduation: Capstone System Defense.",
          "Over-sizing positions and ignoring liquidity depth."
        ],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The TrenchLab Graduation: Capstone System Defense?",
            options: [
              "Always risk 100% of your wallet",
              "Confirm on-chain structure and manage risk strictly with defined invalidation",
              "Trade based on unverified Telegram rumors",
              "Ignore liquidity depth"
            ],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The TrenchLab Graduation: Capstone System Defense Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The TrenchLab Graduation: Capstone System Defense and document your findings.",
          deliverables: [
            "Written technical case study with Solscan/DexScreener links."
          ]
        }
      }
    ]
  }
];

// src/data/curriculumPhases3to12.ts
var PHASES_3_TO_12 = [
  ...PHASES_3_TO_6,
  ...PHASES_7_TO_12
];

// src/data/videoData.ts
var VERIFIED_VIDEOS = {
  whatIsCrypto: {
    title: "What is Cryptocurrency? (Animated Explanation for Beginners)",
    creator: "Whiteboard Crypto",
    url: "https://www.youtube.com/watch?v=rYQgy8QDEBI",
    youtubeId: "rYQgy8QDEBI",
    duration: "06:38",
    difficulty: "BEGINNER",
    whyUseful: "Explains digital decentralized ledgers, cryptography, and personal custody without technical jargon."
  },
  blockchainBasics: {
    title: "How Does a Blockchain Work - Simply Explained",
    creator: "Simply Explained",
    url: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
    youtubeId: "SSo_EIwHSd4",
    duration: "05:59",
    difficulty: "BEGINNER",
    whyUseful: "Clear visual breakdown of blocks, cryptographic hashes, distributed consensus, and transaction immutability."
  },
  coinsVsTokens: {
    title: "The Difference Between Coins and Tokens (Explained)",
    creator: "Whiteboard Crypto",
    url: "https://www.youtube.com/watch?v=t0T8t2a65-Y",
    youtubeId: "t0T8t2a65-Y",
    duration: "08:32",
    difficulty: "BEGINNER",
    whyUseful: "Explains native Layer-1 coins vs smart contract tokens and why gas fees always require native SOL."
  },
  liquidityPools: {
    title: "What is a Liquidity Pool in Crypto? (Animated)",
    creator: "Whiteboard Crypto",
    url: "https://www.youtube.com/watch?v=cCOhk_z17m4",
    youtubeId: "cCOhk_z17m4",
    duration: "11:42",
    difficulty: "BEGINNER",
    whyUseful: "Clear visual demonstration of constant product AMM mechanics, pool ratio pricing, and impermanent loss basics."
  },
  marketCap: {
    title: "What is Market Cap in Cryptocurrency? (Explained)",
    creator: "Whiteboard Crypto",
    url: "https://www.youtube.com/watch?v=g6B3g-L31_o",
    youtubeId: "g6B3g-L31_o",
    duration: "08:15",
    difficulty: "BEGINNER",
    whyUseful: "Explains circulating vs total supply, why unit bias tricks beginners, and how market cap dictates liquidity requirements."
  },
  candlesticks: {
    title: "The Ultimate Candlestick Patterns Trading Course",
    creator: "Rayner Teo",
    url: "https://www.youtube.com/watch?v=476m5_z7h8s",
    youtubeId: "476m5_z7h8s",
    duration: "38:20",
    difficulty: "BEGINNER",
    whyUseful: "Mastering open/high/low/close psychology, identifying wick rejection vs real buyer absorption on low timeframes."
  },
  supportResistance: {
    title: "Support And Resistance Trading Strategy for High Win Rates",
    creator: "Rayner Teo",
    url: "https://www.youtube.com/watch?v=P9l6sHpj92c",
    youtubeId: "P9l6sHpj92c",
    duration: "22:14",
    difficulty: "INTERMEDIATE",
    whyUseful: "How to draw dynamic and horizontal support zones, avoid false breakouts, and trade reclaims."
  },
  solanaEcosystem: {
    title: "Using Solana & Finding GEMS!! Complete Guide",
    creator: "Coin Bureau",
    url: "https://www.youtube.com/watch?v=FbCUHBhf-rU",
    youtubeId: "FbCUHBhf-rU",
    duration: "19:40",
    difficulty: "BEGINNER",
    whyUseful: "End-to-end breakdown of the high-speed Solana blockchain architecture, SPL tokens, and decentralized exchanges."
  },
  phantomWallet: {
    title: "Phantom Wallet: Beginner's Crypto GUIDE!! Step-by-Step!!",
    creator: "Coin Bureau",
    url: "https://www.youtube.com/watch?v=aUBid1zJC-U",
    youtubeId: "aUBid1zJC-U",
    duration: "14:28",
    difficulty: "BEGINNER",
    whyUseful: "Crucial self-custody fundamentals, seed phrase security, burner wallet strategies, and avoiding malicious dApp approvals."
  },
  bubblemapsAudit: {
    title: "Don't Buy Crypto Before Doing This!! How to DYOR With Bubblemaps",
    creator: "CoinGecko",
    url: "https://www.youtube.com/watch?v=SGnKaWT1lA8",
    youtubeId: "SGnKaWT1lA8",
    duration: "12:05",
    difficulty: "INTERMEDIATE",
    whyUseful: "Shows how to visually identify clustered wallets, hidden dev allocations, and cross-wallet supply hoarding."
  },
  dexscreenerMastery: {
    title: "How to Use DexScreener to Find 100x Solana Gems (Step by Step)",
    creator: "DexScreener Educational Network",
    url: "https://www.youtube.com/results?search_query=DexScreener+Solana+tutorial+guide",
    duration: "16:50",
    difficulty: "BEGINNER",
    whyUseful: "Navigating pair ages, filtering wash trading, inspecting liquidity locks, and configuring live multi-charts."
  },
  birdeyeAnalytics: {
    title: "Birdeye Tutorial: On-Chain Data, Trader Profiling & Token Flows",
    creator: "Birdeye Academy",
    url: "https://www.youtube.com/results?search_query=Birdeye+crypto+trading+tutorial+solana",
    duration: "15:10",
    difficulty: "INTERMEDIATE",
    whyUseful: "Reading unique trader metrics, net volume inflows, and tracking smart money wallets before retail rushes in."
  },
  positionSizing: {
    title: "Risk Management & Position Sizing in Trading",
    creator: "Rayner Teo",
    url: "https://www.youtube.com/watch?v=kIq8yXq0Tj4",
    youtubeId: "kIq8yXq0Tj4",
    duration: "21:03",
    difficulty: "INTERMEDIATE",
    whyUseful: "Mathematical formulas for calculating risk per trade, stop loss placement, and avoiding ruin in volatile assets."
  }
};

// src/data/curriculumData.ts
var INITIAL_PHASES = [
  // ==================== PHASE 01 ====================
  {
    id: 1,
    title: "PHASE 01 \u2014 THE FOUNDATION",
    subtitle: "Core Blockchain, Tokenomics, and Liquidity Mechanics",
    description: "Build an unshakeable bedrock understanding of crypto markets. Learn why market cap and liquidity are the only metrics that matter, and how decentralized pools actually work.",
    levelRequired: 1,
    badge: "FOUNDATION",
    practicalAssignment: {
      title: "Analyze 10 Solana Tokens",
      description: "Find 10 active tokens on Solana DEXs and compile an audit spreadsheet.",
      task: "For each token document: Market Cap, Liquidity, 24h Volume, Total Holders, Token Age, and calculate the MC/Liquidity ratio. State whether the liquidity pool is healthy or vulnerable."
    },
    quiz: {
      id: "quiz-01",
      phaseId: 1,
      title: "Phase 01 Assessment: Market Mechanics & Liquidity",
      passingScore: 75,
      questions: [
        {
          id: "q1-1",
          question: "A token has a $50,000 Market Cap and $5,000 in total Liquidity. Which statement is most accurate?",
          options: [
            "The token is extremely liquid and ready for $10,000 buys.",
            "The liquidity is fragile; even a moderate sell of $1,000 will cause massive price impact and slippage.",
            "Market cap and liquidity are identical in all automated market makers.",
            "The token cannot be sold until liquidity hits $50,000."
          ],
          correctIndex: 1,
          explanation: "Liquidity is the actual dollar reserve backing the pool. With only $5k total liquidity, selling $1,000 represents 20% of the entire pool reserves, triggering catastrophic negative slippage.",
          type: "scenario"
        },
        {
          id: "q1-2",
          question: "What is the primary difference between Market Cap and Fully Diluted Valuation (FDV)?",
          options: [
            "Market Cap is only used on CEXs, while FDV is only used on DEXs.",
            "Market Cap calculates value of circulating tokens; FDV calculates value if 100% of maximum supply were circulating.",
            "Market Cap includes staked tokens, whereas FDV ignores team allocations.",
            "FDV is always smaller than Market Cap."
          ],
          correctIndex: 1,
          explanation: "Market Cap = Current Price \xD7 Circulating Supply. FDV = Current Price \xD7 Max Total Supply. When large supplies are locked and unlocked later, high FDV creates continuous downward sell pressure.",
          type: "multiple-choice"
        },
        {
          id: "q1-3",
          question: 'Why does "unit bias" (e.g., thinking a coin at $0.000004 is "cheaper" than a coin at $2.00) ruin beginner traders?',
          options: [
            "Because coins below $0.01 have higher network gas fees.",
            "Because price per token is arbitrary; market capitalization dictates the capital required to move price.",
            "Because cheaper tokens cannot be listed on Raydium.",
            "Because tokens with many zeroes are always audited by Solana Foundation."
          ],
          correctIndex: 1,
          explanation: "A token priced at $0.000004 with 100 trillion supply already has a $400,000,000 market cap, requiring hundreds of millions of dollars to double in price. Market cap, not unit price, determines affordability and upside potential.",
          type: "scenario"
        },
        {
          id: "q1-4",
          question: "What happens when a decentralized liquidity pool (AMM) has 100% of its LP tokens burned?",
          options: [
            "The token can no longer be bought.",
            "The developer can pull the liquidity at any moment.",
            "The locked liquidity is permanently unrecoverable, meaning the pool can never be rug-pulled by removing the base SOL.",
            "All holder tokens are automatically sent to a burn address."
          ],
          correctIndex: 2,
          explanation: "Burning LP tokens sends them to an unrecoverable address (like `1111111...`), preventing the creator or anyone else from removing the underlying SOL from the automated market maker pool.",
          type: "true-false"
        }
      ]
    },
    lessons: [
      {
        id: "l1-01",
        phaseId: 1,
        lessonNumber: 1,
        title: "What Is Crypto?",
        difficulty: "BEGINNER",
        estimatedTime: "15 min",
        objectives: [
          "Understand how digital decentralized value differs from fiat banking systems",
          "Learn why censorship-resistance enables permissionless 24/7 on-chain trading",
          "Recognize why the absence of central clearing houses requires complete personal accountability"
        ],
        videos: [VERIFIED_VIDEOS.whatIsCrypto],
        keyConcepts: ["Decentralized Ledger", "Permissionless Swaps", "Self-Custodial Risk", "Cryptographic Proof"],
        deepDive: [
          "Cryptocurrency represents cryptographic ownership recorded across a globally distributed network of independent validator nodes.",
          "With this freedom comes absolute responsibility: there is no customer support desk to reverse an accidental transfer or undo a bad trade."
        ],
        realWorldExample: "When trading on a Solana DEX, your trade is validated by hundreds of validator nodes worldwide within 400 milliseconds, without any bank or custodian approving your order.",
        commonMistakes: [
          "Expecting a customer support team or bank manager to refund a mistyped address or drained wallet.",
          "Assuming stock market rules (circuit breakers, market closures, trading halts) exist on-chain."
        ],
        checkQuestions: [
          {
            question: "If you sign a malicious transaction and lose funds on-chain, who can reverse it?",
            options: ["Solana customer support", "Phantom wallet support", "Nobody; on-chain transactions are irreversible", "The DEX administrator"],
            correctIndex: 2,
            explanation: "Blockchain transactions are immutable and decentralized; no central authority exists to reverse confirmed blocks."
          }
        ],
        assignment: {
          title: "Explorer Block Verification",
          instructions: "Visit Solscan.io and inspect the latest validated block. Observe the slot number, block leader validator, and transaction throughput (TPS).",
          deliverables: ["Document the current live TPS of Solana and note 3 different transaction types executing in the block."]
        }
      },
      {
        id: "l1-02",
        phaseId: 1,
        lessonNumber: 2,
        title: "Blockchain in Plain English",
        difficulty: "BEGINNER",
        estimatedTime: "20 min",
        objectives: [
          "Deconstruct blocks, transactions, and consensus mechanics without confusing jargon",
          "Understand how Solana achieves high throughput via Proof of History (PoH) and Proof of Stake (PoS)",
          "Learn how state accounts and SPL token balances are updated in real time"
        ],
        videos: [VERIFIED_VIDEOS.blockchainBasics],
        keyConcepts: ["Proof of History", "Validator Nodes", "Account State", "Slot Time"],
        deepDive: [
          "A blockchain is an append-only digital ledger. Each block references the cryptographic hash of the prior block, ensuring historical transactions cannot be modified.",
          "This allows Solana to process 2,500+ transactions per second with an average confirmation time of 400 milliseconds, creating the fast-paced environment where memecoins trade."
        ],
        realWorldExample: "During a high-volatility token launch, thousands of buyers submit swaps simultaneously. Solana\u2019s validator leader organizes and timestamps these swaps sequentially by slot.",
        commonMistakes: [
          "Confusing consensus mechanisms (thinking Solana is slow like Bitcoin or expensive like Ethereum mainnet).",
          "Not realizing that failed transactions still pay network priority fees because computational resources were spent."
        ],
        checkQuestions: [
          {
            question: "Why can Solana settle trades in 400 milliseconds while other chains take minutes?",
            options: ["It uses a centralized database server", "Proof of History provides a cryptographic clock before consensus", "It only allows 10 traders at a time", "It skips transaction verification"],
            correctIndex: 1,
            explanation: "Proof of History allows validators to timestamp and sequence incoming transactions without waiting for global node consensus chatter."
          }
        ],
        assignment: {
          title: "Transaction Lifecycle Trace",
          instructions: "Look up a sample transaction signature on Solscan. Find the slot number, fee paid in SOL, and balance changes before and after.",
          deliverables: ["Note the fee in SOL and the compute units consumed by the swap."]
        }
      },
      {
        id: "l1-03",
        phaseId: 1,
        lessonNumber: 3,
        title: "Coins vs Tokens",
        difficulty: "BEGINNER",
        estimatedTime: "15 min",
        objectives: [
          "Distinguish native layer-1 currency (SOL) from smart contract tokens (SPL tokens)",
          "Understand Associated Token Accounts (ATA) and rent exemption on Solana",
          "Recognize why you always need native SOL in your wallet to trade any token"
        ],
        videos: [VERIFIED_VIDEOS.coinsVsTokens],
        keyConcepts: ["Native Asset (SOL)", "SPL Token Standard", "Associated Token Account (ATA)", "Rent Exemption"],
        deepDive: [
          "Native Coins: SOL is the native asset of the Solana blockchain. It pays for transaction gas, validator rewards, and storage rent.",
          "When you buy a new memecoin for the first time, your wallet creates a sub-account called an Associated Token Account (ATA), locking approximately 0.002 SOL as refundable rent."
        ],
        realWorldExample: "You have 50,000 WIF tokens in your wallet, but if your native SOL balance drops to 0.000, you cannot send or sell your WIF because you have no SOL to pay transaction fees.",
        commonMistakes: [
          "Spending 100% of your SOL balance on a memecoin trade and leaving 0 SOL for network gas to exit the position.",
          "Always keep at least 0.05 to 0.1 SOL unallocated in your trading wallet strictly for transaction fees."
        ],
        checkQuestions: [
          {
            question: "What happens if you hold $10,000 in a memecoin but have 0.000 SOL in your wallet?",
            options: ["Your wallet automatically sells some memecoins to pay gas", "You cannot execute any buy, sell, or transfer transaction", "The DEX pays your gas", "The transaction waits 24 hours"],
            correctIndex: 1,
            explanation: "Solana requires native SOL to pay validator computational fees. Without SOL, your account cannot sign transactions."
          }
        ],
        assignment: {
          title: "Token Account Audit",
          instructions: "Inspect your Phantom wallet or a public whale wallet on Solscan. Identify the native SOL balance vs SPL token sub-accounts.",
          deliverables: ["Screenshot or list 3 SPL token mint addresses held in the audited wallet."]
        }
      },
      {
        id: "l1-04",
        phaseId: 1,
        lessonNumber: 4,
        title: "Market Cap",
        difficulty: "BEGINNER",
        estimatedTime: "20 min",
        objectives: [
          "Calculate Market Capitalization accurately: Price \xD7 Circulating Supply",
          "Dismantle the dangerous illusion of low token prices (unit bias)",
          "Assess realistic upside multipliers based on total market capitalization brackets"
        ],
        videos: [VERIFIED_VIDEOS.marketCap],
        keyConcepts: ["Circulating Supply", "Market Cap Brackets", "Capital Inflow Requirements", "Unit Bias Trap"],
        deepDive: [
          "Market Cap = Current Token Price \xD7 Total Circulating Tokens.",
          "A token priced at $0.000001 with 1 trillion supply has a $1,000,000 market cap. If it doubles to $2,000,000 market cap, that requires substantial net liquidity inflow.",
          "Understanding brackets: Micro-cap ($10k - $250k: extreme volatility, high failure rate), Mid-cap ($1M - $10M: established community, sustained liquidity), High-cap ($50M+: major liquidity, lower percentage volatility)."
        ],
        realWorldExample: "A trader buys a coin at $0.0001 expecting it to reach $1.00. However, at $1.00 with 10 billion tokens, the market cap would need to be $10,000,000,000 (larger than most multinational corporations). The trade was mathematically impossible.",
        commonMistakes: [
          'Believing a token will "reach $1" without calculating what market cap that implies.',
          "Comparing price tags across tokens with completely different circulating supplies."
        ],
        checkQuestions: [
          {
            question: "Token A has 1 billion supply and trades at $0.01. Token B has 100 billion supply and trades at $0.001. Which has the higher Market Cap?",
            options: ["Token A ($10M)", "Token B ($100M)", "They are identical", "Neither has a market cap"],
            correctIndex: 1,
            explanation: "Token A = 1,000,000,000 \xD7 $0.01 = $10,000,000. Token B = 100,000,000,000 \xD7 $0.001 = $100,000,000. Token B is 10x larger despite a lower unit price."
          }
        ],
        assignment: {
          title: "Market Cap Calculation Drill",
          instructions: "Pick 5 random tokens on DexScreener. Manually multiply their token price by total supply and verify it matches the reported Market Cap.",
          deliverables: ["Show your math for all 5 tokens in your notebook."]
        }
      },
      {
        id: "l1-05",
        phaseId: 1,
        lessonNumber: 5,
        title: "FDV (Fully Diluted Valuation)",
        difficulty: "BEGINNER",
        estimatedTime: "20 min",
        objectives: [
          "Define Fully Diluted Valuation (FDV) vs Market Cap",
          "Identify predatory vesting schedules and hidden token unlocks",
          "Evaluate why memecoins prefer 100% circulating supply at launch"
        ],
        videos: [],
        keyConcepts: ["Max Supply", "Unlock Dilution", "Vesting Schedules", "Circulating Float"],
        deepDive: [
          "FDV = Current Token Price \xD7 Maximum Possible Supply.",
          "Pure memecoins on Solana generally feature 100% circulating supply at launch, meaning Market Cap = FDV. This removes future inflation risk, though creator holding concentration remains a separate threat."
        ],
        realWorldExample: "A project launches with a $5M Market Cap and a $100M FDV. Over the next 12 months, 20 million new tokens unlock monthly. Even if new buyers enter, the perpetual selling pressure prevents price appreciation.",
        commonMistakes: [
          "Ignoring FDV when trading utility-backed memecoins with team vesting pools.",
          "Assuming a low Market Cap means low supply dilution."
        ],
        checkQuestions: [
          {
            question: "If a token has a $2M Market Cap and a $40M FDV, what does this tell an on-chain trader?",
            options: ["The token is undervalued", "Only 5% of tokens are circulating; massive supply unlocks will dilute holders later", "The token has 40 million dollars in cash reserves", "It is a pure memecoin with no inflation"],
            correctIndex: 1,
            explanation: "A huge gap between MC and FDV signals that future unlocked tokens will flood the market and dilute existing holders."
          }
        ],
        assignment: {
          title: "MC vs FDV Comparison",
          instructions: "Find two tokens: one with MC = FDV (100% circulating) and one with MC < FDV. Note the difference in market dynamics.",
          deliverables: ["Summary table with token names, MC, FDV, and circulation percentage."]
        }
      },
      {
        id: "l1-06",
        phaseId: 1,
        lessonNumber: 6,
        title: "Liquidity",
        difficulty: "BEGINNER",
        estimatedTime: "25 min",
        objectives: [
          "Understand how liquidity pools function as automated counterparties",
          "Differentiate between pool depth and market capitalization",
          "Calculate and evaluate the Liquidity-to-Market-Cap ratio"
        ],
        videos: [VERIFIED_VIDEOS.liquidityPools],
        keyConcepts: ["Automated Counterparty", "Pool Depth", "MC/Liquidity Ratio", "Illiquid Traps"],
        deepDive: [
          "Liquidity is the actual reserve of trading currency (SOL or USDC) paired with the token in the smart contract pool.",
          "Market Cap is an imaginary valuation based on the last transaction price; Liquidity is the real, tangible money sitting in the vault to buy your tokens when you sell.",
          "Healthy Ratio: A sound memecoin typically maintains 15% to 30% of its Market Cap in liquidity. If a token reaches $1,000,000 MC with only $15,000 liquidity, any trader attempting to exit a $2,000 position will suffer severe price collapse."
        ],
        realWorldExample: "A token surges to $500,000 Market Cap on DexScreener. A trader holding $25,000 worth of tokens tries to sell, but the liquidity pool only contains $8,000 in SOL. The trader can only extract a fraction of their paper gains.",
        commonMistakes: [
          "Confusing paper wallet balance with extractable liquidity.",
          "Entering high dollar-size positions into tokens with paper-thin liquidity pools."
        ],
        checkQuestions: [
          {
            question: "What is a healthy Liquidity-to-Market-Cap ratio for a sustained Solana memecoin?",
            options: ["0.5% - 2%", "15% - 30%", "Over 500%", "0%"],
            correctIndex: 1,
            explanation: "A 15% - 30% ratio ensures sufficient buffer for normal trading volume without causing devastating price swings on regular sell orders."
          }
        ],
        assignment: {
          title: "Liquidity Depth Audit",
          instructions: "Find 3 tokens on DexScreener with < $20,000 liquidity and 3 tokens with > $100,000 liquidity. Compare how a simulated $500 swap affects price on both.",
          deliverables: ["Record the simulated price impact percentage for all 6 tokens."]
        }
      },
      {
        id: "l1-07",
        phaseId: 1,
        lessonNumber: 7,
        title: "Trading Volume",
        difficulty: "BEGINNER",
        estimatedTime: "20 min",
        objectives: [
          "Interpret 5m, 1h, and 24h trading volume as validation of price action",
          "Understand the Volume-to-Market-Cap velocity ratio",
          "Spot the difference between sustained organic volume and artificial spikes"
        ],
        videos: [],
        keyConcepts: ["Trading Velocity", "Volume Confirmation", "Exhaustion Volume", "Volume / MC Ratio"],
        deepDive: [
          "Volume measures the total dollar value of all swaps executed within a specific timeframe.",
          "High Volume / MC Ratio: When a $200k MC token trades $1M in volume over 24 hours, the token is experiencing rapid turnover and high speculative interest."
        ],
        realWorldExample: "A memecoin breaks out to a new high, but the 5-minute volume bar is half the size of prior consolidation bars. Smart traders recognize buyer exhaustion and avoid buying the top of the move.",
        commonMistakes: [
          "Trusting raw volume without verifying the number of unique traders (wash trading).",
          "Buying the climax volume bar after a 300% parabolic run."
        ],
        checkQuestions: [
          {
            question: "Why is a price breakout on declining volume considered dangerous?",
            options: ["Because the exchange will cancel the trades", "Because it signals that buyers are drying up and cannot absorb future sell orders", "Because declining volume always increases gas fees", "Because market cap cannot increase without volume"],
            correctIndex: 1,
            explanation: "Price moving higher on lower volume represents buyer exhaustion; when aggressive sellers enter, there are insufficient bids to support price."
          }
        ],
        assignment: {
          title: "Volume Analysis Exercise",
          instructions: "Examine the 15-minute chart of a top-trending Solana token. Identify the highest volume candle of the day and note what price did next.",
          deliverables: ["Write a 3-sentence observation on whether the peak volume marked a continuation or a local top."]
        }
      },
      {
        id: "l1-08",
        phaseId: 1,
        lessonNumber: 8,
        title: "Slippage",
        difficulty: "BEGINNER",
        estimatedTime: "15 min",
        objectives: [
          "Understand why slippage tolerance is necessary in fast on-chain execution",
          "Learn the trade-off between transaction certainty and execution price",
          "Configure slippage settings to minimize vulnerability to MEV sandwich bots"
        ],
        videos: [],
        keyConcepts: ["Slippage Tolerance", "Execution Deviation", "MEV Sandwich Bots", "Front-Running"],
        deepDive: [
          'Slippage is the difference between the price you see on your screen when clicking "Swap" and the actual price when your transaction is processed into a block by a validator.',
          "MEV Sandwich Danger: If you set slippage excessively high (e.g. 15% - 25%), predatory MEV bots detect your pending transaction, buy immediately ahead of you, let your trade push price up to your maximum slippage limit, and sell immediately after you, pocketing the difference."
        ],
        realWorldExample: "A trader sets 20% slippage on Jupiter to buy a hyped token. An automated MEV bot detects the swap in the mempool, sandwiches the trade, and the user instantly receives 18% fewer tokens than market value.",
        commonMistakes: [
          "Setting 20%+ slippage permanently on all trades as a lazy way to ensure swaps never fail.",
          "Not using MEV protection or dynamic slippage features available on Jupiter."
        ],
        checkQuestions: [
          {
            question: "What is the primary risk of setting your slippage tolerance to 25% on a large trade?",
            options: ["Your wallet will be deleted", "MEV sandwich bots will exploit the tolerance and give you the worst possible execution price", "The transaction will take 10 minutes to process", "The liquidity pool will reject your SOL"],
            correctIndex: 1,
            explanation: "Arbitrage bots look for large orders with excessive slippage tolerance and sandwich them to extract risk-free profit from the trader."
          }
        ],
        assignment: {
          title: "Slippage Simulation",
          instructions: "Open Jupiter aggregator (jup.ag). Test entering a $100 swap and compare 0.5%, 1%, and 5% slippage settings. Observe the minimum received calculation.",
          deliverables: ["Record the minimum received difference across all 3 settings."]
        }
      },
      {
        id: "l1-09",
        phaseId: 1,
        lessonNumber: 9,
        title: "Price Impact",
        difficulty: "BEGINNER",
        estimatedTime: "15 min",
        objectives: [
          "Differentiate between Slippage (market movement) and Price Impact (pool displacement)",
          "Calculate price impact based on your order size versus pool reserves",
          "Use split orders and DCA execution to trade illiquid pairs safely"
        ],
        videos: [],
        keyConcepts: ["Price Impact", "Constant Product Formula (x * y = k)", "Order Splitting", "Liquidity Depth"],
        deepDive: [
          "While slippage is caused by other market participants trading before you, Price Impact is caused by YOUR OWN order size relative to the liquidity pool.",
          "If you buy $2,000 of a token with only $10,000 liquidity, your own order will push the price up 20%+ against yourself. You pay a massive premium on the latter half of your purchase."
        ],
        realWorldExample: "A trader with $5,000 tries to buy an early token with $15,000 liquidity in one single transaction. DexScreener shows a -28% price impact warning. The trader executes anyway and instantly starts with a -28% unrealized loss.",
        commonMistakes: [
          "Ignoring the red Price Impact warning badge on DEX swap interfaces.",
          "Failing to split large entries into multiple smaller orders spread across 5 to 10 minutes."
        ],
        checkQuestions: [
          {
            question: "What causes Price Impact in an automated market maker?",
            options: ["Network congestion fees", "Your own trade size changing the token ratio inside the liquidity pool", "The token developer manually editing the price", "A slow internet connection"],
            correctIndex: 1,
            explanation: "Price impact is the mathematical consequence of your order shifting the asset reserves inside the constant-product pool."
          }
        ],
        assignment: {
          title: "Price Impact Observation",
          instructions: "Simulate a $100, $500, and $2,500 trade on a micro-cap token on Raydium or Jupiter. Note how price impact scales non-linearly.",
          deliverables: ["Create a quick comparison table of order size vs price impact percentage."]
        }
      },
      {
        id: "l1-10",
        phaseId: 1,
        lessonNumber: 10,
        title: "DEX vs CEX",
        difficulty: "BEGINNER",
        estimatedTime: "20 min",
        objectives: [
          "Contrast Decentralized Exchanges (DEX) with Centralized Exchanges (CEX)",
          "Understand order-book matching engines versus Automated Market Makers",
          "Know when a memecoin migrates from DEX trading to Tier-1 CEX listing"
        ],
        videos: [],
        keyConcepts: ["Custodial vs Non-Custodial", "Order Book vs AMM", "KYC & Access", "Listing Life Cycle"],
        deepDive: [
          "CEX (Centralized Exchange, e.g. Binance, Coinbase): You deposit funds into the exchange\u2019s custody. Trades are matched off-chain in a private matching database with an order book of limit orders.",
          "Memecoin Lifecycle: 99.9% of memecoins begin exclusively on DEXs. Only the top 0.01% with massive sustained community volume ever achieve CEX listings."
        ],
        realWorldExample: "When WIF was under $10M Market Cap, it was only tradable on Solana DEXs like Raydium. Months later, as daily volume hit hundreds of millions, Binance and Bybit listed it on their centralized order books.",
        commonMistakes: [
          "Waiting for a token to list on a CEX before learning to trade it (missing the initial on-chain move).",
          "Leaving trading capital sitting on a centralized exchange instead of managing a dedicated trading wallet."
        ],
        checkQuestions: [
          {
            question: "Where do all Solana memecoins launch and trade before any potential exchange listing?",
            options: ["On Wall Street", "On Decentralized Exchanges (DEXs) like Raydium and Pump.fun", "Directly inside Coinbase", "On the Solana Foundation homepage"],
            correctIndex: 1,
            explanation: "DEXs are permissionless; anyone can deploy a smart contract pool instantly without needing corporate approval."
          }
        ],
        assignment: {
          title: "DEX vs CEX Fee Audit",
          instructions: "Compare the fee structure of a $200 swap on a Solana DEX (network fee + 0.3% pool fee) vs buying on a centralized exchange with fiat deposit fees.",
          deliverables: ["Write a 2-paragraph comparison of execution cost and speed."]
        }
      },
      {
        id: "l1-11",
        phaseId: 1,
        lessonNumber: 11,
        title: "Wallets & Self-Custody",
        difficulty: "BEGINNER",
        estimatedTime: "25 min",
        objectives: [
          "Master the anatomy of a self-custody wallet: Public Key vs Private Key / Seed Phrase",
          "Implement a multi-wallet security architecture: Cold Storage vs Hot Trading Burner",
          "Prevent common phishing scams, drainer contracts, and malicious signatures"
        ],
        videos: [VERIFIED_VIDEOS.phantomWallet],
        keyConcepts: ["Public Address", "Private Seed Phrase", "Burner Wallet Strategy", "Signature Simulation"],
        deepDive: [
          "Public Key: Your receiving address (like an email address). Safe to share publicly.",
          "Private Key / Seed Phrase: The master cryptographic key that controls all assets. Anyone with your 12 or 24 words owns everything in that wallet. Never enter your seed phrase online, ever.",
          "The 2-Wallet Architecture: (1) Safe Vault: Stores your core net worth, staking assets, and long-term holds. Never connects to unknown dApps. (2) Trench Burner Wallet: Only holds the exact capital allocated for active day trading. If a malicious contract is signed, only the burner capital is lost."
        ],
        realWorldExample: "A trader keeps 500 SOL in a cold ledger wallet. For trading memecoins, they transfer 5 SOL into a dedicated Phantom burner wallet. If they accidentally approve a phishing link, their 500 SOL remains completely secure.",
        commonMistakes: [
          "Storing seed phrases in Apple Notes, Google Docs, Telegram saved messages, or cloud screenshots.",
          "Connecting your primary savings wallet to unverified Telegram trading bots or new DEX websites."
        ],
        checkQuestions: [
          {
            question: 'What should you do if an "official support agent" asks for your 12-word recovery seed phrase?',
            options: ["Give it to them immediately", "Block and report them immediately; legitimate projects will NEVER ask for your seed phrase", "Give them the first 6 words only", "Email it to Solana Labs"],
            correctIndex: 1,
            explanation: "Anyone asking for your seed phrase is an active scammer attempting to drain your funds."
          }
        ],
        assignment: {
          title: "Burner Wallet Setup",
          instructions: 'Create a distinct secondary wallet account in Phantom labeled "Trench Burner". Ensure it has its own private key and is segregated from your primary holdings.',
          deliverables: ["Confirm the burner wallet address and verify transaction history is isolated."]
        }
      },
      {
        id: "l1-12",
        phaseId: 1,
        lessonNumber: 12,
        title: "Solana Fundamentals for Traders",
        difficulty: "BEGINNER",
        estimatedTime: "20 min",
        objectives: [
          "Understand Solana\u2019s computational architecture: Program Derived Addresses (PDAs) and SPL Token standard",
          "Learn how priority fees and compute units determine transaction landing rate",
          "Synthesize all Phase 01 principles into a holistic market evaluation framework"
        ],
        videos: [VERIFIED_VIDEOS.solanaEcosystem],
        keyConcepts: ["Compute Budget", "Priority Fee Markets", "Transaction Landing", "Phase 01 Synthesis"],
        deepDive: [
          "Solana uses a localized fee market. When a specific token is experiencing high demand, transactions targeting that specific account must compete by offering higher priority fees (measured in micro-lamports per compute unit).",
          "Understanding this mechanics prevents dropped transactions during critical entry and exit moments.",
          "You are now equipped with the vocabulary and mechanics needed to read live charts and order flow in Phase 02."
        ],
        realWorldExample: "During a volatile sell-off, standard 0.000005 SOL priority fee transactions fail because validators prioritize blocks with higher priority bids. A trader using dynamic 0.002 SOL priority exits cleanly at their target price.",
        commonMistakes: [
          "Using default minimum gas fees during peak network volatility.",
          "Not reviewing failed transaction logs on Solscan to understand why a swap reverted."
        ],
        checkQuestions: [
          {
            question: "What is the purpose of setting a priority fee on Solana during high-volume trading?",
            options: ["To donate funds to the DEX developers", "To incentivize validators to include your transaction ahead of others in the current block", "To lower your slippage to zero", "To burn token supply"],
            correctIndex: 1,
            explanation: "Priority fees reward validators for prioritizing your transaction in block construction during network congestion."
          }
        ],
        assignment: {
          title: "Phase 01 Final Synthesis Drill",
          instructions: "Execute the Phase 01 Practical Assignment: Inspect 10 Solana tokens and document their MC, Liquidity, 24h Volume, Holder Count, and MC/Liquidity ratio.",
          deliverables: ["Submit your 10-token analysis sheet and complete the Phase 01 Quiz."]
        }
      }
    ]
  },
  // ==================== PHASE 02 ====================
  {
    id: 2,
    title: "PHASE 02 \u2014 READING THE MARKET",
    subtitle: "Price Action, Candlestick Anatomy, and Market Structure",
    description: "Stop guessing and start reading raw price action. Master candlestick wicks, multi-timeframe structures, support/resistance zones, breaks of structure (BOS), and false breakouts.",
    levelRequired: 2,
    badge: "MARKET_READER",
    practicalAssignment: {
      title: "Analyze 20 Live Charts",
      description: "Audit 20 memecoin charts on DexScreener across 5m and 15m timeframes.",
      task: "For each chart, identify: (1) Primary trend direction, (2) Most recent Break of Structure (BOS), (3) Key support and resistance zones, (4) Wick rejection zones, and (5) State whether the market is in Expansion or Consolidation."
    },
    quiz: {
      id: "quiz-02",
      phaseId: 2,
      title: "Phase 02 Assessment: Price Action & Market Structure",
      passingScore: 75,
      questions: [
        {
          id: "q2-1",
          question: "What does a long upper wick with a small candle body at key resistance indicate?",
          options: [
            "Aggressive buyer continuation and imminent breakout",
            "Strong selling pressure absorbing buyers and rejecting higher prices",
            "The chart is broken",
            "All holders have locked their tokens"
          ],
          correctIndex: 1,
          explanation: "A long upper wick shows that price was driven higher during the period, but sellers overwhelmed buyers and drove price back down before candle close.",
          type: "scenario"
        },
        {
          id: "q2-2",
          question: 'In market structure, what constitutes a valid "Break of Structure" (BOS) in an uptrend?',
          options: [
            "Any momentary wick above a previous high",
            "A candle body clearly closing above the previous swing high on the reference timeframe",
            "Volume increasing by exactly 10%",
            "The developer sending a message in Telegram"
          ],
          correctIndex: 1,
          explanation: "A true Break of Structure requires conviction, confirmed when a candle body closes beyond the previous swing high, invalidating previous resistance.",
          type: "multiple-choice"
        },
        {
          id: "q2-3",
          question: "Why is analyzing higher timeframes (e.g. 1h / 15m) essential before entering on a 1m chart?",
          options: [
            "Because 1m charts are fake",
            "Higher timeframes dictate the dominant trend and key liquidity zones; 1m price action is mostly market noise",
            "1m charts only work for Bitcoin",
            "Higher timeframes have lower gas fees"
          ],
          correctIndex: 1,
          explanation: "A 1-minute breakout inside a 1-hour downtrend is frequently just a minor pullback offering exit liquidity to higher-timeframe sellers.",
          type: "scenario"
        },
        {
          id: "q2-4",
          question: 'What is a "Failed Breakout" (Bull Trap)?',
          options: [
            "When the DEX shuts down",
            "When price pierces above resistance, traps breakout buyers, and then immediately plunges back below the level on heavy selling",
            "When a token doubles in price in 5 minutes",
            "When slippage is set to 0%"
          ],
          correctIndex: 1,
          explanation: "Bull traps occur when smart money pushes price briefly above visible resistance to trigger stop orders and attract breakout buyers, only to dump large positions into the liquidity.",
          type: "true-false"
        }
      ]
    },
    lessons: [
      {
        id: "l2-01",
        phaseId: 2,
        lessonNumber: 1,
        title: "Candlesticks Fundamentals",
        difficulty: "BEGINNER",
        estimatedTime: "20 min",
        objectives: [
          "Deconstruct candlestick anatomy: Open, High, Low, Close (OHLC)",
          "Understand green (bullish) vs red (bearish) candle mechanics",
          "Read market sentiment directly from candle proportions"
        ],
        videos: [VERIFIED_VIDEOS.candlesticks],
        keyConcepts: ["OHLC Anatomy", "Buyer vs Seller Equilibrium", "Candle Range", "Periodicity"],
        deepDive: [
          "Every candlestick represents a battle between buyers and sellers over a defined interval (e.g. 1m, 5m, 1h).",
          "The body represents the distance between Open and Close. The wicks (shadows) represent the extreme price points reached during that period before retreat."
        ],
        realWorldExample: "On a 5-minute DexScreener chart, a green candle with a large full body and no upper wick indicates persistent buying pressure from the opening second to the closing second.",
        commonMistakes: [
          "Focusing only on the color of the candle rather than the size of the body relative to the wicks.",
          "Judging a candle before it has officially closed."
        ],
        checkQuestions: [
          {
            question: "When is a candlestick pattern officially confirmed?",
            options: ["As soon as it touches a high", "Only after the timeframe period has ended and the candle closes", "Halfway through the minute", "When a whale tweets"],
            correctIndex: 1,
            explanation: "Candle patterns can change drastically in their final seconds; trading before the close is trading on incomplete data."
          }
        ],
        assignment: {
          title: "Candle Breakdown Sheet",
          instructions: "Find 5 different candle shapes on a 15m chart: Marubozu (no wicks), Hammer, Shooting Star, Doji, and High-Wave. Sketch or annotate their OHLC.",
          deliverables: ["Submit annotated images or notes of all 5 patterns."]
        }
      },
      {
        id: "l2-02",
        phaseId: 2,
        lessonNumber: 2,
        title: "Wick vs Body: Who Won the Auction?",
        difficulty: "BEGINNER",
        estimatedTime: "20 min",
        objectives: [
          "Interpret candle wicks as rejected liquidity zones",
          "Evaluate body size as proof of directional conviction",
          "Recognize absorption at key support and resistance boundaries"
        ],
        videos: [],
        keyConcepts: ["Wick Rejection", "Buyer Absorption", "Exhaustion Wicks", "Body Dominance"],
        deepDive: [
          "The body of the candle shows where the market accepted price (the close). The wicks show where the market tested price and rejected it.",
          "A long lower wick at support means sellers tried to break the level, but aggressive buyers stepped in, absorbed every sell order, and forced price back up."
        ],
        realWorldExample: "A token drops from $0.05 to $0.035. Within the same 5-minute candle, buyers push it back to $0.048. The resulting candle is a massive hammer with a 70% lower wick\u2014signaling strong demand.",
        commonMistakes: [
          "Panic selling during a wick before seeing whether buyers absorb the drop and close the candle high.",
          "Buying the top of a long upper wick."
        ],
        checkQuestions: [
          {
            question: "What does a long lower wick at a known support level indicate?",
            options: ["Sellers have complete control", "Buyers stepped in and absorbed all sell orders before the candle closed", "The contract has a freeze authority", "Volume has stopped"],
            correctIndex: 1,
            explanation: "Long lower wicks represent strong buyer absorption and price rejection at lower levels."
          }
        ],
        assignment: {
          title: "Wick Rejection Catalog",
          instructions: "Locate 3 distinct lower-wick rejection candles at support and 3 upper-wick rejection candles at resistance on live Solana pairs.",
          deliverables: ["Document price levels and outcome following the rejection candles."]
        }
      },
      {
        id: "l2-03",
        phaseId: 2,
        lessonNumber: 3,
        title: "Timeframes & Multi-Timeframe Alignment",
        difficulty: "INTERMEDIATE",
        estimatedTime: "25 min",
        objectives: [
          "Establish a multi-timeframe hierarchy: 1h (Macro Trend), 15m (Structure), 5m/1m (Execution)",
          "Avoid the noise and emotional traps of looking exclusively at the 1-minute chart",
          "Align lower-timeframe entry triggers with higher-timeframe structural bias"
        ],
        videos: [],
        keyConcepts: ["Timeframe Hierarchy", "Macro vs Micro Trend", "Execution Filtering", "Noise Elimination"],
        deepDive: [
          "Top-down analysis rule: Never take a trade on the 1m chart that directly opposes the structure of the 15m chart.",
          "The 1-minute chart is filled with algorithmic bot noise and minor liquidity sweeps. The 15m and 1h charts show true institutional and whale footprint."
        ],
        realWorldExample: 'A 1m chart shows a "double bottom" and appears ready to explode. But the 1h chart shows price is in a severe markdown cycle below key resistance. The 1m breakout instantly fails.',
        commonMistakes: [
          "Staring exclusively at the 1m chart and getting whipped out of positions by minor wicks.",
          "Ignoring the 1h trend when deciding whether to hold a runner."
        ],
        checkQuestions: [
          {
            question: "Which timeframe provides the most reliable market structure for a Solana day trade?",
            options: ["10-second chart", "1-minute chart", "15-minute chart aligned with 1-hour trend", "The yearly chart"],
            correctIndex: 2,
            explanation: "The 15m timeframe balances speed with structural clarity, filtering out the random noise of 1m ticks."
          }
        ],
        assignment: {
          title: "Multi-Timeframe Audit",
          instructions: "Open a token on DexScreener. Screenshot the 1h, 15m, and 1m charts side by side. Determine whether all 3 timeframes are aligned in the same direction.",
          deliverables: ["State your structural bias (Bullish / Bearish / Neutral) with rationale."]
        }
      },
      {
        id: "l2-04",
        phaseId: 2,
        lessonNumber: 4,
        title: "Support, Resistance & Supply Zones",
        difficulty: "BEGINNER",
        estimatedTime: "25 min",
        objectives: [
          "Draw horizontal support and resistance as dynamic zones rather than razor-thin lines",
          "Understand the psychology behind support: trapped buyers, unfulfilled limit orders, and value consensus",
          "Learn the Role Reversal Principle: Old Resistance Becomes New Support (Flip)"
        ],
        videos: [VERIFIED_VIDEOS.supportResistance],
        keyConcepts: ["Support & Resistance Zones", "Role Reversal (S/R Flip)", "Liquidity Pools", "Touch Validation"],
        deepDive: [
          "Support is a price region where demand is strong enough to halt or reverse price depreciation.",
          "Resistance is a price ceiling where supply overwhelms incoming bids.",
          "The more times a level is touched, the weaker it often becomes in fast memecoin markets because resting limit orders get consumed."
        ],
        realWorldExample: "A token struggles to break $0.10, hitting it four times and falling. On the fifth attempt, heavy volume pushes price to $0.12. When price pulls back to $0.10, former resistance flips into support and bounces hard.",
        commonMistakes: [
          "Drawing 30 different lines on a chart until the chart becomes unreadable.",
          "Treating levels as exact numbers rather than price ranges (zones)."
        ],
        checkQuestions: [
          {
            question: "What happens when price decisively breaks above a proven resistance level on high volume?",
            options: ["The token is immediately delisted", "The old resistance level frequently flips into new support on subsequent pullbacks", "Price must fall to zero immediately", "Slippage increases to 100%"],
            correctIndex: 1,
            explanation: "The S/R Flip principle is one of the most reliable technical setups in trading: former resistance becomes new support."
          }
        ],
        assignment: {
          title: "S/R Mapping Exercise",
          instructions: "Map 3 key horizontal zones on a 15m chart of a top-50 Solana token. Mark at least one confirmed S/R flip.",
          deliverables: ["Submit chart screenshot showing the drawn zones and flip point."]
        }
      },
      {
        id: "l2-05",
        phaseId: 2,
        lessonNumber: 5,
        title: "Market Structure: Trend, Higher Highs & Higher Lows",
        difficulty: "INTERMEDIATE",
        estimatedTime: "25 min",
        objectives: [
          "Identify bullish market structure: Higher Highs (HH) and Higher Lows (HL)",
          "Identify bearish market structure: Lower Highs (LH) and Lower Lows (LL)",
          "Spot the early warning signs of trend exhaustion"
        ],
        videos: [],
        keyConcepts: ["Higher Highs (HH)", "Higher Lows (HL)", "Lower Highs (LH)", "Lower Lows (LL)", "Trend Definition"],
        deepDive: [
          "An uptrend is defined simply as a continuous sequence of Higher Highs and Higher Lows.",
          "As long as price produces Higher Lows, the structural trend remains intact. A trend is NOT invalidated by a red candle\u2014it is only invalidated when a prior swing low is broken."
        ],
        realWorldExample: "A token pulls back 25% from its high. Inexperienced traders panic sell. A structural trader notices the pullback formed a Higher Low above the previous swing low, confirming the uptrend is still healthy.",
        commonMistakes: [
          "Calling a trend reversal on a single 1-minute red candle.",
          "Buying tokens that are in confirmed downtrends of Lower Highs and Lower Lows hoping for a random bounce."
        ],
        checkQuestions: [
          {
            question: "When is a bullish market structure officially intact?",
            options: ["Whenever price goes up 10%", "As long as price continues creating Higher Highs and Higher Lows", "When the developer conducts an AMA", "Only when volume is 100% buys"],
            correctIndex: 1,
            explanation: "A bullish trend is structurally verified by the formation of consecutive Higher Highs and Higher Lows."
          }
        ],
        assignment: {
          title: "Structure Annotation Drill",
          instructions: "Annotate a 15m chart identifying 3 Higher Highs, 3 Higher Lows, and point out the key swing low that protects the uptrend.",
          deliverables: ["Marked chart with HH and HL tags labeled clearly."]
        }
      },
      {
        id: "l2-06",
        phaseId: 2,
        lessonNumber: 6,
        title: "Break of Structure (BOS) & Change of Character (CHoCH)",
        difficulty: "INTERMEDIATE",
        estimatedTime: "25 min",
        objectives: [
          "Differentiate between minor internal breaks and major swing Break of Structure (BOS)",
          "Identify Change of Character (CHoCH) as the earliest structural warning of trend shifts",
          "Avoid entering prematurely before structural candle close confirmation"
        ],
        videos: [],
        keyConcepts: ["Break of Structure (BOS)", "Change of Character (CHoCH)", "Swing Points", "Structural Invalidation"],
        deepDive: [
          "BOS (Break of Structure): A continuation event where price breaks beyond a previous swing point in the direction of the dominant trend.",
          "CHoCH (Change of Character): The first structural shift where price breaks the most recent Higher Low in an uptrend (or Lower High in a downtrend), signaling that market control has flipped."
        ],
        realWorldExample: "A memecoin has made 5 higher lows. At $0.08, price suddenly closes below the previous $0.082 swing low. This is a CHoCH: the uptrend has lost structural integrity and smart money exits.",
        commonMistakes: [
          "Confusing a wick liquidity sweep with a true body close Break of Structure.",
          "Holding onto losing positions after a confirmed CHoCH to the downside."
        ],
        checkQuestions: [
          {
            question: "What is the primary significance of a Change of Character (CHoCH) in an uptrend?",
            options: ["It means you should double your position size", "It is the first technical signal that buyers failed to protect the recent swing low, warning of an impending trend reversal", "It means the liquidity pool was burned", "It is an automated buy signal"],
            correctIndex: 1,
            explanation: "CHoCH signals a structural shift where the market transitions from bullish higher-low progression to potential distribution or markdown."
          }
        ],
        assignment: {
          title: "CHoCH Identification",
          instructions: "Find a chart on DexScreener that recently reversed from uptrend to downtrend. Pinpoint the exact candle where CHoCH occurred.",
          deliverables: ["Record the timestamp, price level, and post-CHoCH drawdown."]
        }
      },
      {
        id: "l2-07",
        phaseId: 2,
        lessonNumber: 7,
        title: "Reclaims & Liquidity Sweeps",
        difficulty: "ADVANCED",
        estimatedTime: "30 min",
        objectives: [
          "Understand how smart money engineers liquidity sweeps below visible support",
          'Identify a valid "Reclaim" setup for high-probability, low-risk entries',
          "Define the exact stop loss placement below the sweep wick"
        ],
        videos: [],
        keyConcepts: ["Liquidity Sweep", "False Breakdown", "Reclaim Validation", "Stop Hunting"],
        deepDive: [
          "Retail traders place their stop losses just below obvious horizontal support levels. Whales and market makers know this.",
          "A Liquidity Sweep occurs when price deliberately pierces below support to trigger those retail stop-loss market sells. Smart money absorbs those cheap sell orders, and then price snaps right back above support.",
          "The Reclaim Entry: When price closes back ABOVE the broken support level, enter long with an invalidation stop loss just below the sweep wick."
        ],
        realWorldExample: "Support is at $1.00. Price flashes down to $0.94 for 3 minutes, wiping out retail stops, then closes the 5m candle at $1.02. A reclaim is confirmed. Price rallies 40% from the reclaimed level.",
        commonMistakes: [
          "Selling in panic at the exact moment support is pierced (selling into the sweep).",
          "Not waiting for the candle close to confirm the reclaim before entering."
        ],
        checkQuestions: [
          {
            question: "Why do reclaim setups offer exceptional risk-to-reward ratios?",
            options: ["Because you can use 100x leverage", "Because your invalidation is clearly defined just below the sweep wick, providing a tight stop with massive upside potential", "Because the token developer guarantees it", "Because slippage is zero"],
            correctIndex: 1,
            explanation: "Reclaims give you an objective structural invalidation: if price breaks back below the sweep wick, the trade setup is immediately dead."
          }
        ],
        assignment: {
          title: "Reclaim Study",
          instructions: "Locate 2 successful reclaim setups and 1 failed reclaim setup on a 5m chart. Document the entry price, invalidation price, and eventual outcome.",
          deliverables: ["Summary writeup with risk/reward calculation."]
        }
      },
      {
        id: "l2-08",
        phaseId: 2,
        lessonNumber: 8,
        title: "Consolidation, Range Bounds & Volatility Contraction",
        difficulty: "INTERMEDIATE",
        estimatedTime: "20 min",
        objectives: [
          "Identify trading ranges: Range High (RH), Range Low (RL), and Equilibrium (EQ)",
          "Understand Volatility Contraction: why tight ranges precede violent expansions",
          "Avoid getting chopped up inside the middle of a consolidation range"
        ],
        videos: [],
        keyConcepts: ["Range Trading", "Equilibrium (EQ)", "Volatility Compression", "Chop Zone Avoidance"],
        deepDive: [
          "Markets spend 70% of their time consolidating in ranges and only 30% trending.",
          "Inside a range, trading the middle (EQ) is financial suicide. Smart traders either trade the range extremes (buy at Range Low, sell at Range High) or wait for a confirmed breakout of the entire range."
        ],
        realWorldExample: "A token trades between $0.020 and $0.025 for 18 hours. Volatility compresses to narrow Doji candles. Suddenly, volume doubles, price breaks $0.025, and expands rapidly to $0.040.",
        commonMistakes: [
          "Taking aggressive breakout entries in the exact middle of a range.",
          "Failing to recognize that low volatility is the precursor to massive volatility."
        ],
        checkQuestions: [
          {
            question: "Where is the worst place to open a new position during a range-bound market?",
            options: ["At Range Low support", "At Range High resistance", "Directly in the middle of the range (Equilibrium) where probability is 50/50 chop", "After a confirmed range breakout"],
            correctIndex: 2,
            explanation: "The middle of a range offers poor risk/reward and is subject to random two-sided chop."
          }
        ],
        assignment: {
          title: "Range Box Identification",
          instructions: "Draw a range box around a consolidating token on DexScreener. Identify Range High, Range Low, and EQ.",
          deliverables: ["Annotated range chart with clear bounds."]
        }
      },
      {
        id: "l2-09",
        phaseId: 2,
        lessonNumber: 9,
        title: "Breakouts vs Failed Breakouts (Bull Traps)",
        difficulty: "ADVANCED",
        estimatedTime: "30 min",
        objectives: [
          "Define the strict criteria for a validated breakout: Close + Volume + Retest",
          "Detect the anatomy of a Bull Trap before you get trapped at the top",
          "Implement the Retest Entry strategy to eliminate false breakout risk"
        ],
        videos: [],
        keyConcepts: ["Breakout Validation", "Retest Entry", "Bull Trap Anatomy", "Volume Confirmation"],
        deepDive: [
          "Criteria for a real breakout: (1) Full candle body closes outside the resistance zone, (2) Relative volume is at least 2x the 20-period moving average, (3) Pullback retests former resistance as support without falling back inside.",
          "If a candle pierces resistance but closes with a long upper wick, it is NOT a breakout\u2014it is a failed test and an invitation to get dumped on."
        ],
        realWorldExample: "Token hits resistance at $0.05. A green candle shoots to $0.058. FOMO buyers jump in at $0.056. By minute 4, the candle retraces all the way to $0.048, leaving a giant upper wick. Breakout buyers are trapped underwater.",
        commonMistakes: [
          "Buying the very top of the breakout candle while it is still forming.",
          "Not having an automatic invalidation plan if price closes back inside the prior range."
        ],
        checkQuestions: [
          {
            question: "What is the safest entry technique when trading a high-conviction breakout?",
            options: ["Market buy before the resistance is reached", "Wait for the candle to close above resistance and enter on a successful retest of the broken level", "Use 100% of your capital at the wick high", "Buy only when gas fees are high"],
            correctIndex: 1,
            explanation: "The retest entry confirms that old resistance has converted into new support, dramatically reducing false breakout risk."
          }
        ],
        assignment: {
          title: "Breakout vs Fakeout Audit",
          instructions: "Find 2 real breakouts that sustained trend continuation, and 2 fakeouts that trapped buyers. Note the volume differences.",
          deliverables: ["4-chart comparison writeup highlighting volume and wick behavior."]
        }
      },
      {
        id: "l2-10",
        phaseId: 2,
        lessonNumber: 10,
        title: "Fibonacci Retracements & The Golden Pocket (0.618 - 0.65)",
        difficulty: "INTERMEDIATE",
        estimatedTime: "18 min",
        objectives: [
          "Plot anchor swings accurately from true impulse low to impulse high",
          "Identify confluence between the 0.618 golden pocket and prior horizontal market structure",
          "Avoid drawing Fib levels across messy consolidation or low-volume wicks"
        ],
        videos: [],
        keyConcepts: ["Impulse Wave", "Golden Pocket (0.618 - 0.65)", "Anchor Points", "Structural Confluence"],
        deepDive: [
          "The Fibonacci retracement tool measures the depth of a counter-trend pullback relative to the preceding aggressive impulse wave.",
          'In high-beta crypto and memecoins, the 0.618 to 0.65 zone acts as the institutional "discount zone" where smart money re-accumulates after retail sells out in panic.',
          "Crucially, never trade a Fibonacci level in isolation. A Fib level is purely mathematical; it only gains real auction weight when it aligns with an old resistance-turned-support level or high-volume node."
        ],
        realWorldExample: "A new token surges from $0.01 to $0.10, then corrects sharply to $0.044. Traders who bought the top panic-sell. The 0.618 retracement sits at $0.0444, perfectly aligning with the previous 15-minute resistance shelf. Buyers step in aggressively and the price rebounds 120%.",
        commonMistakes: [
          "Drawing Fibonacci across microscopic 1-minute noise instead of clean market structure swings.",
          "Assuming every Fib level will automatically hold without waiting for candlestick confirmation."
        ],
        checkQuestions: [
          {
            question: "Why is the 0.618 to 0.65 Fibonacci zone referred to as the Golden Pocket?",
            options: [
              "Because it is guaranteed to produce a 100x return",
              "Because it represents the mathematically optimal deep retracement where risk-to-reward for trend continuation is highest",
              "Because it only works on Bitcoin and Ethereum",
              "Because token developers cannot sell at that level"
            ],
            correctIndex: 1,
            explanation: "The golden pocket offers an optimal balance: the pullback is deep enough to offer high R:R, but shallow enough that the prevailing trend structure remains intact."
          }
        ],
        assignment: {
          title: "Golden Pocket Chart Mapping",
          instructions: "Identify 3 successful golden pocket bounces on Solana charts, marking anchor high, anchor low, and the confluence zone.",
          deliverables: ["Screenshots of 3 charted setups with entry invalidation levels."]
        }
      },
      {
        id: "l2-11",
        phaseId: 2,
        lessonNumber: 11,
        title: "Trendlines vs Horizontal Levels: Dynamic Support Traps",
        difficulty: "INTERMEDIATE",
        estimatedTime: "16 min",
        objectives: [
          "Differentiate between objective horizontal price levels and subjective trendlines",
          "Understand why diagonal trendlines are easily manipulated by liquidity hunters",
          "Combine horizontal order blocks with dynamic trendline breaks for high-probability entries"
        ],
        videos: [],
        keyConcepts: ["Horizontal S/R", "Diagonal Trendlines", "Dynamic Traps", "Subjectivity Bias"],
        deepDive: [
          "Horizontal levels are objective price points where specific quantities of liquidity, limit orders, and stop losses exist in the historical order book.",
          "Diagonal trendlines, by contrast, depend entirely on how individual traders draw their angles, which scale they use (log vs linear), and which wick tips they connect. This subjectivity makes dynamic lines vulnerable to liquidity sweeps.",
          "Professional on-chain operators treat diagonal trendlines as sentiment indicators rather than hard execution triggers. When a crowd-favorite trendline snaps, it triggers stop cascades directly into real horizontal liquidity pools."
        ],
        realWorldExample: "Retail traders draw an ascending trendline on a hyped memecoin and place tight stops right below it. A smart money wallet market sells 50 SOL, slicing through the trendline by 5%, triggering retail stops into their waiting limit bids at horizontal support.",
        commonMistakes: [
          "Relying solely on diagonal trendlines while ignoring clean horizontal support floors.",
          "Redrawing trendline angles after price breaks them to justify staying in a losing trade."
        ],
        checkQuestions: [
          {
            question: "Why are horizontal support levels generally more reliable than diagonal trendlines?",
            options: [
              "Horizontal levels represent fixed price points where resting limit orders and historical volume accumulated, whereas diagonals are highly subjective.",
              "Horizontal levels are enforced by blockchain smart contracts.",
              "Diagonal lines only work on CEXs.",
              "Trading bots cannot see horizontal levels."
            ],
            correctIndex: 0,
            explanation: "Horizontal levels reflect exact price coordinates where buyers and sellers transacted, unlike diagonals which vary based on chart scaling."
          }
        ],
        assignment: {
          title: "Trendline Trap Case Study",
          instructions: "Document an instance where an ascending trendline broke, but price immediately recovered after hitting horizontal support.",
          deliverables: ["1-page breakdown comparing the trendline breakdown vs horizontal reclaim."]
        }
      },
      {
        id: "l2-12",
        phaseId: 2,
        lessonNumber: 12,
        title: "Multi-Timeframe Chart Confluence: From Macro Bias to Low-Timeframe Execution",
        difficulty: "ADVANCED",
        estimatedTime: "22 min",
        objectives: [
          "Establish higher timeframe (1H/4H) directional bias before zooming in",
          "Use the 5M/15M charts to identify structural zones and liquidity pools",
          "Refine entry timing and invalidation on the 1M chart without getting chopped up"
        ],
        videos: [],
        keyConcepts: ["Top-Down Analysis", "HTF Bias", "LTF Execution", "Noise Filtering", "Confluence"],
        deepDive: [
          "Trading solely on the 1-minute chart is the fastest way for beginner traders to lose capital. The 1M chart is dominated by high-frequency bots, snipers, and random liquidity ripples.",
          "A professional top-down framework starts at the 1-Hour or 4-Hour timeframe to establish the dominant auction trend: is the asset accumulating, distributing, or trending?",
          "Once the macro zone is reached, drop down to the 15-minute chart to identify key swing points. Finally, utilize the 1-minute or 5-minute chart solely for precise execution, ensuring tight invalidation against swing lows."
        ],
        realWorldExample: "A trader spots a 1-minute bullish engulfing candle on a memecoin and buys, only to get crushed minutes later. If they had checked the 1-hour chart, they would have seen the price was testing a massive multi-day resistance level that had rejected price four times.",
        commonMistakes: [
          "Entering trades based on 1-minute patterns that directly oppose the 1-hour structural trend.",
          "Suffering analysis paralysis by trying to monitor ten different timeframes simultaneously."
        ],
        checkQuestions: [
          {
            question: "What is the primary objective of top-down multi-timeframe analysis?",
            options: [
              "To find a timeframe that makes every trade look profitable",
              "To ensure low-timeframe execution aligns with high-timeframe structural momentum and key liquidity zones",
              "To trade 50 times per hour across different tabs",
              "To calculate gas fees on different hours of the day"
            ],
            correctIndex: 1,
            explanation: "High-timeframe structure dictates the path of least resistance; low-timeframe charts are strictly for entry precision and stop-loss placement."
          }
        ],
        assignment: {
          title: "Multi-Timeframe Execution Journal",
          instructions: "Perform top-down analysis on 2 Solana tokens: capture 1H context, 15M structure, and 1M entry trigger.",
          deliverables: ["Detailed confluence report for both assets with annotated charts."]
        }
      }
    ]
  }
];
var CURRICULUM_DATA = [...INITIAL_PHASES, ...PHASES_3_TO_12];
var TOTAL_CURRICULUM_LESSONS = CURRICULUM_DATA.reduce(
  (acc, phase) => acc + phase.lessons.length,
  0
);
var TOTAL_CURRICULUM_PHASES = CURRICULUM_DATA.length;
function getLessonById(lessonId) {
  for (const phase of CURRICULUM_DATA) {
    const lesson = phase.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      return { phase, lesson };
    }
  }
  return void 0;
}

// src/lib/searchProfiles.ts
var GLOBAL_NEGATIVE_KEYWORDS = [
  "100x guaranteed",
  "get rich quick",
  "turn $10 into $10,000",
  "turn 10 into 10000",
  "secret strategy",
  "guaranteed profit",
  "guaranteed profits",
  "no loss",
  "free signals",
  "buy now",
  "100% win rate",
  "passive income guaranteed",
  "live trading",
  "telegram signals",
  "pump and dump",
  "moonshot call",
  "next shiba",
  "next doge",
  "easy money",
  "millionaire overnight",
  "copy trade signal"
];
var EDUCATIONAL_CHANNELS_ALLOWLIST = [
  "Coin Bureau",
  "Whiteboard Crypto",
  "Finematics",
  "Rayner Teo",
  "CoinGecko",
  "Solana",
  "Jupiter Exchange",
  "DexScreener Educational Network",
  "Birdeye Academy",
  "Crypto Zombie",
  "Bankless",
  "The Defiant",
  "Trader Dante",
  "Benjamin Cowen",
  "TechnicalRoundup",
  "Investopedia"
];
function cleanLessonTitle(title) {
  return title.replace(/^[0-9]+[:.\s-]+/, "").replace(/\([^)]*\)/g, "").trim();
}
function generateSearchQueries(lesson, phaseTitle) {
  const cleanTitle = cleanLessonTitle(lesson.title);
  const lowerTitle = cleanTitle.toLowerCase();
  const primaryConcept = lesson.keyConcepts && lesson.keyConcepts.length > 0 ? lesson.keyConcepts[0].replace(/\([^)]*\)/g, "").trim() : cleanTitle;
  const queries = [];
  if (lesson.phaseId === 1) {
    if (lowerTitle.includes("what is crypto")) {
      queries.push("what is cryptocurrency explained for beginners", "cryptocurrency basics explained simply", "how crypto works beginner tutorial");
    } else if (lowerTitle.includes("blockchain")) {
      queries.push("blockchain explained simply whiteboard crypto", "how does a blockchain work visually", "blockchain technology fundamentals");
    } else if (lowerTitle.includes("coins vs tokens") || lowerTitle.includes("coin vs token")) {
      queries.push("coins vs tokens crypto explained whiteboard", "difference between coin and token crypto", "layer 1 coin vs spl token");
    } else if (lowerTitle.includes("market cap") && !lowerTitle.includes("fdv")) {
      queries.push("crypto market cap explained whiteboard crypto", "what is market cap in cryptocurrency", "market cap vs token price crypto");
    } else if (lowerTitle.includes("fdv") || lowerTitle.includes("fully diluted")) {
      queries.push("fully diluted valuation crypto explained", "FDV vs market cap crypto", "token fully diluted valuation explained");
    } else if (lowerTitle.includes("liquidity") && !lowerTitle.includes("pool")) {
      queries.push("crypto liquidity explained", "token liquidity explained", "memecoin liquidity explained");
    } else if (lowerTitle.includes("trading volume") || lowerTitle.includes("volume basics")) {
      queries.push("crypto trading volume explained for beginners", "understanding 24h volume in crypto", "trading volume vs liquidity crypto");
    } else if (lowerTitle.includes("slippage")) {
      queries.push("what is slippage in crypto trading explained", "slippage tolerance dex trading tutorial", "how slippage works uniswap raydium");
    } else if (lowerTitle.includes("price impact")) {
      queries.push("price impact explained crypto dex trading", "price impact vs slippage raydium jupiter", "amm constant product price impact formula");
    } else if (lowerTitle.includes("dex vs cex")) {
      queries.push("decentralized exchange vs centralized exchange explained", "dex vs cex differences crypto", "self custody dex vs binance coinbase");
    } else if (lowerTitle.includes("custodial") || lowerTitle.includes("wallet basics")) {
      queries.push("custodial vs non custodial crypto wallet explained", "self custody crypto wallet security tutorial", "private keys and seed phrases explained");
    } else if (lowerTitle.includes("solana fundamentals") || lowerTitle.includes("solana ecosystem")) {
      queries.push("solana blockchain architecture explained coin bureau", "how solana works proof of history", "solana ecosystem guide for beginners");
    }
  } else if (lesson.phaseId === 2) {
    if (lowerTitle.includes("candlestick") && !lowerTitle.includes("wick") && !lowerTitle.includes("anatomy")) {
      queries.push("crypto candlestick charts explained", "how to read candlestick charts crypto", "candlestick patterns trading beginners");
    } else if (lowerTitle.includes("anatomy") || lowerTitle.includes("ohlc")) {
      queries.push("candlestick anatomy open high low close explained", "reading candlestick bodies and ranges", "how to read japanese candlesticks crypto");
    } else if (lowerTitle.includes("wick") || lowerTitle.includes("auction")) {
      queries.push("reading candlestick wicks price action tutorial", "candlestick wick rejection explained", "who won the auction candlestick trading");
    } else if (lowerTitle.includes("support") && lowerTitle.includes("resistance")) {
      queries.push("support and resistance trading strategy rayner teo", "how to draw support and resistance crypto charts", "supply and demand zones crypto trading");
    } else if (lowerTitle.includes("market structure") && !lowerTitle.includes("shift")) {
      queries.push("market structure trading higher highs higher lows", "crypto market structure explained", "how to identify market trend structure");
    } else if (lowerTitle.includes("break of structure") || lowerTitle.includes("bos") || lowerTitle.includes("choch")) {
      queries.push("break of structure bos change of character choch explained", "bos vs choch smart money concepts", "market structure shift confirmation tutorial");
    } else if (lowerTitle.includes("sweep") || lowerTitle.includes("liquidity grab")) {
      queries.push("liquidity sweep trading strategy price action", "stop hunt liquidity grab crypto explained", "identifying key highs lows liquidity sweeps");
    } else if (lowerTitle.includes("reclaim")) {
      queries.push("support reclaim trading strategy crypto", "failed breakdown reclaim price action setup", "level reclaim confirmation entry");
    } else if (lowerTitle.includes("trendline")) {
      queries.push("trendlines vs horizontal levels rayner teo", "how to draw trendlines properly crypto", "dynamic support and resistance trap");
    } else if (lowerTitle.includes("order block") || lowerTitle.includes("fair value")) {
      queries.push("order blocks crypto trading smart money concepts", "fair value gap fvg explained trading", "institutional order blocks tutorial");
    } else if (lowerTitle.includes("macro bias") || lowerTitle.includes("capstone") || lesson.id === "l2-12") {
      queries.push("macro bias to low timeframe execution crypto confluence", "top down trading macro to micro execution", "multi timeframe execution price action");
    } else if (lowerTitle.includes("timeframe")) {
      queries.push("multi timeframe analysis crypto trading alignment", "top down chart analysis daily 4h 15m", "timeframe confluence price action");
    }
  } else if (lesson.phaseId === 3) {
    if (lowerTitle.includes("phantom")) {
      queries.push("phantom wallet setup tutorial solana coin bureau", "phantom wallet security tips burner account", "how to use phantom wallet solana");
    } else if (lowerTitle.includes("jupiter")) {
      queries.push("jupiter exchange tutorial solana aggregator", "how to use jupiter dex aggregator solana", "jupiter routing slippage settings guide");
    } else if (lowerTitle.includes("raydium") && lowerTitle.includes("clmm")) {
      queries.push("raydium clmm concentrated liquidity tutorial", "clmm vs cpmm pools raydium solana", "how concentrated liquidity works solana");
    } else if (lowerTitle.includes("raydium")) {
      queries.push("raydium solana dex tutorial liquidity pool", "how raydium amm works solana", "swapping and pools on raydium guide");
    } else if (lowerTitle.includes("pump.fun") || lowerTitle.includes("bonding curve")) {
      queries.push("bonding curve crypto explained pump fun", "how pump fun works step by step", "pump fun bonding curve migration raydium");
    } else if (lowerTitle.includes("solscan")) {
      queries.push("solscan blockchain explorer tutorial solana", "how to read transactions on solscan", "solscan token account tracking guide");
    } else if (lesson.id === "l3-05" || lowerTitle.includes("priority fees & jito tip")) {
      queries.push("solana priority fees and jito tips explained", "how to set priority fees solana phantom", "solana priority fees vs tip bundles");
    } else if (lesson.id === "l3-13" || lowerTitle.includes("mev & sandwich")) {
      queries.push("solana mev sandwich attacks and protection guide", "how to protect against sandwich bots solana", "solana mev private transactions jito");
    } else if (lowerTitle.includes("priority fee") || lowerTitle.includes("compute budget")) {
      queries.push("solana priority fees and compute units tutorial", "how to speed up solana transactions priority fees", "setting custom priority fee phantom jupiter");
    } else if (lowerTitle.includes("rugcheck") || lowerTitle.includes("security tool")) {
      queries.push("how to use rugcheck xyz solana safety audit", "checking solana token risk rugcheck", "detecting malicious token contracts solana");
    } else if (lowerTitle.includes("rpc")) {
      queries.push("what is an rpc node solana trading", "private rpc vs public rpc speed solana", "helius quicknode solana rpc setup");
    } else if (lowerTitle.includes("telegram bot") || lowerTitle.includes("photon") || lowerTitle.includes("bullx")) {
      queries.push("solana telegram trading bots tutorial trojan bonkbot", "how to trade with solana telegram bot safely", "telegram bot settings auto slippage gas");
    }
  } else if (lesson.phaseId === 4) {
    if (lowerTitle.includes("interface") || lowerTitle.includes("overview")) {
      queries.push("DexScreener tutorial", "how to use DexScreener", "DexScreener crypto analysis tutorial");
    } else if (lowerTitle.includes("new pairs")) {
      queries.push("dexscreener new pairs filter strategy", "how to find new solana tokens on dexscreener", "filtering fresh liquidity pools dexscreener");
    } else if (lowerTitle.includes("trending")) {
      queries.push("dexscreener trending tokens algorithm explained", "identifying real trend vs paid boost dexscreener", "dexscreener trending page strategy");
    } else if (lowerTitle.includes("multi-chart") || lowerTitle.includes("multichart")) {
      queries.push("dexscreener multichart setup tutorial", "monitoring multiple tokens simultaneously dexscreener", "dexscreener workspace layout guide");
    } else if (lowerTitle.includes("top traders") || lowerTitle.includes("buyer")) {
      queries.push("dexscreener top traders tab analysis", "how to analyze buyer vs seller bubble charts dexscreener", "finding profitable wallets on dexscreener");
    } else if (lowerTitle.includes("alert") || lowerTitle.includes("watchlist")) {
      queries.push("setting up dexscreener price alerts telegram", "dexscreener watchlist organization tutorial", "crypto real time price alerts setup");
    } else if (lowerTitle.includes("filter") || lowerTitle.includes("preset")) {
      queries.push("best dexscreener filters for memecoin trading", "dexscreener custom filter preset tutorial", "how to filter out rug pulls on dexscreener");
    }
  } else if (lesson.phaseId === 5) {
    if (lesson.id === "l5-01" || lowerTitle.includes("overview & statistical edge")) {
      queries.push("birdeye crypto platform overview statistical edge", "how to use birdeye so for token research", "birdeye analytics platform walkthrough");
    } else if (lesson.id === "l5-04" || lowerTitle.includes("token overview & security scores")) {
      queries.push("birdeye token overview and security scores tutorial", "checking token authorities and holders on birdeye", "birdeye security tab audit");
    } else if (lesson.id === "l5-09" || lowerTitle.includes("api & real-time")) {
      queries.push("birdeye api and real time websocket data feeds", "using birdeye developer data for trading bots", "real time crypto price feeds on chain");
    } else if (lowerTitle.includes("unique trader") || lowerTitle.includes("raw volume")) {
      queries.push("unique traders vs volume crypto analysis birdeye", "detecting wash trading with unique trader count", "birdeye unique buyers metric explained");
    } else if (lowerTitle.includes("leaderboard") || lowerTitle.includes("win-rate")) {
      queries.push("birdeye trader leaderboards finding high win rate wallets", "how to track profitable traders on birdeye", "birdeye top wallet tracking tutorial");
    } else if (lowerTitle.includes("gem wallet") || lowerTitle.includes("early buyer")) {
      queries.push("identifying early gem wallets on birdeye solana", "tracking smart money early entries birdeye", "finding profitable crypto wallet addresses");
    } else if (lowerTitle.includes("historical") || lowerTitle.includes("price data")) {
      queries.push("analyzing historical on chain token data birdeye", "using birdeye pro charting features", "on chain volume history and holder growth");
    } else if (lowerTitle.includes("volume spike") || lowerTitle.includes("unusual")) {
      queries.push("detecting unusual volume spikes crypto on chain", "birdeye volume spike alerts and momentum", "identifying early accumulation volume");
    } else if (lowerTitle.includes("pnl") || lowerTitle.includes("distribution")) {
      queries.push("token holder pnl distribution analysis birdeye", "analyzing realize vs unrealized profits token holders", "how holder cost basis impacts sell pressure");
    }
  } else if (lesson.phaseId === 6) {
    if (lowerTitle.includes("mint authority")) {
      queries.push("solana mint authority explained rug pull risk", "how to check if mint authority is disabled solana", "mint authority revoked verification solscan");
    } else if (lowerTitle.includes("freeze authority")) {
      queries.push("solana freeze authority explained token blacklist", "can dev freeze your tokens solana", "checking freeze authority on rugcheck");
    } else if (lowerTitle.includes("bubblemaps")) {
      queries.push("bubblemaps tutorial crypto wallet cluster coingecko", "how to use bubblemaps to spot rugs", "bubblemaps insider wallet detection");
    } else if (lowerTitle.includes("top 10") || lowerTitle.includes("holder concentration")) {
      queries.push("token holder concentration analysis solana", "checking top 10 holders percentage rugcheck", "cabals and distributed supply crypto");
    } else if (lowerTitle.includes("liquidity pool burn") || lowerTitle.includes("lp burn") || lowerTitle.includes("lock")) {
      queries.push("how to check if liquidity pool is burned solana", "lp lock vs lp burn explained crypto", "rug pull check lp tokens destroyed");
    } else if (lowerTitle.includes("honeypot") || lowerTitle.includes("blacklist")) {
      queries.push("how to detect honeypot token on solana", "honeypot detector crypto tutorial", "tokens you cannot sell explained");
    } else if (lowerTitle.includes("bundled buy") || lowerTitle.includes("bundle sniper")) {
      queries.push("bundled buys on solana launch explained", "how devs bundle sniper buy their own tokens", "spotting block 0 bundle purchases solana");
    }
  } else if (lesson.phaseId === 7) {
    if (lesson.id === "l7-01" || lowerTitle.includes("reading raw wallets")) {
      queries.push("how to audit raw crypto wallet pnl and trades", "solscan wallet transaction audit guide", "reading raw wallet history solana");
    } else if (lesson.id === "l7-02" || lowerTitle.includes("spl token transfer histories")) {
      queries.push("solscan deep dive deciphering spl token transfers", "how to read token transfers on solscan", "solana wallet token balance history");
    } else if (lesson.id === "l7-03" || lowerTitle.includes("vs dev cabal")) {
      queries.push("identifying smart money wallets vs dev cabal wallets", "how to spot insider wallets solana", "filtering real traders from insider ring wallets");
    } else if (lesson.id === "l7-12" || lowerTitle.includes("daily smart money flow routine")) {
      queries.push("daily smart money tracking routine crypto trader", "morning wallet tracking workflow on chain", "systematic wallet tracking routine");
    } else if (lowerTitle.includes("pnl audit") || lowerTitle.includes("win rate")) {
      queries.push("auditing crypto wallet pnl and trading history", "how to calculate wallet win rate and roi", "wallet tracker pnl verification tutorial");
    } else if (lowerTitle.includes("whale") || lowerTitle.includes("large holder")) {
      queries.push("tracking crypto whales solana blockchain", "whale wallet movements impact on token price", "how to set whale transaction alerts");
    } else if (lowerTitle.includes("copy trade") || lowerTitle.includes("copy trading")) {
      queries.push("copy trading memecoins risks and slippage reality", "why copy trading wallets loses money slippage frontrun", "how to copy trade smart money correctly");
    } else if (lowerTitle.includes("cluster") || lowerTitle.includes("funding")) {
      queries.push("tracking wallet funding sources exchange withdrawals", "clustering connected wallets blockchain forensics", "how to find the funding wallet solscan");
    }
  } else if (lesson.phaseId === 8) {
    if (lowerTitle.includes("raw volume vs") || lowerTitle.includes("acceleration")) {
      queries.push("volume acceleration vs raw volume crypto trading", "how to measure volume velocity in breakouts", "volume momentum indicators crypto");
    } else if (lowerTitle.includes("organic") || lowerTitle.includes("wash trading")) {
      queries.push("how to spot wash trading crypto volume", "organic community volume vs bot volume", "detecting fake volume on dexscreener");
    } else if (lowerTitle.includes("volume-to-market-cap") || lowerTitle.includes("v/mc")) {
      queries.push("volume to market cap ratio crypto trading benchmarks", "what does high volume market cap ratio mean", "v mc ratio liquidity health token");
    } else if (lowerTitle.includes("buy/sell") || lowerTitle.includes("order flow")) {
      queries.push("buy vs sell ratio order flow analysis crypto", "reading delta and aggressive market orders", "buyer exhaustion vs absorption price action");
    } else if (lowerTitle.includes("volume profile") || lowerTitle.includes("poc")) {
      queries.push("volume profile trading tutorial point of control", "how to use volume profile in crypto trading", "high volume node vs low volume node");
    }
  } else if (lesson.phaseId === 9) {
    if (lowerTitle.includes("pullback") || lowerTitle.includes("retest")) {
      queries.push("pullback and retest entry strategy crypto trading", "how to enter on key level retest price action", "buying the dip vs catching a falling knife");
    } else if (lowerTitle.includes("breakout confirmation")) {
      queries.push("breakout confirmation trading strategy crypto", "avoiding false breakouts volume confirmation entry", "how to trade breakouts with low risk");
    } else if (lowerTitle.includes("scale in") || lowerTitle.includes("dca")) {
      queries.push("scaling into trades position building strategy", "how to scale into a crypto position properly", "laddering buy limit orders risk management");
    } else if (lowerTitle.includes("invalidation")) {
      queries.push("trade invalidation level technical analysis", "how to define stop loss and invalidation point", "knowing when your trade thesis is wrong");
    } else if (lowerTitle.includes("risk to reward") || lowerTitle.includes("r:r")) {
      queries.push("risk to reward ratio trading tutorial rayner teo", "how to calculate 1 to 3 risk reward ratio", "why risk reward matters more than win rate");
    }
  } else if (lesson.phaseId === 10) {
    if (lowerTitle.includes("survival") || lowerTitle.includes("capital preservation")) {
      queries.push("capital preservation the golden rule of trading", "risk of ruin in trading explained mathematically", "why surviving is winning in crypto trading");
    } else if (lowerTitle.includes("position sizing") || lowerTitle.includes("calculator")) {
      queries.push("position sizing risk management trading tutorial rayner teo", "how to calculate position size trading", "fixed fractional position sizing crypto");
    } else if (lowerTitle.includes("1-2%") || lowerTitle.includes("maximum risk")) {
      queries.push("the 1 percent risk rule trading account management", "how much to risk per trade crypto", "calculating stop loss dollar risk");
    } else if (lowerTitle.includes("drawdown")) {
      queries.push("how to recover from trading drawdowns psychology", "managing account drawdown and equity curves", "drawdown recovery math percentage needed");
    } else if (lowerTitle.includes("daily loss limit") || lowerTitle.includes("circuit breaker")) {
      queries.push("daily loss limit rule for day traders", "setting personal trading circuit breakers", "how to stop revenge trading after a red day");
    }
  } else if (lesson.phaseId === 11) {
    if (lowerTitle.includes("tiered profit") || lowerTitle.includes("tp1")) {
      queries.push("tiered profit taking strategy tp1 tp2 tp3", "how to take profits crypto trading strategy", "scaling out of winning crypto trades");
    } else if (lowerTitle.includes("free roll") || lowerTitle.includes("initial capital")) {
      queries.push("taking initials out crypto trading strategy", "de risking to free roll winning tokens", "when to take your initial investment out crypto");
    } else if (lowerTitle.includes("trailing stop")) {
      queries.push("how to use trailing stop loss crypto trading", "trailing stops with market structure swing lows", "locking in profits without getting wicked out");
    } else if (lowerTitle.includes("fomo") || lowerTitle.includes("psychology") || lowerTitle.includes("revenge")) {
      queries.push("trading psychology how to stop fomo and revenge trading", "mastering trading psychology Mark Douglas", "emotional discipline in volatile crypto markets");
    }
  } else if (lesson.phaseId === 12) {
    if (lowerTitle.includes("confluence") || lowerTitle.includes("multi-signal")) {
      queries.push("confluence in trading strategy tutorial", "multi signal confirmation price action volume", "building a high probability confluence trading model");
    } else if (lesson.id === "l12-02" || lowerTitle.includes("personal memecoin trading system")) {
      queries.push("building your personal memecoin trading system playbook", "rules based crypto trading system development", "how to build a trading strategy memecoins");
    } else if (lesson.id === "l12-12" || lowerTitle.includes("graduation") || lowerTitle.includes("capstone")) {
      queries.push("complete crypto trading system checklist capstone defense", "full trade execution review checklist", "institutional on chain operator trading plan");
    } else if (lowerTitle.includes("system") || lowerTitle.includes("playbook")) {
      queries.push("building a systematic trading plan crypto", "how to create a personal trading playbook rules", "rules based trading strategy development");
    } else if (lowerTitle.includes("checklist") || lowerTitle.includes("pre-trade")) {
      queries.push("pre trade checklist for crypto traders", "trade execution routine and confirmation checklist", "disciplined trading routine before clicking buy");
    } else if (lowerTitle.includes("journal") || lowerTitle.includes("review")) {
      queries.push("how to keep a trading journal for crypto", "reviewing your trades to improve win rate and pnl", "tracking trading mistakes and edge metrics");
    }
  }
  if (queries.length === 0) {
    queries.push(
      `${cleanTitle} crypto explained tutorial`,
      `${primaryConcept} ${cleanTitle} trading guide`,
      `how to trade ${cleanTitle} in on-chain crypto`
    );
  }
  return queries;
}
function generateSearchProfile(lesson, phaseTitle) {
  const cleanTitle = cleanLessonTitle(lesson.title);
  const primaryConcept = lesson.keyConcepts && lesson.keyConcepts.length > 0 ? lesson.keyConcepts[0] : cleanTitle;
  const learningObjective = lesson.objectives && lesson.objectives.length > 0 ? lesson.objectives[0] : `Master ${cleanTitle} in on-chain trading`;
  const queries = generateSearchQueries(lesson, phaseTitle);
  const primaryQuery = queries[0];
  const secondaryQueries = queries.slice(1);
  const lowerTitle = cleanTitle.toLowerCase();
  let preferredVideoLength = "MEDIUM";
  if (lowerTitle.includes("fundamentals") || lowerTitle.includes("course") || lowerTitle.includes("candlestick")) {
    preferredVideoLength = "LONG";
  } else if (lowerTitle.includes("quick") || lowerTitle.includes("setup") || lowerTitle.includes("wallet")) {
    preferredVideoLength = "MEDIUM";
  }
  return {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    lessonDescription: lesson.deepDive && lesson.deepDive.length > 0 ? lesson.deepDive[0] : lesson.title,
    phaseId: lesson.phaseId,
    phaseTitle,
    topic: primaryConcept,
    difficulty: lesson.difficulty,
    learningObjective,
    primarySearchQuery: primaryQuery,
    secondarySearchQueries: secondaryQueries,
    negativeKeywords: GLOBAL_NEGATIVE_KEYWORDS,
    preferredVideoLength,
    preferredContentType: "educational_tutorial"
  };
}

// src/lib/videoScoring.ts
function parseYouTubeDuration(isoDuration) {
  if (!isoDuration) return { seconds: 0, formatted: "00:00" };
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return { seconds: 0, formatted: "00:00" };
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  let formatted = "";
  if (hours > 0) {
    formatted = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else {
    formatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  return { seconds: totalSeconds, formatted };
}
function scoreVideoCandidate(video, profile) {
  const lowerTitle = video.title.toLowerCase();
  const lowerDesc = (video.description || "").toLowerCase();
  const lowerChannel = video.channelTitle.toLowerCase();
  const combinedText = `${lowerTitle} ${lowerDesc}`;
  for (const neg of GLOBAL_NEGATIVE_KEYWORDS) {
    if (combinedText.includes(neg)) {
      return {
        ...video,
        relevanceScore: 0,
        qualityScore: 0,
        isEligible: false,
        rejectReason: `Contains clickbait/promotional flag: "${neg}"`,
        whyUseful: "Rejected due to promotional/unrealistic hype keywords."
      };
    }
  }
  if (video.embeddable === false) {
    return {
      ...video,
      relevanceScore: 0,
      qualityScore: 0,
      isEligible: false,
      rejectReason: "Video is marked as not embeddable by YouTube creator",
      whyUseful: "Rejected: cannot be embedded in course player."
    };
  }
  let relevanceScore = 40;
  let qualityScore = 50;
  const titleWords = profile.lessonTitle.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter((w) => w.length > 3 && !["what", "with", "from", "your", "this", "that", "into"].includes(w));
  let matchedTitleWords = 0;
  for (const word of titleWords) {
    if (lowerTitle.includes(word)) matchedTitleWords++;
  }
  const titleMatchRatio = titleWords.length > 0 ? matchedTitleWords / titleWords.length : 0;
  relevanceScore += Math.round(titleMatchRatio * 35);
  if (lowerTitle.includes(profile.topic.toLowerCase())) {
    relevanceScore += 15;
  }
  const objectiveWords = profile.learningObjective.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
  let matchedObjWords = 0;
  for (const word of objectiveWords) {
    if (combinedText.includes(word)) matchedObjWords++;
  }
  if (matchedObjWords >= 2) {
    relevanceScore += 10;
  }
  const educationalKeywords = ["tutorial", "explained", "guide", "breakdown", "course", "walkthrough", "basics", "strategy", "analysis", "mastery", "how to"];
  for (const edu of educationalKeywords) {
    if (lowerTitle.includes(edu)) {
      qualityScore += 6;
      break;
    }
  }
  const isTrustedChannel = EDUCATIONAL_CHANNELS_ALLOWLIST.some(
    (ch) => lowerChannel.includes(ch.toLowerCase())
  );
  if (isTrustedChannel) {
    qualityScore += 20;
    relevanceScore += 5;
  }
  const durationSec = video.durationSeconds || 0;
  if (durationSec > 0) {
    if (durationSec < 120) {
      qualityScore -= 30;
      relevanceScore -= 20;
    } else if (durationSec >= 480 && durationSec <= 2100) {
      qualityScore += 12;
    } else if (durationSec > 5400) {
      qualityScore -= 15;
    }
  }
  const isFastEvolving = [3, 4, 5, 6, 7].includes(profile.phaseId);
  if (isFastEvolving && video.publishedAt) {
    const pubYear = new Date(video.publishedAt).getFullYear();
    const currentYear = 2025;
    if (pubYear >= currentYear - 2) {
      qualityScore += 10;
    } else if (pubYear < 2023) {
      qualityScore -= 15;
    }
  }
  relevanceScore = Math.max(0, Math.min(100, relevanceScore));
  qualityScore = Math.max(0, Math.min(100, qualityScore));
  const isEligible = relevanceScore >= 45 && qualityScore >= 40;
  const whyUseful = `Covers ${profile.topic} with focus on ${profile.learningObjective.slice(0, 70)}... Recommended for ${profile.difficulty.toLowerCase()} operators.`;
  return {
    ...video,
    relevanceScore,
    qualityScore,
    isEligible,
    rejectReason: isEligible ? void 0 : "Relevance or educational quality score below threshold",
    whyUseful
  };
}

// src/server/youtubeService.ts
function extractYouTubeVideoId(value) {
  const input = value.trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  try {
    const url = new URL(input);
    const id = url.hostname.includes("youtu.be") ? url.pathname.split("/").filter(Boolean)[0] : url.searchParams.get("v") || (url.pathname.match(/\/(?:embed|shorts)\/([A-Za-z0-9_-]{11})/) || [])[1];
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    const match = input.match(/(?:v=|\/)([A-Za-z0-9_-]{11})(?:[?&/]|$)/);
    return match?.[1] || null;
  }
}
function getYouTubeApiKey() {
  const key = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY || "AIzaSyCjAE7fgfB4SygRUWypB_kA_lNT6o8XkGc";
  if (!key || key.trim() === "" || key === "MY_YOUTUBE_API_KEY") return null;
  return key.trim();
}
async function validateYouTubeVideo(videoId, profile) {
  const apiKey = getYouTubeApiKey();
  if (!apiKey) return { success: false, apiKeyConfigured: false, error: "YOUTUBE_API_NOT_CONFIGURED" };
  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/videos");
    url.searchParams.set("part", "snippet,contentDetails,status");
    url.searchParams.set("id", videoId);
    url.searchParams.set("key", apiKey);
    const response = await fetch(url);
    if (!response.ok) {
      const body = await response.text();
      const quota = response.status === 403 && /quota|rateLimitExceeded/i.test(body);
      return { success: false, apiKeyConfigured: true, error: quota ? "YOUTUBE_API_QUOTA_REACHED" : `YOUTUBE_API_ERROR_${response.status}` };
    }
    const item = (await response.json()).items?.[0];
    if (!item) return { success: false, apiKeyConfigured: true, error: "VIDEO_NOT_FOUND" };
    if (item.status?.privacyStatus !== "public") return { success: false, apiKeyConfigured: true, error: "VIDEO_UNAVAILABLE" };
    if (item.status?.embeddable !== true) return { success: false, apiKeyConfigured: true, error: "VIDEO_NOT_EMBEDDABLE" };
    const duration = parseYouTubeDuration(item.contentDetails?.duration);
    const candidate = {
      id: item.id,
      title: item.snippet?.title || "",
      description: item.snippet?.description || "",
      channelTitle: item.snippet?.channelTitle || "",
      publishedAt: item.snippet?.publishedAt || "",
      thumbnailUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`,
      embeddable: true,
      durationSeconds: duration.seconds,
      durationFormatted: duration.formatted
    };
    const fallbackProfile = { lessonId: "manual", lessonTitle: candidate.title, lessonDescription: "", phaseId: 0, phaseTitle: "", topic: candidate.title, difficulty: "BEGINNER", learningObjective: "", primarySearchQuery: "", secondarySearchQueries: [], negativeKeywords: [], preferredVideoLength: "MEDIUM", preferredContentType: "educational" };
    const video = scoreVideoCandidate(candidate, profile || fallbackProfile);
    return video.isEligible ? { success: true, apiKeyConfigured: true, video } : { success: false, apiKeyConfigured: true, error: "VIDEO_REJECTED" };
  } catch (error) {
    console.error("[YOUTUBE] validation failed", { videoId, error: error instanceof Error ? error.message : String(error) });
    return { success: false, apiKeyConfigured: true, error: "YOUTUBE_NETWORK_ERROR" };
  }
}
var youtubeResponseCache = /* @__PURE__ */ new Map();
async function executeYouTubeQuery(query, profile, apiKey, maxResults) {
  try {
    const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
    searchUrl.searchParams.set("part", "snippet");
    searchUrl.searchParams.set("q", query);
    searchUrl.searchParams.set("type", "video");
    searchUrl.searchParams.set("videoEmbeddable", "true");
    searchUrl.searchParams.set("relevanceLanguage", "en");
    searchUrl.searchParams.set("maxResults", String(Math.min(maxResults, 10)));
    searchUrl.searchParams.set("key", apiKey);
    const searchRes = await fetch(searchUrl.toString());
    if (!searchRes.ok) {
      const errText = await searchRes.text();
      const isQuota = searchRes.status === 403 && (errText.includes("quota") || errText.includes("rateLimitExceeded"));
      return {
        videos: [],
        rawCount: 0,
        quotaExceeded: isQuota,
        error: isQuota ? "YouTube Data API daily quota limit reached." : `YouTube API error (${searchRes.status}): ${errText.slice(0, 150)}`
      };
    }
    const searchData = await searchRes.json();
    const items = searchData.items || [];
    if (items.length === 0) {
      return { videos: [], rawCount: 0, quotaExceeded: false };
    }
    const videoIds = items.map((it) => it.id?.videoId).filter(Boolean);
    let detailedVideosMap = {};
    if (videoIds.length > 0) {
      const detailsUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
      detailsUrl.searchParams.set("part", "contentDetails,status");
      detailsUrl.searchParams.set("id", videoIds.join(","));
      detailsUrl.searchParams.set("key", apiKey);
      try {
        const detRes = await fetch(detailsUrl.toString());
        if (detRes.ok) {
          const detData = await detRes.json();
          for (const item of detData.items || []) {
            detailedVideosMap[item.id] = {
              durationIso: item.contentDetails?.duration,
              embeddable: item.status?.embeddable !== false
            };
          }
        }
      } catch (detErr) {
        console.warn("Could not fetch video details, proceeding with basic snippet data", detErr);
      }
    }
    const scoredVideos = [];
    for (const item of items) {
      const vidId = item.id?.videoId;
      if (!vidId) continue;
      const details = detailedVideosMap[vidId] || {};
      const { seconds, formatted } = parseYouTubeDuration(details.durationIso);
      const candidate = {
        id: vidId,
        title: item.snippet?.title || "",
        description: item.snippet?.description || "",
        channelTitle: item.snippet?.channelTitle || "Unknown Channel",
        publishedAt: item.snippet?.publishedAt || "",
        thumbnailUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`,
        durationSeconds: seconds,
        durationFormatted: formatted,
        embeddable: details.embeddable !== false
      };
      const scored = scoreVideoCandidate(candidate, profile);
      if (scored.relevanceScore >= 50 && scored.isEligible) {
        scoredVideos.push(scored);
      }
    }
    scoredVideos.sort((a, b) => b.relevanceScore + b.qualityScore - (a.relevanceScore + a.qualityScore));
    return {
      videos: scoredVideos,
      rawCount: items.length,
      quotaExceeded: false
    };
  } catch (err) {
    return {
      videos: [],
      rawCount: 0,
      quotaExceeded: false,
      error: err instanceof Error ? err.message : String(err)
    };
  }
}
async function searchYouTubeForLesson(lessonOrProfile, maxResults = 5) {
  const apiKey = getYouTubeApiKey();
  if (!apiKey) {
    return {
      success: false,
      apiKeyConfigured: false,
      videos: [],
      error: "YOUTUBE_API_KEY is not configured in server environment (.env). Configure an API key from Google Cloud Console to enable live discovery."
    };
  }
  const profile = "primarySearchQuery" in lessonOrProfile ? lessonOrProfile : generateSearchProfile(lessonOrProfile, `Phase ${lessonOrProfile.phaseId}`);
  const lessonId = profile.lessonId;
  const lessonTitle = profile.lessonTitle;
  const queriesToTry = [
    profile.primarySearchQuery,
    ...profile.secondarySearchQueries || []
  ].filter(Boolean);
  let accumulatedVideos = [];
  const seenVideoIds = /* @__PURE__ */ new Set();
  for (const query of queriesToTry) {
    const cacheKey = `youtube:${lessonId}:${query}`;
    let queryVideos = [];
    let rawResultCount = 0;
    if (youtubeResponseCache.has(cacheKey)) {
      queryVideos = youtubeResponseCache.get(cacheKey);
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
    console.log("=== YOUTUBE DISCOVERY LOG ===");
    console.log("LESSON:", lessonId);
    console.log("TITLE:", lessonTitle);
    console.log("QUERY:", query);
    console.log("RESULTS:", rawResultCount);
    if (queryVideos.length > 0) {
      console.log("TOP CANDIDATE:", queryVideos[0].title);
      console.log("VIDEO ID:", queryVideos[0].id);
      console.log("SCORE:", queryVideos[0].relevanceScore);
    } else {
      console.log("TOP CANDIDATE: None (relevance below threshold or zero results)");
    }
    console.log("=============================");
    for (const v of queryVideos) {
      if (!seenVideoIds.has(v.id)) {
        seenVideoIds.add(v.id);
        accumulatedVideos.push(v);
      }
    }
    if (accumulatedVideos.length >= 2) {
      break;
    }
  }
  accumulatedVideos.sort((a, b) => b.relevanceScore + b.qualityScore - (a.relevanceScore + a.qualityScore));
  return {
    success: true,
    apiKeyConfigured: true,
    videos: accumulatedVideos.slice(0, maxResults)
  };
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
        resourcesCache.set(res.id, res);
      }
    } catch (e) {
      console.error("Failed reading storedResources.json, seeding defaults", e);
    }
  }
  if (resourcesCache.size === 0) {
    for (const seed of INITIAL_SEEDED_RESOURCES) {
      const id = `res-${seed.lessonId}-${seed.providerVideoId}`;
      const now2 = (/* @__PURE__ */ new Date()).toISOString();
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
        publishedAt: seed.publishedAt || now2,
        relevanceScore: seed.relevanceScore || 90,
        qualityScore: seed.qualityScore || 90,
        resourceType: seed.resourceType || "EXTERNAL_YOUTUBE",
        status: seed.status || "APPROVED",
        isPrimary: seed.isPrimary ?? true,
        searchQuery: seed.searchQuery || "",
        whyUseful: seed.whyUseful,
        createdAt: now2,
        updatedAt: now2
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
  getSummary(allLessonIds2) {
    initStoreIfNeeded();
    const totalLessons = allLessonIds2.length;
    let approvedResourcesCount = 0;
    let needsReviewCount = 0;
    let withoutResourcesCount = 0;
    const lessonStatusMap = {};
    for (const lessonId of allLessonIds2) {
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

// api-src/discovery/[action].ts
var now = () => (/* @__PURE__ */ new Date()).toISOString();
var allLessonIds = () => CURRICULUM_DATA.flatMap((phase) => phase.lessons.map((lesson) => lesson.id));
function getDb() {
  try {
    return firebaseAdmin().db;
  } catch {
    return null;
  }
}
async function listResources() {
  const db = getDb();
  if (db) {
    try {
      const snapshot = await db.collection("lesson_resources").get();
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn("[DISCOVERY] Firestore read failed, falling back to ResourceStore:", err);
    }
  }
  const fallback = ResourceStore.getAll();
  if (db && fallback.length > 0) {
    saveResources(fallback).catch((err) => console.warn("[DISCOVERY] Auto-seeding Firestore failed:", err));
  }
  return fallback;
}
async function saveResources(items) {
  const db = getDb();
  if (db) {
    try {
      const batch = db.batch();
      items.forEach((item) => batch.set(db.collection("lesson_resources").doc(item.id), item));
      await batch.commit();
      return;
    } catch (err) {
      console.warn("[DISCOVERY] Firestore write failed, falling back to ResourceStore:", err);
    }
  }
  items.forEach((item) => ResourceStore.saveResource(item));
}
function resourceFromVideo(lessonId, video, query, existing) {
  const createdAt = existing?.createdAt || now();
  return {
    id: `res-${lessonId}-${video.id}`,
    lessonId,
    provider: "youtube",
    providerVideoId: video.id,
    title: video.title,
    description: video.description || "",
    channelName: video.channelTitle,
    thumbnailUrl: video.thumbnailUrl,
    youtubeUrl: `https://www.youtube.com/watch?v=${video.id}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
    durationSeconds: video.durationSeconds,
    durationFormatted: video.durationFormatted,
    publishedAt: video.publishedAt,
    relevanceScore: video.relevanceScore,
    qualityScore: video.qualityScore,
    resourceType: "EXTERNAL_YOUTUBE",
    status: existing?.status || "DISCOVERED",
    isPrimary: existing?.isPrimary || false,
    searchQuery: query,
    whyUseful: video.whyUseful,
    validationStatus: existing?.validationStatus || "candidate",
    createdAt,
    updatedAt: now()
  };
}
async function getStatus() {
  const data = await listResources();
  const ids = allLessonIds();
  const summary = ids.reduce((acc, lessonId) => {
    const lessonResources = data.filter((r) => r.lessonId === lessonId);
    if (lessonResources.some((r) => r.status === "APPROVED")) acc.approvedResourcesCount++;
    else if (lessonResources.length) acc.needsReviewCount++;
    else acc.withoutResourcesCount++;
    return acc;
  }, { totalLessons: ids.length, approvedResourcesCount: 0, needsReviewCount: 0, withoutResourcesCount: 0 });
  const apiKey = (process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY || "AIzaSyCjAE7fgfB4SygRUWypB_kA_lNT6o8XkGc").trim();
  return {
    success: true,
    apiKeyConfigured: Boolean(apiKey && apiKey !== "" && apiKey !== "MY_YOUTUBE_API_KEY"),
    totalLessons: ids.length,
    summary
  };
}
function getAction(req) {
  if (req.query?.action) {
    return Array.isArray(req.query.action) ? req.query.action[0] : req.query.action;
  }
  const urlPath = (req.url || "").split("?")[0];
  const segments = urlPath.split("/").filter(Boolean);
  return segments[segments.length - 1] || "";
}
async function handler(req, res) {
  try {
    const action = getAction(req);
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (req.method === "GET" && action === "status") {
      return sendJson(res, 200, await getStatus());
    }
    if (req.method === "GET" && action === "resources") {
      return sendJson(res, 200, { success: true, resources: await listResources() });
    }
    if (req.method !== "POST") {
      return sendJson(res, 405, { success: false, error: "METHOD_NOT_ALLOWED", message: "Use the documented request method." });
    }
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    if (action === "manual-validate") {
      const videoId = extractYouTubeVideoId(String(body.youtubeUrl || body.videoId || ""));
      if (!videoId) return sendJson(res, 400, { success: false, error: "INVALID_YOUTUBE_URL", message: "Enter a valid YouTube URL or video ID." });
      const validation = await validateYouTubeVideo(videoId);
      if (!validation.success || !validation.video) {
        const httpStatus = validation.error === "YOUTUBE_API_NOT_CONFIGURED" ? 503 : 422;
        return sendJson(res, httpStatus, { success: false, error: validation.error || "VIDEO_REJECTED", message: "The video could not be validated." });
      }
      return sendJson(res, 200, { success: true, video: validation.video });
    }
    if (action === "manual-add") {
      const lesson = getLessonById(body.lessonId);
      const videoId = extractYouTubeVideoId(String(body.youtubeUrl || ""));
      if (!lesson || !videoId) return sendJson(res, 400, { success: false, error: "INVALID_REQUEST", message: "A valid lesson and YouTube URL are required." });
      const validation = await validateYouTubeVideo(videoId, generateSearchProfile(lesson.lesson, lesson.phase.title));
      if (!validation.success || !validation.video) return sendJson(res, 422, { success: false, error: validation.error || "VIDEO_REJECTED", message: "The video could not be validated." });
      const resource = resourceFromVideo(lesson.lesson.id, validation.video, "manual addition");
      resource.status = "APPROVED";
      resource.isPrimary = true;
      resource.validationStatus = "approved";
      resource.validatedAt = now();
      resource.whyUseful = String(body.whyUseful || validation.video.whyUseful || "");
      const existing = await listResources();
      const updated = existing.filter((r) => r.lessonId === lesson.lesson.id && r.id !== resource.id).map((r) => ({ ...r, isPrimary: false, updatedAt: now() }));
      await saveResources([...updated, resource]);
      return sendJson(res, 200, { success: true, resource });
    }
    if (action === "discover-single") {
      const lesson = getLessonById(body.lessonId);
      if (!lesson) return sendJson(res, 404, { success: false, error: "LESSON_NOT_FOUND", message: "Lesson not found." });
      const profile = generateSearchProfile(lesson.lesson, lesson.phase.title);
      const result = await searchYouTubeForLesson(profile, Math.min(Number(body.maxResults) || 4, 5));
      if (!result.success) {
        return sendJson(res, result.quotaExceeded ? 429 : 503, { success: false, error: result.quotaExceeded ? "YOUTUBE_API_QUOTA_REACHED" : result.error || "YOUTUBE_API_ERROR", message: result.error || "Discovery failed." });
      }
      const existing = await listResources();
      const discovered = result.videos.map((video) => resourceFromVideo(lesson.lesson.id, video, profile.primarySearchQuery, existing.find((item) => item.id === `res-${lesson.lesson.id}-${video.id}`)));
      await saveResources(discovered);
      return sendJson(res, 200, { success: true, videosFound: discovered.length, resources: discovered });
    }
    if (action === "discover-batch") {
      const existing = await listResources();
      const pending = allLessonIds().filter((id) => !existing.some((r) => r.lessonId === id && r.status === "APPROVED")).slice(0, 3);
      const results = {};
      for (const lessonId of pending) {
        const lesson = getLessonById(lessonId);
        const profile = generateSearchProfile(lesson.lesson, lesson.phase.title);
        const result = await searchYouTubeForLesson(profile, 3);
        if (!result.success) {
          results[lessonId] = { success: false, error: result.error };
          if (result.quotaExceeded) break;
          continue;
        }
        const discovered = result.videos.map((video) => resourceFromVideo(lessonId, video, profile.primarySearchQuery, existing.find((item) => item.id === `res-${lessonId}-${video.id}`)));
        await saveResources(discovered);
        results[lessonId] = { success: true, found: result.videos.length };
      }
      return sendJson(res, 200, { success: true, processedCount: Object.keys(results).length, results });
    }
    if (action === "approve") {
      const existing = await listResources();
      const candidate = existing.find((r) => r.id === String(body.resourceId || ""));
      if (!candidate) return sendJson(res, 404, { success: false, error: "RESOURCE_NOT_FOUND", message: "Resource not found." });
      const validation = await validateYouTubeVideo(candidate.providerVideoId);
      if (!validation.success || !validation.video) {
        await saveResources([{ ...candidate, status: "UNAVAILABLE", isPrimary: false, validationStatus: "unavailable", validationReason: validation.error || "Validation failed", updatedAt: now() }]);
        return sendJson(res, 422, { success: false, error: validation.error || "VIDEO_REJECTED", message: "The video could not be approved." });
      }
      const updated = existing.filter((r) => r.lessonId === candidate.lessonId).map((r) => r.id === candidate.id ? { ...resourceFromVideo(candidate.lessonId, validation.video, candidate.searchQuery, candidate), status: "APPROVED", isPrimary: true, validationStatus: "approved", validatedAt: now() } : { ...r, isPrimary: false, updatedAt: now() });
      await saveResources(updated);
      return sendJson(res, 200, { success: true });
    }
    if (action === "reject") {
      const existing = await listResources();
      const candidate = existing.find((r) => r.id === String(body.resourceId || ""));
      if (!candidate) return sendJson(res, 404, { success: false, error: "RESOURCE_NOT_FOUND", message: "Resource not found." });
      await saveResources([{ ...candidate, status: "REJECTED", isPrimary: false, validationStatus: "rejected", updatedAt: now() }]);
      return sendJson(res, 200, { success: true });
    }
    if (action === "set-primary") {
      const { lessonId, resourceId } = body;
      if (!lessonId || !resourceId) return sendJson(res, 400, { success: false, error: "INVALID_REQUEST", message: "lessonId and resourceId are required." });
      const existing = await listResources();
      const target = existing.find((r) => r.id === resourceId);
      if (!target || target.lessonId !== lessonId) return sendJson(res, 404, { success: false, error: "RESOURCE_NOT_FOUND", message: "Target resource not found for this lesson." });
      const updated = existing.map((r) => {
        if (r.lessonId === lessonId) {
          return { ...r, isPrimary: r.id === resourceId, status: r.id === resourceId ? "APPROVED" : r.status, updatedAt: now() };
        }
        return r;
      });
      await saveResources(updated);
      return sendJson(res, 200, { success: true, resource: updated.find((r) => r.id === resourceId) });
    }
    return sendJson(res, 404, { success: false, error: "UNKNOWN_ACTION", message: "Unknown API action." });
  } catch (error) {
    console.error("[CONTENT STUDIO] API failure", error);
    return sendJson(res, 500, { success: false, error: "INTERNAL_ERROR", message: "The server could not complete the request." });
  }
}

// api-src/discovery/discover-single.ts
function discoverSingleHandler(req, res) {
  req.query = { ...req.query, action: "discover-single" };
  return handler(req, res);
}
export {
  discoverSingleHandler as default
};
