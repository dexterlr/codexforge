# CodexForge local-first Jarvis website creation integration

## Status

Phase E1 connects the canonical `/jarvis` conversation experience to the existing bounded Website/Browser App creator. The integration is local-first, manually gated, replay-safe, and fail-closed. It does not deploy a website publicly.

The canonical routes remain:

- `/jarvis` for the conversation and explicit creator handoff;
- `/jarvis-websites` for the full creator workspace;
- `/athena` and `/ai` as redirects to `/jarvis`;
- `/jarvis-chatbot` as a retired planning-only shell redirected to `/jarvis` after its useful planning intent was migrated.

Projects, Assets, Providers, Workflows, Trading, Audit, Safety, Files, Patch Review, and Validation retain their existing routes and ownership.

## Conversational handoff

Jarvis never treats assistant prose as creator authority. A person explicitly selects one persisted user message, reviews the exact source text, and chooses whether it describes a new Website/Browser App or an explicit revision of an existing validated project.

The review surface visibly presents:

- the exact selected user message and its bounded provenance;
- editable project title and creator or revision brief;
- whether a new project or an existing artifact revision is targeted;
- the provider `ollama-local`;
- canonical model key `ollama-local::gpt-oss:20b` and installed model `gpt-oss:20b`;
- local-machine data boundary;
- maximum output of 4096 tokens;
- provider token charge estimate of USD 0.00, with local resource cost explicitly unmetered;
- no automatic approval or hidden execution;
- no automatic retry;
- no fallback;
- no model substitution;
- no credential lookup, model download, or cloud provider.

Preparing the handoff creates only a visible creator plan. It does not approve a plan, bind or approve a run, execute a provider request, validate output, start a preview, repair, export, or deploy.

## Integrity and ownership boundary

Chat and Creator remain separate immutable aggregates with disjoint Private Alpha ownership. A third bounded handoff record coordinates them without adding hybrid run ownership or making either aggregate trust client-asserted provenance.

The handoff service verifies the exact conversation, turn, user message, message digest, and immutable source revision on the server. It records a durable intent before invoking Creator with a server-derived creator-domain idempotency key. Exact replay returns the same handoff and project. Reusing a key for different content fails with a conflict. Repeating the same semantic handoff with another key resolves to the existing project rather than creating a duplicate.

The handoff contains only opaque identifiers, bounded visible text digests, request digests, timestamps, and resulting project identity. No assistant response, hidden conversation context, memory, provider envelope, credential, model output, artifact file, or full prompt appears in a URL.

Deleting the source conversation removes its display/history under the established chat deletion contract. Any already committed Creator project, handoff audit record, or separately retained bounded Private Alpha provenance remains independently owned and is not falsely described as erased.

## Plan and generation approvals

A project prepared through the Jarvis handoff begins at `awaiting_plan_approval`. At that point the request and visible plan are durable, but no Private Alpha run exists. The published direct `/jarvis-websites` create journey remains compatible with its existing creator-owned generation-approval boundary.

The lifecycle is deliberately separated:

1. `approve-plan` records a durable plan-approval intent, binds the one exact creator-owned generation run, and reaches `awaiting_generation_approval`.
2. `approve-generation` records manual approval for that exact run and scope.
3. `execute-generation` is a separate explicit action and authorizes at most one provider attempt for that run.
4. The complete provider response is parsed as bounded page content and non-HTML assets. CodexForge constructs the only document shell before running the unchanged deterministic creator validation stages.
5. Only a valid, safely materialized immutable bundle can reach `ready` and become eligible for preview.

Malformed, secret-like, unsafe, policy-violating, or oversized output is rejected without publishing a previewable artifact. Provider unavailability or an unavailable exact model fails visibly without fallback or substitution.

## Explicit revisions and validation repair

An explicit user revision is not disguised as validation repair. The person chooses an existing project and exact published artifact revision, reviews a bounded revision brief, and prepares a visible immutable revision plan. Preparing it creates no run.

The revision lifecycle uses separate actions for revision-plan approval, revision-generation approval, and revision execution. Each revision owns its exact creator Private Alpha run and publishes a complete replacement bundle only after full validation. Prior validated artifact revisions, materialization evidence, run bindings, revision requests, and audit events remain immutable and inspectable.

Every revision and source-bound repair rereads the exact immutable published files and builds a canonical visible source snapshot; source content is neither truncated nor replaced by hashes alone. Generic Private Alpha and Jarvis chat requests retain their 8,000-character ceiling. Only creator-owned revision and repair requests may use the bounded 131,072-character local envelope, and those exact Ollama requests set a 131,072-token context window that matches the admitted installed model metadata. The output ceiling remains 4,096 tokens. Oversized source context fails before run binding or provider access.

Validation repair remains a separate, bounded lane driven only by persisted validation evidence. It cannot be used as an unreviewed general feature request.

## Server-owned document topology

Provider output does not own `html`, `head`, `body`, `main`, the primary `h1`, metadata, stylesheet tags, or script tags. The server-owned page contract accepts bounded plain heading data, structurally parsed content fragments, and a strict sorted inventory of non-HTML assets. Document-shell and landmark elements are reserved and rejected inside every untrusted fragment.

CodexForge deterministically constructs the sole `index.html` with one canonical `html/head/body` topology, UTF-8 metadata, the exact viewport `width=device-width, initial-scale=1`, one `main`, and one escaped primary `h1` inside that `main`. Local stylesheet and script tags are derived only from the validated asset inventory. The completed canonical bundle still passes every existing path, size, HTML, code, resource, security, accessibility, preview-readiness, and manifest validator; none is weakened or bypassed.

Legacy bundle instructions and persisted request digests remain frozen for exact replay. New generation, revision, and provider repair runs are explicitly bound to the server-owned page response contract. Each completed construction persists its canonicalizer version, ordered operations, input and output hashes, bundle digest, and transformation digest in run and publication provenance.

One separate `repair-document-topology` mutation can reprocess only a narrowly eligible retained legacy response: the original project must remain `rejected_output`, the exact creator-owned local run and response hash must still exist, no publication may exist, and structural parsing must prove one unambiguous known topology-only defect. The retained shell must have the exact canonical metadata sequence, only `lang` on `html`, and no attributes on the discarded `head`, `body`, `title`, `header`, `main`, `footer`, or primary-heading nodes; otherwise reprocessing fails closed instead of silently dropping semantics. The action is explicitly operator-authorized, records `providerRequests: 0`, is never automatic, creates no run, and cannot call availability, generation, fallback, substitution, cloud, credential, or download paths. It durably records intent before publication, is idempotent and concurrency-fenced, and retains the rejected source revision and raw provider evidence unchanged.

## Stop, recovery, and replay

Stop is fenced at the creator-owned Private Alpha provider-start boundary. If Stop is durable before provider admission, availability and generation are never called. If an already admitted provider attempt finishes after Stop, its output is not published as a successful creator revision.

Every mutation records its durable intent before the external lifecycle step. Refresh or restart reloads the exact aggregate and bounded handoff summaries. A `preparing` handoff does not pretend its Creator project is ready: the person must first reveal and review the exact persisted request, then separately choose to resume its sealed plan-only operation. That resume reuses the server-derived Creator key and cannot approve or execute. A confirmed bounded client error is retained as `failed`; an ambiguous storage or response-loss outcome remains explicitly recoverable instead of falsely claiming failure.

Explicit Creator recovery reconciles a previously authorized run and never starts a second provider attempt. Idempotent retries return the canonical recorded result; different ownership, target evidence, or content fails with a bounded conflict. Revision review binds the exact ready Creator state revision, artifact revision, manifest digest, aggregate digest, validation digest, and existing run-binding digest so refresh or a concurrent project change cannot silently retarget the request.

If a later revision or repair is rejected, fails, or stops after an earlier validated publication exists, the person may explicitly restore that exact prior publication to the ready state. Restoration rereads its immutable files and validation evidence and performs no provider request, retry, preview start, export, or hidden approval; the unsuccessful attempt and all revision, repair, run, and audit history remain visible.

## Preview and success criteria

A safe preview exists only when all of the following are true:

- the provider result parsed as the exact response contract and the server constructed the canonical document shell;
- deterministic validation completed successfully;
- immutable materialization and file hashes were published atomically;
- the preview service reread and verified that exact manifest and revision;
- the kill switch remained clear at every required boundary.

The UI never labels planning, approval, generation, validation, rejection, repair, stop, or failure as success. It distinguishes planning, awaiting plan approval, awaiting generation approval, generating, validating, preview ready, rejected output, repairing, stopped, and failed.

## Validation and acceptance evidence

Release evidence for this phase must include:

- fresh PowerShell parsing and TypeScript validation;
- deterministic handoff, replay, concurrency, restart, malformed-output, oversized-output, cancellation, stop, revision, repair, isolation, and idempotency coverage;
- focused chat, Creator, routing, Private Alpha, and historical regression gates;
- desktop and mobile Browser evidence from a verified CodexForge loopback process on a fresh port;
- zero unexpected external requests, console errors, hydration failures, horizontal overflow, duplicate IDs, or inaccessible controls;
- the authorized controlled local `gpt-oss:20b` acceptance epoch is preserved exactly, including every failed result and provider-request count;
- the final full-validation wrapper and independent read-only review.

If the exact local model is unavailable, the controlled acceptance must report that safe failure honestly and must not substitute another model or provider.
