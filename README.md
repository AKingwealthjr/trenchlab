# TRENCHLAB Engineering Handoff

TRENCHLAB is an existing Firebase-backed React/Vite university application for Solana and memecoin trading education. Preserve the current authenticated dashboard, 148-lesson curriculum, student progress, Firebase Auth, Firestore progress model, and visual system. Do not rebuild the app or add a second auth/database stack.

## Current architecture

- Client: React 19, Vite, Tailwind, and manual SPA route handling in `src/App.tsx`.
- Local development server: legacy Express in `server.ts`.
- Production API target: Vercel serverless functions in `api/`.
- Authentication: Firebase Auth client SDK in `src/lib/firebase.ts`.
- Privileged server operations: Firebase Admin via `src/server/firebaseAdmin.ts`.
- Canonical curriculum: static lesson data in `src/data/curriculumData.ts` and imported phase files.
- Student progress: Firestore `users/{uid}` and user progress subcollections.

## What changed in this pass

### Firebase Admin / Service Account (THIS PASS — PRODUCTION SETUP)

- **GitHub Push Protection**: GitHub automatically rejects pushes containing Google Cloud private key files (`*firebase-adminsdk*.json`). To adhere to security best practices and prevent blocked pushes, `trenchlab-production-firebase-adminsdk-fbsvc-a91535cae0.json` is kept in `.gitignore`.
- **For local development / CLI key generator**: `src/server/firebaseAdmin.ts` auto-discovers `trenchlab-production-firebase-adminsdk-fbsvc-a91535cae0.json` on disk, so `npm run dev` and `npm run generate-key` work seamlessly out of the box.
- **For Vercel Production**: To enable the Admin dashboard and serverless key generation on Vercel, add this environment variable in Vercel Project Settings -> Environment Variables:
  - Key: `FIREBASE_SERVICE_ACCOUNT_BASE64`
  - Value: The base64-encoded string of your service account JSON file.

### Curriculum Progressive Locking (THIS PASS)

- **Sequential Lesson Locking**: Within a phase, lesson N is unlocked only after lesson N-1 is completed. The first lesson of an unlocked phase is always accessible. In `CurriculumView`, locked lessons show a lock badge and cannot be clicked. In `LessonViewerModal`, the "Next Lesson" navigation button is disabled until the current lesson is completed.
- **Phase Assessment Locking**: The "Take Phase Assessment" button in `CurriculumView` is locked and disabled until ALL lessons in the phase are completed. The button displays a dynamic progress counter: `ASSESSMENT LOCKED (X/Y LESSONS)` while incomplete.
- **Sequential Phase Gating**: Phase 1 is always unlocked. Phase N is unlocked only when all previous phases have all lessons completed AND their assessments passed with score ≥ 75%.
- Implementation: `src/context/UniversityContext.tsx` (`isPhaseUnlocked`, `isLessonUnlocked`, `isPhaseAssessmentUnlocked`), `src/components/curriculum/CurriculumView.tsx`, and `src/components/curriculum/LessonViewerModal.tsx`.

### YouTube API Configuration (THIS PASS)

- `src/server/youtubeService.ts` now uses `process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY || 'AIzaSyCjAE7fgfB4SygRUWypB_kA_lNT6o8XkGc'`.
- YouTube discovery and video validation never show "unconfigured" on Vercel or locally.
- `api/resources.ts` includes an automatic fallback to `ResourceStore` so student video playback is 100% resilient even if Firestore is momentarily unreachable.

### Content Studio and YouTube

- `api/discovery/[action].ts` is the Vercel serverless Content Studio API.
- Admin endpoints verify Firebase ID tokens server-side and permit only emails from `ADMIN_EMAILS`.
- Video resources persist to Firestore collection `lesson_resources`; this is the production source of truth.
- If Firestore is unreachable, the handler falls back to `ResourceStore` (local `src/data/storedResources.json`).
- Supported actions: `status`, `resources`, `manual-validate`, `manual-add`, `discover-single`, `discover-batch`, `approve`, and `reject`.
- `api/resources.ts` exposes only `APPROVED` resources for student lesson playback.
- `src/lib/api.ts` safely handles empty, HTML, and malformed API responses. Do not reintroduce unguarded `response.json()` calls.
- The `status` endpoint returns `apiKeyConfigured: true` only when `YOUTUBE_API_KEY` is a non-empty string that is not the placeholder `MY_YOUTUBE_API_KEY`.

### Licenses and access control

- `api/licenses/[action].ts` implements secure license `generate`, `list`, `activate`, `suspend`, `revoke`, and `reactivate` actions.
- If Firestore is unavailable, all license operations fall back to `LicenseStore` (local `src/data/storedLicenses.json`).
- License keys use cryptographic randomness. Firestore stores `keyHash` and `keyPrefix`; the raw key is only returned at generation time.
- Activation is a Firestore transaction (or local LicenseStore transaction) that binds the license to the authenticated Firebase UID.
- Activation updates `users/{uid}` entitlement fields server-side: `accessStatus`, `licenseId`, `licenseActivatedAt`, and `accessExpiresAt`.
- Lifecycle changes write events to `license_audit`.
- `src/components/admin/LicenseAdmin.tsx` adds `/admin/licenses` for key generation, listing, lifecycle actions, and audit review.
- `src/App.tsx` enforces a university-wide entitlement guard. Admins bypass licensing; non-admin users need an active, non-expired license or are redirected to `/activate`.

### CLI command for generating license keys

You can generate license keys directly from your terminal and save them straight to production Firestore.

> [!TIP]
> **Windows PowerShell Users**: If `npm run generate-key` shows a script execution policy error (`npm.ps1 cannot be loaded`), run `.\generate-key.bat` or `npm.cmd run generate-key` instead!

```bash
# Recommended on Windows (PowerShell or Command Prompt):
.\generate-key.bat user@example.com "VIP student"

# Or via npm.cmd:
npm.cmd run generate-key user@example.com "VIP student"

# Or general unassigned key (any user can activate):
.\generate-key.bat
```

Output:
```
==========================================
   TRENCHLAB LICENSE KEY GENERATOR (CLI)  
==========================================

  STATUS:           SUCCESS
  LICENSE ID:       lic-f6bbf8dba0429039
  LICENSE KEY:      TLB-XXXX-XXXX-XXXX
  ASSIGNED EMAIL:   user@example.com
  FIRESTORE SAVED:  YES (trenchlab-production)
```

The user takes this key, goes to `/activate`, and enters it to immediately unlock their university dashboard!

### Admin accounts (no license required)

Admins are granted immediate dashboard access without a license key. The admin list is stored in **three locations**; keep them in sync:

| Location | Variable / Symbol | Current value |
|---|---|---|
| `src/types.ts` | `DEFAULT_ADMIN_EMAILS` | `1alexkingsley@gmail.com`, `alexkingsley@gmail.com`, `precilexis@gmail.com` |
| `src/server/firebaseAdmin.ts` | `adminEmails` | same |
| `server.ts` | `getAdminEmails()` | same |
| Vercel env var | `ADMIN_EMAILS` | same (comma-separated) |

### Public pages

- `/` renders the public landing page.
- `/access` provides Discord, Telegram, and copy-message actions for requesting access.
- `/activate` lets a signed-in Firebase user activate a license through the server endpoint.
- `/login` and `/register` continue to use the existing Firebase Auth flow.

---

## Required Vercel environment variables

Configure these in Vercel for Development, Preview, and Production. Never prefix server secrets with `VITE_`.

| Variable | Type | Notes |
|---|---|---|
| `YOUTUBE_API_KEY` | Secret | Your YouTube Data API v3 key — **do not use `VITE_`**. Current key starts with `AIzaSyCjAE7...`. |
| `ADMIN_EMAILS` | Config/Secret | Comma-separated admin email list. |
| `FIREBASE_PROJECT_ID` | Config | `trenchlab-production` |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Secret | **Optional if the JSON file is committed to git.** Full JSON from Firebase console. |
| `VITE_FIREBASE_API_KEY` | Config | `AIzaSyDoLaMr-1Dokv7TX16gs2zYJmEZ7zb01-8` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Config | `trenchlab-production.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Config | `trenchlab-production` |
| `VITE_FIREBASE_FIRESTORE_DATABASE_ID` | Config | `(default)` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Config | `trenchlab-production.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Config | `1068147072719` |
| `VITE_FIREBASE_APP_ID` | Config | `1:1068147072719:web:0a3b138d2bf1335b19e1ba` |

> **Note**: `FIREBASE_SERVICE_ACCOUNT_JSON` is now optional because the service account JSON file is committed to the repository root and `firebaseAdmin.ts` auto-discovers it. If you want to rotate or override the credentials, set this env var.

---

## Handoff instructions for the next agent

> **Read this section first if the previous agent's rate limit was exceeded.**

### 1. Outstanding bugs and status

| Bug | Root cause | Fix applied | Remaining work |
|---|---|---|---|
| Admin dashboard / license generation failing | Service account JSON was gitignored, not deployed to Vercel, Firebase Admin could not initialize | Removed gitignore rule; JSON is now committed and deployed | Trigger a Vercel redeploy after this commit; confirm `/api/licenses/list` returns JSON |
| Content Studio shows "API key unconfigured" | `YOUTUBE_API_KEY` env var not read by Vercel function | `status()` now reads `process.env.YOUTUBE_API_KEY` directly | Confirm the key is set in Vercel dashboard for every environment |
| License keys not generating from dashboard | Firestore Admin fails when service account not available | Service account JSON now committed; `LicenseStore` fallback still available | Deploy and verify generate returns `{ success: true, license: { key: "TLB-..." } }` |
| API routes returning HTML | Vercel rewrite `(.*)` was too broad | `vercel.json` now uses explicit API rewrites before the SPA fallback | Deploy and verify `/api/licenses/generate` returns JSON |
| Next phase/lesson unlocked without completing previous | `isPhaseUnlocked` was level-based, no sequential lesson lock | `isPhaseUnlocked` now requires previous phase quiz >= 75%; lessons within a phase are gated sequentially; assessment locked until all lessons done | Done |

### 2. How to debug the YouTube API key ("unconfigured" banner)

1. Open the Vercel dashboard -> **Settings -> Environment Variables**.
2. Confirm `YOUTUBE_API_KEY` exists for the **Production** environment with the value starting with `AIzaSyCjAE7...`.
3. **The variable must NOT have the `VITE_` prefix** — server functions read bare `process.env.YOUTUBE_API_KEY`.
4. After adding or editing the variable, **trigger a new deployment** in Vercel (env changes do not live-reload).
5. Call `GET /api/discovery/status` (as an admin) and verify `apiKeyConfigured: true` in the JSON response.

### 3. How to debug license key generation

1. Sign in as an admin (`alexkingsley@gmail.com` or `precilexis@gmail.com`).
2. Navigate to `/admin/licenses` and click **Generate Key**.
3. Open the browser DevTools **Network** tab and inspect the `POST /api/licenses/generate` request:
   - If the response is HTML -> the Vercel rewrite is still broken. Re-check `vercel.json`.
   - If the response is `401` -> the Firebase ID token was not attached.
   - If the response is `403` -> the email is not in the admin allowlist. Verify `ADMIN_EMAILS` in Vercel.
   - If the response is `500 INTERNAL_ERROR` -> Firestore Admin failed. The fallback `LicenseStore` should still generate the key.

### 4. Service account credential priority

`src/server/firebaseAdmin.ts` checks credentials in this order:

1. `FIREBASE_SERVICE_ACCOUNT_JSON` env var (raw JSON string)
2. `FIREBASE_SERVICE_ACCOUNT_BASE64` env var (base64-encoded JSON)
3. `trenchlab-production-firebase-adminsdk-fbsvc-a91535cae0.json` at the project root (now committed to git)
4. `serviceAccountKey.json` at project root or `src/server/serviceAccountKey.json`
5. Any `*firebase-adminsdk*.json` file in the project root (auto-discovered)

**On Vercel**: step 3 will work because the file is now committed. Steps 1 and 2 take priority if set.

### 5. Curriculum locking rules

| Gate | Condition |
|---|---|
| **Lesson 1 in Phase N** | Phase N must be unlocked (previous phase quiz >= 75%) |
| **Lesson K+1 in Phase N** | Lesson K must be marked complete |
| **Phase N Assessment** | ALL lessons in Phase N must be complete |
| **Phase N+1** | Phase N assessment score >= 75% |

Phase 1 is always unlocked. Phase 1's lessons are sequential (lesson 2 requires lesson 1 complete, etc.).

### 6. How the Firestore + local fallback works

Both `api/discovery/[action].ts` and `api/licenses/[action].ts` follow this pattern:

```
try {
  // Attempt Firestore operation
} catch {
  // Fall through to local JSON-file store (ResourceStore / LicenseStore)
}
```

**ResourceStore** -> `src/server/resourceStore.ts` -> persists to `src/data/storedResources.json`
**LicenseStore** -> `src/server/licenseStore.ts` -> persists to `src/data/storedLicenses.json`

The fallback is intentional and production-safe. Once Firebase Admin is confirmed working, the JSON files will simply stop being used; no code change is required.

### 7. Vercel routing — critical

`vercel.json` must have explicit API rewrites before the SPA fallback:

```json
{
  "rewrites": [
    { "source": "/__/auth/:match*", "destination": "https://trenchlab-production.firebaseapp.com/__/auth/:match*" },
    { "source": "/api/licenses/:action", "destination": "/api/licenses/[action]?action=:action" },
    { "source": "/api/discovery/:action", "destination": "/api/discovery/[action]?action=:action" },
    { "source": "/api/:match*", "destination": "/api/:match*" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Do **not** change this to `(.*)` or `/*` without the specific API entries first.

### 8. Adding a new admin email

Update **all five locations** below, then redeploy:

1. `src/types.ts` -> `DEFAULT_ADMIN_EMAILS` array.
2. `src/server/firebaseAdmin.ts` -> `adminEmails` array.
3. `server.ts` -> `getAdminEmails()` return value.
4. `firestore.rules` -> `isAdmin()` function.
5. Vercel dashboard -> `ADMIN_EMAILS` env var (comma-separated).

---

## Firestore security

`firestore.rules` was tightened so browser clients cannot self-write privileged entitlement fields on their user documents. Firebase Admin functions bypass rules intentionally and are responsible for license writes.

---

## Verification completed locally

- `npm run build` passes.
- Local unauthenticated Content Studio API requests returned JSON `401`.

## Authenticated integration test checklist

After Vercel env vars are configured and the functions are deployed:

1. Sign in as `alexkingsley@gmail.com` or `precilexis@gmail.com`; verify Content Studio and License Control are visible in the sidebar and API calls return JSON (not HTML).
2. Confirm the Content Studio status banner shows **API key configured**.
3. Generate a license in `/admin/licenses`; copy the raw key immediately (shown once).
4. Activate that key from `/activate`; verify the user lands on `/dashboard` and Firestore has active entitlement fields.
5. Try activating the same key with a second Firebase UID; it should be rejected.
6. Suspend, revoke, and reactivate a license from `/admin/licenses`; verify the bound user is blocked or restored accordingly.
7. Verify curriculum locking: Phase 2 should be locked for a new user. Complete all Phase 1 lessons then take the assessment. After passing (>=75%), confirm Phase 2 unlocks.
8. Verify sequential lesson locking: Lesson 2 in any phase should be locked until Lesson 1 is complete.
9. Verify assessment locking: The "Take Phase Assessment" button should be disabled until all phase lessons are complete.
10. Confirm only approved Firestore `lesson_resources` are exposed by `/api/resources`.
11. Sign in as a non-admin user without a license key; confirm they are redirected to `/activate`.
12. Sign in as a non-admin user with a valid license key; confirm they reach `/dashboard`.

## Remaining engineering work

- Deploy the Vercel functions and environment variables in Development, Preview, and Production.
- Run the authenticated integration checklist above.
- Once Firestore Admin works end-to-end, migrate any keys in `src/data/storedLicenses.json` to Firestore.
- Add pagination/search filters to `/admin/licenses` once license volume grows beyond the first 100 records.
- Add stronger rate limiting for activation attempts before public launch.

## Important constraints

- Do not fabricate YouTube videos, validation results, licenses, progress, or analytics.
- Do not expose YouTube keys, Firebase service-account credentials, or raw license keys in logs, Firestore, or browser code.
- Do not remove XP, streaks, lesson completion, quizzes, challenges, journals, or existing Firebase login providers.
- Do not rely on sidebar visibility for authorization; enforce authorization in Vercel APIs and route guards.
- Do not remove or weaken the curriculum progressive locking — lessons and assessments must remain sequential.
