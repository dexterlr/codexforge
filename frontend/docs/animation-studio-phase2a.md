# Phase 2A — Higgsfield local integration foundation

This implements the request's explicit **unsupported-interface fallback**. It is not live-generation acceptance. Local repository, package and available-tool metadata did not evidence a supported Higgsfield API, SDK or command. No provider request was made to discover one. Endpoint, authentication contract, credential naming, supported mode/model/settings, price and reconciliation mechanism remain unknown.

## Operator page

Open a saved project at `/animation-studio`, then choose **Open Generate workspace**. Its canonical route is `/animation-studio/projects/[projectId]/generate`. Initial load and refresh only read local saved data. **Inspect local generation plan** performs a read-only POST through the accepted Phase 1 HTTP/Host/Origin/marker/listener/JSON boundary, with exact project and shot revisions. No dispatch action exists. The banner states `LIVE DISPATCH NOT YET AUTHORISED`.

The server's single canonical request builder supplies the inspector and its SHA-256. It includes saved project/sequence/shot identities and revisions, prompt, inventory-bound reference versions/hashes, output intent and the one-attempt/no-retry ceiling. Mode/model remain null. Output dimensions and duration are shot requirements, not supported provider settings. This hash identifies the **canonical plan, not an unavailable provider payload**. There is no fabricated job ID or paid-request idempotency token.

Inspection compares the saved snapshot digest against the plan's source digest, rejecting a competing read rather than displaying mixed revisions. Approval scope derives from the same validated snapshot. It neither writes approvals nor grants authorization. Router evidence is empty: static Higgsfield generative eligibility is not capability proof, so routing honestly blocks. Unknown costs require a separately authorized exact-operation policy; no fictional amount is inserted into canonical Money records.

## Adapter and configuration

`generation-preparation.server.ts` implements the existing `GenerationProvider` interface. `discover()` is local and returns no capability observations. `execute()` validates input but always returns BLOCKED, including when a caller supplies permissive policy flags. Mapping, polling, retrieval and reconciliation cannot execute. There is no SDK, HTTP client, browser automation, endpoint, secret reader or provider invocation in this implementation.

Configuration accepts only the empty, unsupported configuration. Unknown fields, including credential-shaped values, fail closed with redacted status. Readiness separates NOT_CONFIGURED, NOT_EVIDENCED, UNKNOWN, NOT_VERIFIED and EXECUTION_DISABLED. Credential inspection is NOT_PERFORMED, not a claim that no credentials exist anywhere. No undocumented environment variable or credential field is invented.

Default external generation, paid generation, Adobe automation and Blender rendering remain false. No global unlock or automatic summary/worker behavior is added.

## Deliberately blocked follow-on contracts

These are required before live acceptance, **not implemented claims**:

- A legitimate, documented supported integration surface and one evidenced candidate mode, including non-secret request/response schemas.
- A scoped, persisted, human-authorized exact-operation record bound to project, shot, job, request hash, attempt, approval, expiry and consumption. Global flags alone cannot authorize dispatch.
- Canonical job intent persisted before send, at most one attempt, no automatic retry. A lost response must become ambiguous and require reconciliation, never imply permission to resend.
- Truthful unknown/known cost admission. Existing Job and Provenance use concrete Money; do not smuggle unknown pricing as zero. Any compatible canonical extension needs its own validation and migration review.
- Provider normalization and canonical Generation/Asset/Job provenance, bounded media intake and technical QC, immutable versions and explicit human review. The existing 1 MiB asset bound is not production-video storage support.
- Mock dispatch success/failure, single-use authorization, concurrency, restart intent, ambiguous submission, ingestion and QC tests through that evidenced contract, followed by separately authorized real acceptance.

Existing canonical job/asset/QC persistence is retained, not duplicated in a Higgsfield database. Phase 0 tests still exercise its synthetic bookkeeping, but do not prove the unimplemented Phase 2 provider lifecycle.

## Local validation

Run `node scripts/test-animation-studio-phase2a.mjs` from frontend. It creates a unique retained test/evidence namespace, uses real TypeScript/native persistence with blocked network APIs, and exercises readiness, unconditional adapter denial, canonical plan/hash/reference validation, actual routing, accepted HTTP boundary, stale and competing reads, duplicate inspection and refresh/reopen preservation. Synthetic IDs are `project_provider_test_001`, `sequence_provider_test_001`, `shot_provider_test_001`. They depict an original abstract moving circle with no client/person/brand/reference assets. One-second 512×512 intent is explicitly not provider-verified or priced.

Use fresh exact-source build and isolated loopback preview evidence for UI acceptance; never touch port 3000 or old acceptance outputs. No source-control publication is authorized. Final live-gate verdict remains **PHASE 2A NOT READY** until the evidenced surface and deferred execution safeguards are complete. The next action is to supply a non-secret supported integration contract for local review, not to send a generation or credential test.
