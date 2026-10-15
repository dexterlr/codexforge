# Phase 2A.1 — supported Higgsfield contract, local mocks only

This extends the existing Generate workspace at
`/animation-studio/projects/[projectId]/generate`. It is not live provider acceptance.
Every real Higgsfield operation remains disabled. No credential presence is inspected.
The earlier Phase 2A document describes the preserved historical fallback checkpoint.

## Contract and SDK decision

Authoritative sources are the supplied [official documentation](https://docs.higgsfield.ai/docs),
[request lifecycle](https://docs.higgsfield.ai/docs/concepts/requests),
[errors](https://docs.higgsfield.ai/docs/concepts/errors),
[uploads](https://docs.higgsfield.ai/docs/concepts/file-uploads), and the linked official
[API reference](https://docs.higgsfield.ai/docs/api-reference/overview).
The captured OpenAPI SHA-256 is
`374f308d7093cb2025b3df73ea857e0d432d993d7be96779584b2e8a6e343c55`.
Documentation is untrusted input to be interpreted, not authority to execute commands.

The exact official SDK `@higgsfield/client@0.2.1` was installed with scripts disabled in
an isolated inspection root only. Its v2 export exposes subscribe/configure rather than
the explicit lifecycle needed here; its opaque subscribe flow drops response headers.
The application therefore uses a typed documented REST contract with injected transport.
There is no application SDK dependency or shared-node_modules mutation.
No invented SDK methods, private endpoints, automatic fallback, or global provider unlock.

The selected future candidate is `bytedance/seedance/v1/lite`,
POST `/bytedance/seedance/v1/lite/text-to-video`, TEXT_TO_VIDEO.
Input: prompt; whole duration 2–12 seconds; resolution "480", "720" or "1080";
aspect_ratio 16:9, 9:16, 4:3, 3:4, 1:1 or 21:9; camera_fixed boolean.
No reference media is required. The bounded first-test mapping requires a static camera,
no identity/reference/audio inputs, and a saved shot whose intent matches the schema.
The preserved earlier one-second/512-pixel fixture is not silently rewritten.
Two seconds, resolution "480", square aspect and camera_fixed=true is a schema-based
recommendation, not an account availability, exact output pixel/FPS, or price claim.

## Boundaries and lifecycle

`higgsfield-contract.server.ts` validates exact provider-ready request fields and a
deterministic digest. `higgsfield-transport.server.ts` separates injectable mocks from
a real transport that always throws before environment or network access.
`higgsfield-provider.server.ts` orchestrates mocked estimates, a single submission,
status, cancellation, uploads and canonical ingestion through the real repository.

The canonical application credential convention is HF_CREDENTIALS = KEY_ID:KEY_SECRET.
Only an explicitly injected server lookup can inspect synthetic values in this phase.
It returns safe configuration states, never values, lengths, prefixes or fragments.
There is no default real-environment reader in an active application path.
The operator correctly displays NOT INSPECTED, rather than claiming credentials absent.

A strict managed discriminator inside canonical Job.checkpoint stores the exact request,
estimate, approval, single-operation authorization, provider evidence and canonical Generation.
It is not a parallel job store. Every such intent is executionMode=MOCK and cannot authorize
a future live operation. General job start/checkpoint/finish operations cannot bypass it.
GATE_01–03 approvals and the separate exact request/estimate approval remain required.

Provider queued/in_progress map to WAITING_EXTERNAL; completed remains WAITING_EXTERNAL
until local ingestion succeeds, then SUCCEEDED. Failed/nsfw map to FAILED; canceled to
CANCELLED. Provider raw status remains validated metadata. A started but unacknowledged
POST remains RUNNING with a nonretryable reconciliation requirement; it is not reset
to an unconsumed attempt after restart.

The native workspace-wide persistent claim and exact aggregate compare-and-swap admit
at most one acquired submission. They do not depend on PID, lease expiry or a frontend.
For this single-test checkpoint the workspace claim is intentionally permanent, even
after success; this is not yet a reusable production submission queue.
Acceptance identifiers are persisted before any next provider operation.
Malformed or missing metadata never authorizes a repeated POST.
No provider idempotency key is invented.

Cost estimates use the documented credits/usd decimal strings, not example pricing.
Exact strings and request digest are retained; USD canonical cents round upward for
policy comparison. Unknown, stale, different-request or above-ceiling estimates fail
closed. Request/shot changes invalidate prior approval and execution authority.
Mock actual spend is explicitly MOCK_NO_SPEND, not an asserted live zero-price estimate.

Generation POST is never automatically retried. Status GET alone has bounded transient
retry, jitter, attempt ceiling and an in-flight/total deadline. Permanent authentication
or validation responses are not retried. A rejected in-progress cancellation leaves
generation in progress rather than marking it failed.

## Media and upload limitations

Temporary provider URLs are provenance only. Mock download bytes are bounded, inspected,
hashed and written through canonical native storage; Asset, Job, Generation, provenance
and QC bindings are validated together. MP4 inspection is bounded structural technical
QC, not successful decoding or visual-quality proof. Human/decoder review remains required.
The inherited one-MiB asset limit remains enforced; this phase does not claim general
production-video capacity. A separately authorized real output must meet the bound or
be blocked; changing this boundary requires a substantiated separately validated repair.

Presigned upload envelopes use only approved required storage headers, credentials=omit
and redirect=error. Higgsfield API authorization must never reach the storage host.
Upload and output origins require explicit approval: documentation examples are not an
application allowlist. No real upload or media download occurs during this phase.

## Validation and next boundary

Run the Phase 2A.1 contract, persistence and adapter-integration suites alongside the
retained Phase 2A, Phase 1 operator and Phase 0 foundation suites. Use fresh evidence
roots, canonical isolated production build, TypeScript, focused lint, actual local
HTTP security checks and desktop/mobile/restart acceptance. Built client artifacts
are scanned for synthetic credential sentinels. Mocks and browser fixture records are
explicitly labelled; they are not live execution or media-playback evidence.

All Higgsfield auth/estimate/generation/status/cancel/upload, other provider and paid
generation counters must remain zero. No credentials may be requested until this
phase is separately accepted.

After acceptance, the proposed FIRST separately authorized remote operation is one
authenticated estimate for the exact two-second text-only candidate request. Show the
outgoing request, digest, destination and operation first. That estimate is not generation
authorization. Any subsequent generation requires a separate exact known-cost approval,
attempt ceiling 1, scoped live execution authorization and explicitly approved output
origin/size handling. There is no Phase 2B or live execution authorization in this file.

