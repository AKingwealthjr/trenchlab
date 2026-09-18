// api/licenses/[action].js
import { createHash as createHash2, randomBytes as randomBytes2 } from "node:crypto";
import fs from "fs";
import path from "path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import fs2 from "fs";
import path2 from "path";
import { createHash, randomBytes } from "node:crypto";
import { createPublicKey, verify } from "node:crypto";
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
  return new Set(
    (process.env.ADMIN_EMAILS || "1alexkingsley@gmail.com,alexkingsley@gmail.com,precilexis@gmail.com").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean)
  );
}
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
async function requireUser(req, res) {
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
  return claims;
}
var hash2 = (key) => createHash2("sha256").update(key.trim().toUpperCase()).digest("hex");
var createKey = () => `TLB-${randomBytes2(6).toString("hex").toUpperCase().match(/.{1,4}/g).join("-")}`;
var now2 = () => (/* @__PURE__ */ new Date()).toISOString();
function readBody(req) {
  if (typeof req.body !== "string") return req.body || {};
  try {
    return JSON.parse(req.body || "{}");
  } catch {
    return null;
  }
}
function getFirestoreDb() {
  try {
    return firebaseAdmin().db;
  } catch {
    return null;
  }
}
async function writeAudit(db, input) {
  try {
    await db.collection("license_audit").add({
      ...input,
      actorEmail: input.actorEmail || null,
      notes: input.notes || "",
      createdAt: now2()
    });
  } catch (err) {
    console.warn("[LICENSE AUDIT] Failed to write to Firestore:", err);
  }
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
  const action = getAction(req);
  try {
    const body = readBody(req);
    if (body === null) {
      return sendJson(res, 400, { success: false, error: "INVALID_JSON", message: "Invalid JSON payload." });
    }
    if (action === "activate") {
      const user = await requireUser(req, res);
      if (!user) return;
      const key = String(body.licenseKey || "").trim().toUpperCase();
      if (!key) return sendJson(res, 400, { success: false, error: "LICENSE_REQUIRED", message: "Enter your license key." });
      const db2 = getFirestoreDb();
      if (db2) {
        try {
          const snapshot = await db2.collection("licenses").where("keyHash", "==", hash2(key)).limit(1).get();
          if (snapshot.empty) {
            const localRes = LicenseStore.activate({ licenseKey: key, userUid: user.uid, userEmail: user.email });
            if (localRes.success) {
              return sendJson(res, 200, { success: true, message: "ACCESS_GRANTED" });
            }
            return sendJson(res, 422, { success: false, error: "INVALID_LICENSE", message: "This license key could not be verified." });
          }
          const ref = snapshot.docs[0].ref;
          await db2.runTransaction(async (tx) => {
            const license = (await tx.get(ref)).data();
            if (license.status === "active" && license.assignedUid !== user.uid) throw new Error("LICENSE_ALREADY_ACTIVATED");
            if (["revoked", "suspended", "expired"].includes(license.status)) throw new Error(`LICENSE_${String(license.status).toUpperCase()}`);
            if (license.expiresAt && new Date(license.expiresAt).getTime() <= Date.now()) throw new Error("LICENSE_EXPIRED");
            tx.update(ref, {
              status: "active",
              assignedUid: user.uid,
              assignedEmail: user.email || null,
              activatedAt: now2(),
              updatedAt: now2(),
              activationCount: (license.activationCount || 0) + (license.assignedUid ? 0 : 1)
            });
            tx.set(db2.collection("users").doc(user.uid), {
              accessStatus: "active",
              licenseId: ref.id,
              licenseActivatedAt: now2(),
              accessExpiresAt: license.expiresAt || null
            }, { merge: true });
          });
          await writeAudit(db2, { licenseId: ref.id, action: "activate", actorUid: user.uid, actorEmail: user.email || null });
          return sendJson(res, 200, { success: true, message: "ACCESS_GRANTED" });
        } catch (dbErr) {
          const knownCodes = ["LICENSE_ALREADY_ACTIVATED", "LICENSE_REVOKED", "LICENSE_SUSPENDED", "LICENSE_EXPIRED"];
          if (knownCodes.includes(dbErr.message)) {
            return sendJson(res, 422, { success: false, error: dbErr.message, message: dbErr.message.replaceAll("_", " ") });
          }
          console.warn("[LICENSE ACTIVATE] Firestore error, falling back to LicenseStore:", dbErr);
        }
      }
      const fallbackResult = LicenseStore.activate({ licenseKey: key, userUid: user.uid, userEmail: user.email });
      if (!fallbackResult.success) {
        return sendJson(res, 422, { success: false, error: fallbackResult.error || "INVALID_LICENSE", message: fallbackResult.message || "Activation failed." });
      }
      return sendJson(res, 200, { success: true, message: "ACCESS_GRANTED" });
    }
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    const db = getFirestoreDb();
    if (action === "generate") {
      const rawKey = createKey();
      const dbSuccess = false;
      if (db) {
        try {
          const id = db.collection("licenses").doc().id;
          await db.collection("licenses").doc(id).set({
            keyHash: hash2(rawKey),
            keyPrefix: rawKey.slice(0, 8),
            status: "available",
            assignedUid: null,
            assignedEmail: body.assignedEmail || null,
            createdAt: now2(),
            updatedAt: now2(),
            activatedAt: null,
            expiresAt: body.expiresAt || null,
            maxActivations: 1,
            activationCount: 0,
            createdBy: admin.uid,
            notes: String(body.notes || "")
          });
          await writeAudit(db, { licenseId: id, action: "generate", actorUid: admin.uid, actorEmail: admin.email || null, notes: String(body.notes || "") });
          LicenseStore.generate({ assignedEmail: body.assignedEmail, expiresAt: body.expiresAt, notes: body.notes, adminUid: admin.uid, adminEmail: admin.email });
          return sendJson(res, 201, { success: true, license: { id, key: rawKey } });
        } catch (dbErr) {
          console.warn("[LICENSE GENERATE] Firestore error, falling back to LicenseStore:", dbErr);
        }
      }
      const genResult = LicenseStore.generate({
        assignedEmail: body.assignedEmail,
        expiresAt: body.expiresAt,
        notes: body.notes,
        adminUid: admin.uid,
        adminEmail: admin.email
      });
      return sendJson(res, 201, { success: true, license: genResult });
    }
    if (action === "list") {
      if (db) {
        try {
          const [list, audit] = await Promise.all([
            db.collection("licenses").orderBy("createdAt", "desc").limit(100).get(),
            db.collection("license_audit").orderBy("createdAt", "desc").limit(100).get()
          ]);
          return sendJson(res, 200, {
            success: true,
            licenses: list.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
            audit: audit.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          });
        } catch (dbErr) {
          console.warn("[LICENSE LIST] Firestore error, falling back to LicenseStore:", dbErr);
        }
      }
      return sendJson(res, 200, {
        success: true,
        licenses: LicenseStore.getAll(),
        audit: LicenseStore.getAudit()
      });
    }
    if (["revoke", "suspend", "reactivate"].includes(action)) {
      const id = String(body.licenseId || "");
      if (!id) return sendJson(res, 400, { success: false, error: "LICENSE_ID_REQUIRED", message: "License id is required." });
      if (db) {
        try {
          const ref = db.collection("licenses").doc(id);
          const snap = await ref.get();
          if (snap.exists) {
            const license = snap.data();
            const status = action === "reactivate" ? license.assignedUid ? "active" : "available" : action === "revoke" ? "revoked" : "suspended";
            await ref.update({ status, updatedAt: now2(), lifecycleReason: String(body.reason || "") });
            if (license.assignedUid) {
              await db.collection("users").doc(license.assignedUid).set({
                accessStatus: status === "active" ? "active" : status,
                licenseId: id,
                accessExpiresAt: status === "active" ? license.expiresAt || null : null
              }, { merge: true });
            }
            await writeAudit(db, { licenseId: id, action, actorUid: admin.uid, actorEmail: admin.email || null, notes: String(body.reason || "") });
            LicenseStore.updateStatus(id, action, admin.uid, admin.email, body.reason);
            return sendJson(res, 200, { success: true, license: { id, status } });
          }
        } catch (dbErr) {
          console.warn("[LICENSE LIFECYCLE] Firestore error, falling back to LicenseStore:", dbErr);
        }
      }
      const updateResult = LicenseStore.updateStatus(id, action, admin.uid, admin.email, body.reason);
      if (!updateResult.success) {
        return sendJson(res, 404, { success: false, error: updateResult.error || "LICENSE_NOT_FOUND", message: updateResult.message || "License not found." });
      }
      return sendJson(res, 200, { success: true, license: updateResult.license });
    }
    return sendJson(res, 404, { success: false, error: "UNKNOWN_ACTION", message: "Unknown license action." });
  } catch (error) {
    console.error("[LICENSE API] Unhandled error:", error);
    const code = error instanceof Error ? error.message : "LICENSE_ERROR";
    const known = ["LICENSE_ALREADY_ACTIVATED", "LICENSE_REVOKED", "LICENSE_SUSPENDED", "LICENSE_EXPIRED"];
    return sendJson(res, known.includes(code) ? 422 : 500, {
      success: false,
      error: known.includes(code) ? code : "LICENSE_ERROR",
      message: known.includes(code) ? code.replaceAll("_", " ") : "License operation failed."
    });
  }
}

// api/licenses/list.ts
function listHandler(req, res) {
  req.query = { ...req.query, action: "list" };
  return handler(req, res);
}
export {
  listHandler as default
};
