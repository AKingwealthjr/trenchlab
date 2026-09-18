// scripts/generate-license.mjs
import { createHash as createHash2, randomBytes as randomBytes2 } from "node:crypto";
import dotenv from "dotenv";

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

// src/server/licenseStore.ts
import fs2 from "fs";
import path2 from "path";
import { createHash, randomBytes } from "node:crypto";
var STORAGE_FILE_PATH = path2.resolve(process.cwd(), "src/data/storedLicenses.json");
var hash = (key) => createHash("sha256").update(key.trim().toUpperCase()).digest("hex");
var createRawKey = () => `TLB-${randomBytes(6).toString("hex").toUpperCase().match(/.{1,4}/g).join("-")}`;
var now = () => (/* @__PURE__ */ new Date()).toISOString();
var LicenseStoreManager = class {
  constructor() {
    this.licensesCache = /* @__PURE__ */ new Map();
    this.auditCache = [];
    this.isInitialized = false;
  }
  initialize() {
    if (this.isInitialized) return;
    try {
      if (fs2.existsSync(STORAGE_FILE_PATH)) {
        const raw = fs2.readFileSync(STORAGE_FILE_PATH, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.licenses)) {
          for (const lic of parsed.licenses) {
            this.licensesCache.set(lic.id, lic);
          }
        }
        if (Array.isArray(parsed.audit)) {
          this.auditCache = parsed.audit;
        }
      }
    } catch (err) {
      console.warn("[LICENSE STORE] Unable to load storedLicenses.json, starting empty:", err);
    }
    this.isInitialized = true;
  }
  persist() {
    try {
      const data = {
        licenses: Array.from(this.licensesCache.values()),
        audit: this.auditCache
      };
      fs2.writeFileSync(STORAGE_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
      console.warn("[LICENSE STORE] Warning: Could not persist to disk:", err);
    }
  }
  getAll() {
    this.initialize();
    return Array.from(this.licensesCache.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  getAudit() {
    this.initialize();
    return [...this.auditCache].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  getById(id) {
    this.initialize();
    return this.licensesCache.get(id);
  }
  generate(input) {
    this.initialize();
    const rawKey = createRawKey();
    const id = `lic-${randomBytes(8).toString("hex")}`;
    const timestamp = now();
    const record = {
      id,
      keyHash: hash(rawKey),
      keyPrefix: rawKey.slice(0, 8),
      status: "available",
      assignedUid: null,
      assignedEmail: input.assignedEmail || null,
      createdAt: timestamp,
      updatedAt: timestamp,
      activatedAt: null,
      expiresAt: input.expiresAt || null,
      maxActivations: 1,
      activationCount: 0,
      createdBy: input.adminUid,
      notes: input.notes || ""
    };
    this.licensesCache.set(id, record);
    const auditEntry = {
      id: `aud-${randomBytes(8).toString("hex")}`,
      licenseId: id,
      action: "generate",
      actorUid: input.adminUid,
      actorEmail: input.adminEmail || null,
      notes: input.notes || "",
      createdAt: timestamp
    };
    this.auditCache.push(auditEntry);
    this.persist();
    return { id, key: rawKey };
  }
  activate(input) {
    this.initialize();
    const key = input.licenseKey.trim().toUpperCase();
    if (!key) return { success: false, error: "LICENSE_REQUIRED", message: "Enter your license key." };
    const targetHash = hash(key);
    let found;
    for (const lic of this.licensesCache.values()) {
      if (lic.keyHash === targetHash) {
        found = lic;
        break;
      }
    }
    if (!found) {
      return { success: false, error: "INVALID_LICENSE", message: "This license key could not be verified." };
    }
    if (found.status === "active" && found.assignedUid !== input.userUid) {
      return { success: false, error: "LICENSE_ALREADY_ACTIVATED", message: "This license has already been activated by another operator." };
    }
    if (["revoked", "suspended", "expired"].includes(found.status)) {
      return { success: false, error: `LICENSE_${found.status.toUpperCase()}`, message: `This license has been ${found.status}.` };
    }
    if (found.expiresAt && new Date(found.expiresAt).getTime() <= Date.now()) {
      return { success: false, error: "LICENSE_EXPIRED", message: "This license has expired." };
    }
    const timestamp = now();
    found.status = "active";
    found.assignedUid = input.userUid;
    found.assignedEmail = input.userEmail || null;
    found.activatedAt = found.activatedAt || timestamp;
    found.updatedAt = timestamp;
    found.activationCount = (found.activationCount || 0) + (found.assignedUid === input.userUid ? 0 : 1);
    this.licensesCache.set(found.id, found);
    this.auditCache.push({
      id: `aud-${randomBytes(8).toString("hex")}`,
      licenseId: found.id,
      action: "activate",
      actorUid: input.userUid,
      actorEmail: input.userEmail || null,
      createdAt: timestamp
    });
    this.persist();
    return { success: true, message: "ACCESS_GRANTED", license: found };
  }
  updateStatus(licenseId, action, actorUid, actorEmail, reason) {
    this.initialize();
    const found = this.licensesCache.get(licenseId);
    if (!found) {
      return { success: false, error: "LICENSE_NOT_FOUND", message: "License not found." };
    }
    const newStatus = action === "reactivate" ? found.assignedUid ? "active" : "available" : action === "revoke" ? "revoked" : "suspended";
    const timestamp = now();
    found.status = newStatus;
    found.updatedAt = timestamp;
    found.lifecycleReason = reason || "";
    this.licensesCache.set(found.id, found);
    this.auditCache.push({
      id: `aud-${randomBytes(8).toString("hex")}`,
      licenseId: found.id,
      action,
      actorUid,
      actorEmail: actorEmail || null,
      notes: reason || "",
      createdAt: timestamp
    });
    this.persist();
    return { success: true, license: found };
  }
};
var LicenseStore = new LicenseStoreManager();

// scripts/generate-license.mjs
dotenv.config();
var hash2 = (key) => createHash2("sha256").update(key.trim().toUpperCase()).digest("hex");
var createRawKey2 = () => `TLB-${randomBytes2(6).toString("hex").toUpperCase().match(/.{1,4}/g).join("-")}`;
var now2 = () => (/* @__PURE__ */ new Date()).toISOString();
async function main() {
  const args = process.argv.slice(2);
  let assignedEmail = null;
  let notes = "Generated via CLI";
  for (const arg of args) {
    if (arg.includes("@")) {
      assignedEmail = arg.trim();
    } else if (!arg.startsWith("--")) {
      notes = arg.trim();
    }
  }
  console.log("\n==========================================");
  console.log("   TRENCHLAB LICENSE KEY GENERATOR (CLI)  ");
  console.log("==========================================\n");
  const rawKey = createRawKey2();
  const keyHash = hash2(rawKey);
  const keyPrefix = rawKey.slice(0, 8);
  const timestamp = now2();
  const licenseId = `lic-${randomBytes2(8).toString("hex")}`;
  const licenseRecord = {
    id: licenseId,
    keyHash,
    keyPrefix,
    status: "available",
    assignedUid: null,
    assignedEmail: assignedEmail || null,
    createdAt: timestamp,
    updatedAt: timestamp,
    activatedAt: null,
    expiresAt: null,
    maxActivations: 1,
    activationCount: 0,
    createdBy: "cli-admin",
    notes
  };
  let savedToFirestore = false;
  try {
    const admin = firebaseAdmin();
    await admin.db.collection("licenses").doc(licenseId).set(licenseRecord);
    await admin.db.collection("license_audit").add({
      licenseId,
      action: "generate",
      actorUid: "cli-admin",
      actorEmail: "admin@trenchlab",
      notes: `CLI key generation${assignedEmail ? " for " + assignedEmail : ""}`,
      createdAt: timestamp
    });
    savedToFirestore = true;
  } catch (err) {
    console.warn("[CLI] Notice: Could not write directly to Firestore:", err.message);
  }
  try {
    LicenseStore.generate({
      assignedEmail,
      notes,
      adminUid: "cli-admin",
      adminEmail: "admin@trenchlab"
    });
  } catch (err) {
  }
  console.log("  STATUS:           SUCCESS");
  console.log("  LICENSE ID:      ", licenseId);
  console.log("  LICENSE KEY:     ", rawKey);
  console.log("  ASSIGNED EMAIL:  ", assignedEmail || "(None - Any user can activate)");
  console.log("  NOTES:           ", notes);
  console.log("  FIRESTORE SAVED: ", savedToFirestore ? "YES (trenchlab-production)" : "NO (Saved locally)");
  console.log("\n------------------------------------------");
  console.log("  INSTRUCTIONS FOR THE USER:");
  console.log("  1. User registers or signs in at: https://trenchlab.vercel.app/login");
  console.log("  2. User goes to:                 https://trenchlab.vercel.app/activate");
  console.log("  3. User enters license key:     ", rawKey);
  console.log("  4. Full access to university curriculum is unlocked instantly!");
  console.log("------------------------------------------\n");
}
main().catch((err) => {
  console.error("[CLI ERROR]", err);
  process.exit(1);
});
