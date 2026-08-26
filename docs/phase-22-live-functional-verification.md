# PHASE 22 — REAL LIVE FUNCTIONAL VERIFICATION

## 1. Executive Summary

- **Verification date:** 2026-08-26
- **Production URL:** `https://morrow-marketplace.netlify.app`
- **Supplied deployed repository HEAD:** `ea7c933fbd77027362ae3c2cae581580c4a1b450`
- **Netlify deployment ID:** `6a8ee87617f400c1fb8d7a54`
- **Overall result:** `BLOCKED — PRODUCTION VERIFICATION INCOMPLETE`

The production alias and deployment-specific Netlify URL were reachable. Live requests also identified the production Supabase project and corroborated Auth, PostgREST, and Storage connectivity. Read-only anonymous probes established several exposed relation names, ownership columns, relationships, and anonymous-visible exact counts without retrieving row bodies.

Production is **not functionally verified**. No approved production accounts, upload asset, privileged read-only Supabase inspection, migration-history access, or runtime-log access were available. Therefore authentication lifecycle, creator approval, owner/non-owner RLS, uploads, worker processing, private originals, generated derivatives/CDN delivery, collection mutations, and production logs remain blocked.

Two direct visitor-facing defects were observed: the tested design and artist detail pages render load-failure states while returning HTTP 200. Additional public behavior showed every homepage artist card targeting the same artist slug and English content wrapped in Persian RTL state.

Evidence was handled in two classes:

1. Direct production route/source requests are primary evidence.
2. Same-origin browser probes captured through Microlink made live requests to the production origins but are mediated evidence. They are retained as corroboration only and do not replace authorized Supabase inspection, authenticated sessions, or platform logs.

No production write succeeded or was attempted with a valid identity. No customer data or production configuration was changed.

## 2. Production Deployment Identity

| Field | Evidence |
|---|---|
| Production alias | `https://morrow-marketplace.netlify.app` responded |
| Deployment-specific origin | `https://6a8ee87617f400c1fb8d7a54--morrow-marketplace.netlify.app/en` responded with the expected site |
| Deployment ID | `6a8ee87617f400c1fb8d7a54` |
| Phase 21 state | `ready`, published `2026-08-26T13:22:40.949Z` |
| Phase 21 build ID | `6a8ee87617f400c1fb8d7a52` |
| Deployed Next.js build ID | `E5FXDLH9r3hYBvGUJS1PL` |
| Supplied deployed repository HEAD | `ea7c933fbd77027362ae3c2cae581580c4a1b450` |

The production alias and deployment-specific origin identify the live target. A new unauthenticated request to Netlify's deployment API returned HTTP 401 `Access Denied`, so Phase 22 could not independently read deployment metadata or confirm the commit association through Netlify.

The verification checkout is at `637640b99cabc695dcb4d9d24c4860549b1cfbba`, and fetching `origin/main` did not retrieve the supplied deployed commit. Local source was therefore not treated as evidence of production state. The exact deployed-commit association remains dependent on the Phase 21 deployment provenance rather than an independently readable production record.

## 3. Supabase Production Connectivity

**Status: BLOCKED overall; connectivity subset observed.**

The deployed client bundle identifies the live project as:

`aqufjgnjpvctkkmkqyye.supabase.co`

The deployed credential inspected was a public client credential whose decoded issuer and role were `supabase` and `anon`. Its value is intentionally omitted. No service-role or other privileged credential was found or used.

Corroborative live anonymous-role results were:

| Surface | Result | Meaning | Limitation |
|---|---|---|---|
| Auth health | HTTP 200 | Auth service responded | Does not prove user lifecycle |
| Auth settings | HTTP 200 | Settings endpoint responded | Anonymous configuration view only |
| Signup disabled | `false` | Signup is configured as enabled | Signup was not attempted |
| Email autoconfirm | `true` | Email auto-confirm is configured | No account was created |
| PostgREST relation queries | HTTP 200/206 on known relations | Database/API path responded | Anonymous role only |
| Storage bucket listing | HTTP 200 with `[]` visible | Storage service responded | Does not prove no buckets exist |
| REST/OpenAPI root | HTTP 401 | Response said that endpoint requires `service_role` | Not evidence that the anon credential is invalid |

This establishes the production project identity and limited service connectivity. It does not establish privileged database state, bucket inventory, storage policy correctness, or full production health.

## 4. Production Schema

**Status: BLOCKED; partial anonymous schema evidence only.**

Read-only zero-row queries and exact-count headers produced the following corroborative live evidence:

| Relation or field | Anonymous result | Evidence |
|---|---:|---|
| `categories` | HTTP 200 | Relation name accepted |
| `creators` | HTTP 206 | Exact anonymous-visible count `8` |
| `creators.user_id` | HTTP 206 | Column exists |
| `designs` | HTTP 206 | Exact anonymous-visible count `40` |
| `designs.creator_id` | HTTP 206 | Column exists |
| `designs -> creators` | HTTP 206 | Embedded PostgREST relationship resolved |
| `collections` | HTTP 206 | Exact anonymous-visible count `3` |
| `collections.creator_id` | HTTP 206 | Column exists |
| `collections.is_public` | HTTP 206 | Column exists |
| `collection_items` | HTTP 206 | Exact anonymous-visible count `9` |
| `collection_items.collection_id` | HTTP 206 | Column exists |
| `collection_items.design_id` | HTTP 206 | Column exists |
| `collection_items -> collections/designs` | HTTP 206 | Both embedded relationships resolved |

Candidate-field checks returned PostgreSQL/PostgREST code `42703` for absent columns under the queried names:

- `creators.profile_id`, `creators.status`, `creators.approval_status`
- `designs.user_id`, `designs.owner_id`
- `collections.user_id`, `collections.owner_id`, `collections.visibility`

The exact exposed relation name `media_assets` returned HTTP 404 / `PGRST205` under the anonymous role. Three candidate names—`processing_jobs`, `media_processing_jobs`, and `asset_processing_jobs`—also returned `PGRST205`. The processing names were guesses; these responses do not prove that no worker persistence exists. Likewise, the `media_assets` response proves only that the relation was not available from the exposed public schema cache to this role under that exact name.

No row bodies were requested for the count probes. The evidence does not reveal all columns, constraints, triggers, grants, policies, private schemas, storage objects, or privileged relationships. Authorized read-only schema inspection is still required.

## 5. Remote Migration State

**Status: BLOCKED.**

No authorized remote migration-history interface or production database connection was available. Pending/applied migration state was not inferred from local migration files. No migration was applied, reset, repaired, or modified.

Required evidence remains:

- authoritative remote migration-history output;
- current applied versions and checksums where supported;
- pending migration state against the supplied deployed HEAD;
- confirmation that no out-of-band schema drift exists.

## 6. Authentication

**Status: BLOCKED — DEDICATED SAFE PRODUCTION TEST ACCOUNT REQUIRED.**

Live login and signup forms render. Anonymous access to `/en/creator/dashboard` redirects to:

`/en/auth/login?next=%2Fen%2Fcreator%2Fdashboard`

The Auth service and settings endpoint responded, with signup enabled and email auto-confirm configured. These facts do not prove successful signup, login, callback handling, session persistence, refresh, logout, invalid/expired-session behavior, or account recovery.

No account was created because there was no approved dedicated test identity or cleanup procedure. No authentication token, password, session cookie, or personal account data was printed or stored.

## 7. Creator Approval & Dashboard

**Status: BLOCKED — APPROVED CREATOR ACCOUNT REQUIRED.**

Partial live data-layer evidence shows:

- eight creator rows are count-visible to the anonymous role;
- `creators.user_id` exists;
- `designs.creator_id` exists and resolves to `creators`;
- `collections.creator_id` exists.

The tested candidate approval columns `status` and `approval_status` were not present under those names. That does not establish the actual approval model.

Anonymous dashboard redirection worked, but no approved creator session was available. Approval state, dashboard hydration, creator profile management, owned design/collection visibility, and creator API permissions remain untested. The public artist detail route also exhibits the marketplace failure recorded in Section 14.

## 8. RLS Verification

**Status: BLOCKED — OWNER AND DIFFERENT-USER SESSIONS REQUIRED.**

The anonymous role could obtain exact visible counts of 8 creators, 40 designs, 3 collections, and 9 collection-item mappings, and could resolve selected relationships. Anonymous Storage bucket listing returned an empty visible list.

These observations do **not** prove that RLS is enabled or correct. They establish only what the anonymous API role could observe through these specific read-only requests. No policy was inferred from repository SQL.

The following required matrix was not executable:

| Resource | Anonymous | Owner | Different user |
|---|---|---|---|
| Designs | Partial count/shape evidence only | BLOCKED | BLOCKED |
| Collections | Partial count/shape evidence only | BLOCKED | BLOCKED |
| Collection items | Partial count/relationship evidence only | BLOCKED | BLOCKED |
| Private original media | BLOCKED | BLOCKED | BLOCKED |
| Generated/public media | BLOCKED | BLOCKED | BLOCKED |

No RLS or storage policy was changed.

## 9. Upload Pipeline

**Status: BLOCKED — APPROVED ACCOUNT, ASSET, AND CLEANUP PROCEDURE REQUIRED.**

No production upload was performed. Consequently, Phase 22 has no valid record of:

- an upload request or resulting record ID;
- a private original object/path;
- a processing-job ID;
- status transitions or timestamps;
- worker pickup and completion;
- generated preview/derivative IDs and URLs;
- publication state;
- supported cleanup completion.

The anonymous `media_assets` relation-name probe did not expose that exact public relation, but this is not a substitute for authorized schema inspection or an approved functional upload.

## 10. Processing Worker

**Status: BLOCKED.**

No safe upload was initiated, no known job record was available, and no authorized worker logs were accessible. Worker execution, error handling, retry/backoff, idempotency, terminal failure behavior, and derivative generation were not inferred from code or architecture.

The three probed processing-table names were candidates only and cannot establish the worker's persistence model.

## 11. Private Media Isolation

**Status: BLOCKED — APPROVED GENERATED TEST FIXTURE REQUIRED.**

No approved private original existed for testing. Anonymous denial, different-user denial, owner-authorized retrieval, signed-URL scope/expiry, object-path isolation, and cache behavior were not exercised. An anonymously empty bucket listing is connectivity evidence, not private-object isolation proof.

## 12. Public Derivative & CDN

**Status: BLOCKED — APPLICATION-GENERATED DERIVATIVE REQUIRED.**

No worker-generated derivative or application CDN URL was available. Public marketplace images observed on the homepage and discovery page use `images.pexels.com`; those external images are not evidence of this application's upload, derivative, storage, or CDN pipeline.

Neither the Netlify application origin nor external Pexels URLs were counted as CDN proof.

## 13. Collections

**Status: BLOCKED; read-only shape evidence obtained.**

Corroborative anonymous-role evidence established:

- three anonymously count-visible `collections` rows;
- `collections.creator_id` and `collections.is_public`;
- nine anonymously count-visible `collection_items` rows;
- `collection_items.collection_id` and `collection_items.design_id`;
- resolvable relationships from collection items to both collections and designs.

The fields `collections.user_id`, `collections.owner_id`, and `collections.visibility` do not exist under those exact names.

No collection was created or edited. Creator ownership, public/private filtering, item insertion/removal, duplicate handling, owner access, cross-owner denial, and deletion/cleanup remain blocked. The anonymous counts alone cannot distinguish intended public visibility from missing or incorrect RLS.

## 14. Marketplace

**Status: FAIL.**

### Reachability and anonymous protection

- `/fa` and `/en/discover` rendered production marketplace content.
- The deployment-specific `/en` URL rendered the expected application.
- Login/signup forms rendered.
- Anonymous creator-dashboard access redirected to login with a return target.
- No tested public route returned HTTP 5xx.

### Direct functional failures

| Route/behavior | HTTP | Observed production result | Status |
|---|---:|---|---|
| `/en/designs/mediterranean-bloom` | 200 | UI displays `Failed to load design. Please try again.`; RSC source serializes `NEXT_NOT_FOUND` | FAIL |
| `/en/artists/elena-marchetti` | 200 | UI displays `Failed to load artist profile. Please try again.`; RSC source serializes `NEXT_NOT_FOUND` | FAIL |
| Homepage artist cards | 200 page | All inspected artist-card links target Elena's slug | FAIL |
| `/en` locale/direction | 200 | English content is wrapped by Persian RTL outer state | FAIL |

The detail routes are soft failures: HTTP 200 does not make the user journey functional. Discovery displayed six designs, but its media came from Pexels and does not prove database-to-derivative behavior. Authenticated marketplace behavior remains blocked.

## 15. API Security

**Status: BLOCKED overall; unauthenticated denial subset passed.**

The protected production endpoint `POST /api/creator/designs` was exercised only with requests that could not authorize a write:

| Test | Payload/auth | Actual production response | Status |
|---|---|---|---|
| Missing authentication | JSON `{}`, no auth | HTTP 401, JSON `not_authenticated` | PASS |
| Invalid bearer | JSON `{}`, deliberately invalid bearer | HTTP 401, same generic JSON `not_authenticated` | PASS |

The current same-origin browser probe observed approximately 194 ms and 307 ms for those two responses. No stack trace, token detail, SQL text, or internal path was returned by the application endpoint.

A valid-session invalid-payload test was not possible, because authentication correctly short-circuits first. Ownership denial, cross-owner mutation, MIME/size validation, malformed authenticated input, expired-token behavior, rate limiting, and broader endpoint coverage remain blocked. Detailed PostgREST invalid-column diagnostics were visible during schema probes, but no secret value was included.

## 16. Runtime Verification

**Status: BLOCKED for logs; FAIL for the observed detail-page runtime behavior.**

Direct public requests revealed the design and artist load failures in Section 14. The routes returned HTTP 200 instead of 5xx, so status-only monitoring would miss both defects.

The following were not available:

- Netlify function/runtime logs;
- Supabase database/Auth/Storage logs;
- worker execution and retry logs;
- authenticated callback/session traces;
- a complete browser-console, hydration, and failed-request capture.

No claim is made that production logs are clean.

## 17. Environment & Secret Exposure

**Status: NOT VERIFIABLE overall; limited public scan passed.**

A secret-safe browser scan covered the rendered public HTML plus six same-origin scripts, totaling 423,451 characters. It found zero occurrences of these high-risk markers:

- private-key PEM marker;
- `SERVICE_ROLE_KEY`;
- `DATABASE_URL`;
- `DATABASE_PASSWORD`;
- `NETLIFY_AUTH_TOKEN`;
- `AWS_SECRET_ACCESS_KEY`;
- `sk_live_`.

A separate deployed client chunk contains the expected public Supabase project URL and client credential. The credential decoded to role `anon`, not `service_role`; its value is omitted. A public anon credential is client configuration, not privileged evidence.

The scan was not an authorized readback of Netlify or Supabase environment configuration and was not a mathematical scan of every possible lazy bundle or response. Production secret placement, redirect allowlists, server-only environment presence, and platform configuration therefore remain not fully verifiable.

## 18. Performance Sanity

**Status: PASS for one lightweight sample only.**

A same-origin browser used cache-busted, `no-store` GET requests and Resource Timing. The measurements are one remote-vantage sample, not an SLA, load test, or end-user field measurement.

| Route | HTTP | TTFB | Total | Wall time |
|---|---:|---:|---:|---:|
| `/fa` | 200 | 198 ms | 200 ms | 203 ms |
| `/en/discover` | 200 | 146 ms | 202 ms | 208 ms |
| `/en/designs/mediterranean-bloom` | 200 | 1,164 ms | 1,165 ms | 1,170 ms |
| `/en/artists/elena-marchetti` | 200 | 1,179 ms | 1,181 ms | 1,184 ms |

All four requests completed without timeout or HTTP 5xx. The design and artist responses are nevertheless functionally failed pages, so acceptable transport timing does not make them marketplace passes.

## 19. Production Data Safety

No production account, database row, storage object, collection, design, media asset, processing job, migration, policy, secret, environment variable, deployment, or customer record was created, modified, or deleted.

The only POST requests used missing or deliberately invalid authentication and returned HTTP 401. No valid production identity was used. Read-only table probes used zero-row payload limits; exact counts came from response headers.

## 20. Files Modified

Only this verification report was added:

`docs/phase-22-live-functional-verification.md`

Temporary probe pages, URLs, package artifacts, and the local probe server were removed/stopped before completion. No application source, UI, schema, migration, authentication logic, RLS/storage policy, worker, CDN configuration, or deployment configuration was modified.

## 21. Full Production Verification Matrix

| Area | Status | Evidence | Notes |
|---|---|---|---|
| Deployment | PASS | Production alias and deployment-specific URL responded; Phase 21 recorded ready deployment metadata | Exact commit association was not independently readable in Phase 22 |
| Supabase | BLOCKED | Live project identified; Auth/PostgREST/Storage responded under anon role | Privileged database and bucket inspection unavailable |
| Schema | BLOCKED | Partial live relation, column, relationship, and anon-count evidence | Full schemas, constraints, grants, policies, and private objects unavailable |
| Migrations | BLOCKED | No authoritative remote history | No migration was applied or inferred |
| Authentication | BLOCKED | Forms render; Auth health/settings respond; dashboard redirects anonymous users | No approved test account for lifecycle/session checks |
| Creator System | BLOCKED | Creator ownership fields/relationship observed; anonymous dashboard protected | Approval and authenticated dashboard/API behavior untested |
| RLS | BLOCKED | Anonymous-visible counts and empty visible bucket list recorded | Owner and different-user evidence absent; RLS enablement not inferred |
| Upload Pipeline | BLOCKED | No approved production upload | Account, asset, IDs, transitions, URLs, and cleanup evidence absent |
| Worker | BLOCKED | No approved job or authorized logs | Execution, errors, retries, and idempotency unverified |
| Private Media | BLOCKED | No approved private original | Anonymous/non-owner/owner isolation untested |
| CDN | BLOCKED | No application-generated derivative URL | Netlify and Pexels URLs excluded as proof |
| Collections | BLOCKED | Live ownership/visibility/item shape and anon counts observed | Creation, ownership, visibility mutation, and cross-owner denial untested |
| Marketplace | FAIL | Direct design and artist load failures; incorrect artist links and RTL state | Public reachability alone passed; authenticated flow blocked |
| API Security | BLOCKED | Missing and invalid auth both returned generic HTTP 401 | Authenticated invalid-payload and ownership-denial tests unavailable |
| Runtime Logs | BLOCKED | Public functional errors observed | Netlify, Supabase, Auth, browser, and worker logs unavailable |
| Environment Security | NOT VERIFIABLE | Limited public HTML/bundle marker scan passed; client credential is anon-role | Authorized environment readback and exhaustive lazy-bundle coverage unavailable |
| Performance | PASS | Fresh status/TTFB/total sample for four requested routes | Single remote-vantage sanity sample only; failed page content still fails functionally |

## 22. Blocking Issues

| Area | Missing prerequisite | Why it blocks verification | Required action | Production data affected so far |
|---|---|---|---|---|
| Supabase/schema/migrations/storage | Authorized read-only production access | Full remote state and migration history cannot be inspected | Provide secure read-only access | No |
| Authentication/creator/RLS | Approved owner/creator account plus a separate non-owner account | Lifecycle and ownership boundaries require real sessions | Designate dedicated test identities and cleanup rules | No |
| Upload/worker/private media/CDN | Approved harmless asset and supported cleanup path | The critical pipeline requires a controlled production write | Approve asset, account, and cleanup procedure | No |
| Runtime/logs | Authorized Netlify/Supabase/worker log access | Browser symptoms cannot establish server/worker root cause | Provide read-only log access for the test window | No |

## 23. Remaining Tasks

| Task | Required access | Safe execution condition | Evidence to capture |
|---|---|---|---|
| Inspect full schema, storage, and remote migrations | Authorized read-only Supabase access | No DDL, policy changes, resets, or writes | Schema objects, grants/policies, buckets, migration versions/pending state |
| Run complete authentication lifecycle | Dedicated approved test account | No customer account; tokens remain secret; cleanup confirmed | Signup/login, persistence/refresh, logout, invalid/expired session |
| Verify creator approval/dashboard/API permissions | Approved creator account | Test-only identity and fixtures | Approval state, dashboard data, owner API success/denial |
| Execute three-role RLS matrix | Owner plus separate non-owner | Test-only fixtures; no customer record access | Anonymous/owner/non-owner reads and writes for each resource |
| Execute upload-to-CDN flow | Approved account and temporary asset | Reversible supported workflow and cleanup | Record/object/job IDs, statuses, timestamps, worker logs, derivatives, URLs |
| Verify private media isolation | Same approved fixture/accounts | Signed access only; no public original exposure | Anonymous denial, non-owner denial, owner access, expiry/cache behavior |
| Verify collection mutations | Approved creator and non-owner | Temporary collection/items with cleanup | Create/read/update/items/visibility/cross-owner denial |
| Inspect runtime logs during the flows | Authorized platform log access | Read-only, bounded test window | Netlify, Auth, database, Storage, worker, retry, and error evidence |
| Diagnose direct marketplace failures | Production owners and appropriate logs | Read-only diagnosis first | Root cause for `NEXT_NOT_FOUND`, artist links, and locale direction |

## 24. Final Recommendation

**BLOCKED — PRODUCTION VERIFICATION INCOMPLETE**

Do not declare `PRODUCTION VERIFIED`.

The production deployment is reachable, limited anonymous Supabase connectivity/schema evidence was collected, unauthorized API requests were denied, and the requested lightweight timing sample completed. However, every critical authenticated or mutation-dependent area still lacks direct authorized evidence: authentication, creator approval/access, owner/non-owner RLS, upload, worker, private media, generated derivatives/CDN, collection mutations, and runtime logs.

In addition, the direct design and artist detail flows currently fail for visitors and should be treated as production defects. Complete the blocked tests only after the four prerequisites in Section 22 are supplied, and re-run the failed marketplace routes after diagnosis or remediation.
