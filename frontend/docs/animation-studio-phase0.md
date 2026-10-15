# Animation Studio / Production OS — Phase 0

This is a canonical **domain and persistence foundation**, not a generation product, new UI, renderer or provider integration. The sample is an original abstract “Orbit” scene with no pilot-brand assumptions. Stop here before Phase 1 execution integration.

## Placement and existing architecture

The host is the existing Next.js 16.1.6 / React 19 / strict TypeScript application. The correct new boundary is `src/lib/codexforge/animation-studio`. Existing `creative`, `jarvis-video` and release-candidate studio maps are planning/preview surfaces, not persistent production authority. Their simulated completion, estimates and capability catalogs are deliberately not imported.

The server store reuses the committed Creator native filesystem (`CreatorNativeRoot`), its retained Windows handles and atomic exclusive/compare-and-replace operations. It also reuses the existing canonical JSON/hash functions and duplicate-JSON-key parser. Those imports do not dispatch providers. No dependency, package installation, existing native behavior or native root policy was changed. There are separate pure and server-only entrypoints.

## Domain and manifests

`domain.ts` defines StudioProject, Sequence, Shot/ShotManifest, Asset/AssetManifest, Character, Environment, Rig, Generation, Render, QCResult, Approval, Prompt, Model, CostRecord and Job, plus references, money, provenance, routing decisions, capabilities and audit events. Stable IDs use typed entity prefixes and canonical lowercase ASCII suffixes. A caller chooses an ID once and retains it across requests; durable idempotency keys prevent duplicate adoption. Schema version 1 is explicit and unknown versions fail closed rather than being silently migrated.

Shot manifests include story purpose, timing, dimensions, identities, camera/light/action/dialogue/audio, continuity, method/engine preferences, asset/dependency references, status, approvals, estimates/actual costs, attempts, selection, QC and notes. Runtime checks include useful path/code/message errors, required/exact fields, finite bounded numbers, resolution/aspect consistency, dialogue timing/speakers, duplicate references, safe IDs and project-currency binding at persistence.

`validation.ts` provides runtime validators for every canonical entity and supporting policy/adapter shape; TypeScript is not the boundary. Inputs become detached validated copies. It rejects accessors, custom prototypes, symbols, sparse arrays, cycles, prototype-related keys and excess data. JSON cloning is bounded to depth 12, 20,000 values, 2,048 array entries, 128 object keys, 16,384 characters per string and 262,144 aggregate text characters. Server JSON parsing additionally rejects BOM, duplicate/escaped-equivalent keys, more than 32 syntax levels and more than 1 MiB before invoking the existing recursive parser. Persistence requires canonical UTF-8 bytes and verifies record/audit/content hashes on load.

Synthetic bootstrap objects live in `sample.ts`; machine-readable examples are in `docs/examples/animation-studio-phase0/`. A sequence begins empty; `saveShot` atomically adds its shot membership. Phase 0 registers immutable shot revisions and definitions; a later explicit editing/version-migration command is needed for those objects. No silent mutation of approved inputs is provided.

## Asset versions, provenance and rights

Asset registration takes a validated manifest plus explicit bounded bytes. The hash, project, stable ID, version and canonical path must agree. Files are written exclusively, never replaced. A new version extends the latest version and must reference its predecessor in lineage. Approved versions and original bytes remain unchanged; successors are discoverable through newer lineage records rather than rewriting an approved old manifest's `supersededBy`. That field remains null in newly registered immutable records.

Provenance records parent/reference assets, prompt reference, negative prompt, timestamp, exact cost, hash, job, approval and rejection reason. Provider/model/settings/external generation/provider-job IDs belong to `adapterMetadata`, not provider-specific canonical entity fields. Applicable prompt/job references must resolve within the project. Approved assets require cleared rights (owned, licensed or public domain); licensed assets require license and evidence records. These declarations remain operator-supplied evidence, not an automated legal verification.

Phase 0 bounds each stored asset and project aggregate to 1 MiB. Large production media/chunking/storage adapters are a separate phase; this batch neither renders nor pretends to support production-scale media ingestion.

## Persistence, atomicity and recovery

`openStudioRepository` requires an explicit workspace: `development`, or `test` with a unique safe namespace. Importing the module creates nothing. Development data is under `.codexforge/studio-development`; tests use `.codexforge/studio-tests/<namespace>`. Neither selects existing Private Alpha/Creator production data. No application route instantiates the store automatically.

One bounded project aggregate contains project metadata, sequences, shots, asset-version manifests, definitions, jobs, approvals, QC, costs, idempotency receipts and ordered audit events. A mutation, its receipt and its event publish as one native compare-and-replace transaction. Concurrent stale publication fails closed; callers can retry an exact idempotency key, never silently overwrite. Exact replay returns the original recorded result; different inputs with the same key fail.

Asset bytes publish exclusively before aggregate adoption. A crash between these operations may leave an unadopted content-addressed file. A subsequent explicit exact registration may adopt identical bytes; different bytes cannot replace it. Phase 0 performs no orphan deletion. Project records remain the authority for adopted assets.

Windows native handle protections and CAS are reused rather than implementing another lock/atomic-file system. Other platforms fail closed until a reviewed storage adapter exists. The single-project JSON limit is intentional; no database or background worker was installed.

## Job lifecycle

All seven states are modeled and validated: QUEUED, RUNNING, WAITING_EXTERNAL, WAITING_APPROVAL, SUCCEEDED, FAILED, CANCELLED. Jobs record dependencies, attempts/ceiling, lifecycle times, inputs/outputs, error, checkpoint, estimates/actual costs and scoped approval. Provider job identity is `adapterMetadata.providerJobId`.

Creation is unexecuted QUEUED state. Explicit start checks dependencies, scope, mandatory gates, external policy, cost reservation and attempts before recording RUNNING. External work records its unique dispatch intent/token **before any future adapter could be called**. This module contains no adapter invocation. Missing effect classification blocks non-QC work; generation and paid effects cannot be hidden by omitting their classifications.

`recoveryPlan` only reads durable state: terminal completed/cancelled work returns NONE; unresolved external intent returns RECONCILE_EXTERNAL; active local work returns RESUME_LOCAL_CHECKPOINT. It never starts a worker, calls a provider or retries. External results must match the persisted dispatch token; WAITING_EXTERNAL also requires provider-job identity. Terminal jobs cannot be overwritten or restarted. Failed-job automatic retries are deliberately absent even though maximum attempts are represented for later explicit policy-bound orchestration.

QC is the local classification supported without external effects. Other effect classifications are explicit ledger admission, not proof of engine availability, actual execution, content quality or successful rendering. Tests recording synthetic external completion are not live acceptance evidence.

## Approvals and costs

GATE_01 BRIEF_LOCK → GATE_02 STORYBOARD_LOCK → GATE_03 CHARACTER_LOCK → GATE_04 SHOT_MOTION_LOCK → GATE_05 ROUGH_CUT_LOCK → GATE_06 PICTURE_LOCK → GATE_07 SOUND_LOCK → GATE_08 MASTER_LOCK.

Downstream requirements include all upstream gates. Decisions bind exact project manifest/asset scope, explicit actor and time. Missing/rejected/stale/conflicting decisions block; changing an upstream approval invalidates older downstream approval. New manifests/assets invalidate the previous scope. Decisions are append-only. Production job types have mandatory minimum gates that callers cannot remove. Cost approval and creative approval are not interchangeable.

Money uses safe integer minor units plus currency—never floating-point billing. Unknown/omitted/malformed amounts fail closed instead of being treated as free. MAX_SHOT_GENERATION_COST, MAX_PROJECT_GENERATION_COST and MAX_ATTEMPTS_PER_SHOT are evaluated deterministically as ALLOWED, REQUIRES_APPROVAL or BLOCKED. Equality is allowed; overflow, currency mismatch and exhausted attempts block. A boolean cannot authorize excess spending. There is no billing or overage-authority integration.

Reservations retain conservative cost estimates; reported actual cost is cumulative, currency-bound and cannot decrease. The ledger records reservations and actual reports. Subsequent admission counts at least the higher of each attempted job's estimate and actual cost, preventing a later report from releasing spent budget.

## Routing and adapters

The pure rule engine covers GENERATIVE, RIGGED, 3D, 2_5D, LIVE_ACTION and HYBRID and all 13 requested engine capability identifiers. Stable method/engine preferences are eligibility rules, **not installation claims**. An adapter must supply fresh capability observations with method support and evidence; no observation defaults to installed. The caller supplies the clock, and observations expire after 24 hours. Missing, stale, future, conflicting or incompatible observations block or yield an explained observed fallback. EXACT identity cannot be routed into a generative engine; a rigged fallback requires an explicit selection and fresh evidence. Routing returns method, engines, fallbacks, codes, requirements, blocked capabilities and priority, but no execution authority.

GenerationProvider, AnimationProvider, DccProvider, CompositorProvider, EditorialProvider, AudioProvider and DeliveryProvider are interfaces only. There are no Higgsfield, Adobe, Blender, FFmpeg or network implementations. Future adapters must preserve canonical contracts, supply capability evidence and require fresh job/gate/cost/effect admission before dispatch. They must reconcile persisted external intent and provider IDs after a restart instead of blindly resubmitting.

ExternalExecutionPolicy defaults are frozen: externalGenerationEnabled=false, paidGenerationEnabled=false, adobeAutomationEnabled=false, blenderRenderEnabled=false. Disabled or malformed policies return structured blocking decisions. Tests may enable a flag only to verify synthetic intent bookkeeping; no adapter is called.

## Paths and audit

One resolver owns `studio/projects/PROJECT_ID/` and the requested brief, bible, storyboards, asset categories, rigs, generation, Blender, After Effects shots/master, Premiere, audio, review, renders, masters, manifests, QC and logs areas. All paths are portable relative paths; native retained handles resolve physical files. Asset files use `<area>/<assetId>/v<version>/<sha256>.bin`, keeping each component within the existing native bound. Traversal, absolute paths, Windows device names, alternate streams and invalid segments fail closed.

Events include project/sequence/definition/shot creation, asset registration/version, routing, job lifecycle/blocking/checkpoints, approvals and QC. Each event records sequence, actor, subject, exact request/result, time, previous hash and event hash. State, audit and receipts advance together. Hashes detect corruption; they are not a substitute for trusted operating-system permissions or a cryptographic signature against a malicious operator who can rewrite all data.

## Verification and next boundary

Run from `frontend`: `npm run native:build`, `npm run test:studio`, `npm run typecheck`; lint the new module and two `.mjs` test scripts using the repository ESLint configuration. The source-only test loader transpiles actual TypeScript and retains real native storage; only Next's `server-only` marker is replaced. Network APIs are blocked. Test data, corruption originals and restart evidence are preserved under unique ignored test/evidence roots.

The suite contains 14 cases covering all requested minimum behaviors, with nested negative checks for malformed JSON/manifests, capability freshness/conflicts, all eight gates, exact cost limits, effect-policy denial, all seven job states, process restart, idempotency conflicts, approved-version bytes/lineage, cumulative-cost regression, bad references and corrupted storage. Fresh validation and build outcomes belong in the durable acceptance report; pre-existing or intermediate failures must be retained there.

Recommended Phase 1 is an explicitly authorized local-only operator/API slice for synthetic projects, scoped edit/version commands and dry-run adapter conformance. Keep external generation, paid work, Adobe automation and Blender renders disabled. Real adapter execution, large-media storage, capability probing, platform support, visual QC and business pilot work each need their own bounded acceptance. No commit, tag or push is part of Phase 0.
