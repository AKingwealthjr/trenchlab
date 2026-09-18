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

### Content Studio and YouTube

- `api/discovery/[action].ts` is the new Vercel serverless Content Studio API.
- Admin endpoints verify Firebase ID tokens server-side and permit only emails from `ADMIN_EMAILS`.
- Video resources now persist to Firestore collection `lesson_resources`; this is the production source of truth.
- Supported actions: `status`, `resources`, `manual-validate`, `manual-add`, `discover-single`, `discover-batch`, `approve`, and `reject`.
- Search results stay as candidates until approval. Approval and manual injection call YouTube `videos.list` validation and require a public, embeddable video.
- `api/resources.ts` exposes only `APPROVED` resources for student lesson playback.
- `src/lib/api.ts` safely handles empty, HTML, and malformed API responses. Do not reintroduce direct unguarded `response.json()` calls.
- Static lesson `videos` are no longer presented as verified masterclasses. Only approved server resources should appear as verified lesson playback.

### Licenses and access control

- `api/licenses/[action].ts` implements secure license `generate`, `list`, `activate`, `suspend`, `revoke`, and `reactivate` actions.
- License keys use cryptographic randomness. Firestore stores `keyHash` and `keyPrefix`; the raw key is only returned at generation time.
- Activation is a Firestore transaction that binds the license to the authenticated Firebase UID.
- Activation updates `users/{uid}` entitlement fields server-side: `accessStatus`, `licenseId`, `licenseActivatedAt`, and `accessExpiresAt`.
- Lifecycle changes write recent events to `license_audit`.
- `src/components/admin/LicenseAdmin.tsx` adds `/admin/licenses` for key generation, license listing, lifecycle actions, and audit review.
- `src/App.tsx` now enforces a university-wide entitlement guard. Admins bypass licensing; non-admin authenticated users need an active, non-expired license or they are sent to `/activate`.

### Public pages

- `/` renders the public landing page.
- `/access` provides Discord, Telegram, and copy-message actions for requesting access.
- `/activate` lets a signed-in Firebase user activate a license through the server endpoint.
- `/login` and `/register` continue to use the existing Firebase Auth flow.

## Required Vercel environment variables

Configure these in Vercel for Development, Preview, and Production. Never prefix server secrets with `VITE_`.

Use Vercel value types this way:

- Config: Firebase Web SDK values with the `VITE_FIREBASE_*` prefix. They are intentionally bundled into the browser app.
- Secret: `YOUTUBE_API_KEY` and `FIREBASE_SERVICE_ACCOUNT_JSON`.
- Config or Secret: `ADMIN_EMAILS` and `FIREBASE_PROJECT_ID`; they are not browser variables, but they are not private credentials.

```dotenv
YOUTUBE_API_KEY=
ADMIN_EMAILS=1alexkingsley@gmail.com,alexkingsley@gmail.com,precilexis@gmail.com
FIREBASE_PROJECT_ID=trenchlab-production
FIREBASE_SERVICE_ACCOUNT_JSON={...entire Firebase service-account JSON...}

VITE_FIREBASE_API_KEY=AIzaSyDoLaMr-1Dokv7TX16gs2zYJmEZ7zb01-8
VITE_FIREBASE_AUTH_DOMAIN=trenchlab-production.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=trenchlab-production
VITE_FIREBASE_FIRESTORE_DATABASE_ID=(default)
VITE_FIREBASE_STORAGE_BUCKET=trenchlab-production.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1068147072719
VITE_FIREBASE_APP_ID=1:1068147072719:web:0a3b138d2bf1335b19e1ba
```

`FIREBASE_SERVICE_ACCOUNT_JSON` is mandatory for Vercel functions that verify sessions or write Firestore. Keep it out of browser code, logs, and git history. Paste the raw JSON exported from Firebase, not a Markdown-formatted copy. The JSON keys must use underscores such as `private_key`, and Google URLs must be plain strings, not `[text](url)` links. If it contains a multiline private key, store the full JSON exactly as Vercel expects for an environment variable.

The Firebase Web SDK `measurementId` is `G-KRGNFC62NX`. The current app does not initialize Firebase Analytics, so no `VITE_` variable is required for it unless analytics is added later.

## Firestore security

`firestore.rules` was tightened so browser clients cannot self-write privileged entitlement fields on their user documents. Firebase Admin functions bypass rules intentionally and are responsible for license writes.

Before production rollout, deploy the updated rules and verify:

- Normal users can still create their base profile.
- Normal users can still update progress, quizzes, challenges, journals, and summary metrics.
- Normal users cannot set `accessStatus`, `licenseId`, `licenseActivatedAt`, or `accessExpiresAt` from browser code.

## Verification completed locally

- `npm run lint` passes.
- `npm run build` passes. Vite still reports a large client chunk warning, but the build completes.
- Local unauthenticated Content Studio API requests returned JSON `401`.

Authenticated Firebase/YouTube integration testing has not been run because the required Vercel secrets and deployed functions are not configured from this workspace.

## Authenticated integration test checklist

After Vercel env vars are configured and the functions are deployed:

1. Sign in as `1alexkingsley@gmail.com`, `alexkingsley@gmail.com`, or `precilexis@gmail.com`; verify Content Studio and License Control are visible and API calls succeed.
2. Sign in as a normal user; verify Content Studio and License Control endpoints return `403`.
3. Generate a license in `/admin/licenses`; copy the raw key immediately.
4. Activate that key from `/activate`; verify the user lands on `/dashboard` and Firestore has active entitlement fields.
5. Try activating the same key with a second Firebase UID; it should be rejected.
6. Suspend, revoke, and reactivate a license from `/admin/licenses`; verify the bound user is blocked or restored accordingly.
7. Test manual YouTube URL/ID validation, manual injection, discovery batch, approval, rejection, missing key, quota failure, and lesson playback.
8. Confirm only approved Firestore `lesson_resources` are exposed by `/api/resources`.
9. Confirm the browser client cannot self-write entitlement fields in Firestore.

## Remaining engineering work

- Deploy the Vercel functions and environment variables in Development, Preview, and Production.
- Run the authenticated integration checklist above with the two real admin accounts and a real YouTube API key.
- Replace the legacy local Express `ResourceStore` with the Firestore repository as well, or make local development proxy/use the Vercel handlers. Production already uses `api/`.
- Add pagination/search filters to `/admin/licenses` once license volume grows beyond the first 100 records.
- Add stronger rate limiting for activation attempts before public launch.
- Add a production-grade WebGL/motion landing treatment only if it can be lazy-loaded and includes reduced-motion and mobile fallbacks.
- Verify deployed Vercel routing serves `api/` functions before the SPA fallback.

## Important constraints

- Do not fabricate YouTube videos, validation results, licenses, progress, or analytics.
- Do not expose YouTube keys, Firebase service-account credentials, or raw license keys in logs, Firestore, or browser code.
- Do not remove XP, streaks, lesson completion, quizzes, challenges, journals, or existing Firebase login providers.
- Do not rely on sidebar visibility for authorization; enforce authorization in Vercel APIs and route guards.
