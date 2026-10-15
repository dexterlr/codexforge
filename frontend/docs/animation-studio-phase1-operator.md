# Animation Studio: local operator checkpoint

The canonical control panel is `/animation-studio`, under **Animation Studio** in the primary navigation. This phase adds planning records, not generation. Jarvis remains `/jarvis`; it does not silently acquire a generation capability.

## Supported operations

- Explicitly create a local project with an original, synthetic starter sequence and shot.
- Reopen saved projects, edit the brief and bounded shot planning fields, and save revision-bound changes.
- Keep previous project/shot values in immutable audit events. Shot changes clear derived output and approval state; metadata changes invalidate old approval scopes. Historical records are not migrated or rewritten.
- Check the saved shot's deterministic route. No capability observations are supplied, so the current sample reports missing Blender readiness. A dry run creates no job, cost, approval or provider request.
- Refresh the project list without replacing unsaved edits. Explicit reload/navigation guards protect drafts. Uncertain mutations retain the exact request and idempotency key for explicit retry; stopping the wait does not claim server rollback.
- The single-process local operator admits at most 100 projects. The 101st creation is refused before publication while existing reads, edits and exact replay remain available. This is not a cross-process workspace quota guarantee.

## Local-only HTTP boundary

The GET/POST endpoint is `/api/codexforge/animation-studio`. It is disabled unless the server sets `CODEXFORGE_STUDIO_OPERATOR_ENABLED=1`. Production workspace selection is not supported; this is not a check on `NODE_ENV`. Storage uses the existing native, atomic aggregate repository rather than a second persistence implementation. `CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE` selects an isolated synthetic namespace; absent this override, the development workspace is selected. The browser acceptance instance uses only `studio-operator-browser-20260913` under `.codexforge/studio-tests`.

Requests require the operator marker, an actual loopback listener, matching original URL/Host and (for POST) exact Origin, bounded strict JSON and explicit idempotency keys. Client-supplied actor, paths, currency, execution policy and unknown fields are rejected. Framework forwarding headers are accepted only when they independently agree with the loopback transport; they are never authority. Execution policy remains all false. There are no provider, render, approval-grant or job-start operations on this endpoint.

### Executable framework regression

The first browser read correctly failed closed because Next 16 normalizes `127.0.0.1` to `localhost` in its overridden `NextRequest.url` getter while preserving the literal original URL in the native Request slot. Native `Request` factory tests did not exercise that override and therefore missed the mismatch. The boundary now reads the original URL through the native `Request.prototype.url` getter and still requires exact Host/Origin agreement. It does not allow aliases or ignore mismatches. Operator tests exercise the installed `NextRequest` for GET and POST and reject mismatched localhost Host/Origin, wrong ports and external hosts. Actual browser creation and updates then succeeded.

## Verification and limitations

Run `npm run test:studio` and `npm run test:studio:operator`, plus source typecheck and focused lint. Each suite creates a fresh evidence root and retains synthetic test data. The operator suite tests denial, exact authority, bounded/invalid JSON, persistence, replay, conflicting edits, preserved notes, pure dry-run behaviour and sanitized failures. Browser acceptance is separate evidence: it exercises the actual Next transport, project and shot editing, saved refresh recovery and responsive layout.

This checkpoint is not a production deployment or real-generation acceptance. Production-build verification for the new panel and browser fault-injection of cancellation/uncertain retry remain separate gates. The Phase 0 build does not prove the newly added UI. The inherited navigation registry has an independently reproduced committed-baseline unused-variable warning; it is not hidden or suppressed here. See the Phase 1 acceptance handoff for exact fresh results, source hashes and process identities.

Future generation controls belong on this same page, only after bounded adapter, capability, cost and approval milestones are implemented and explicitly authorized for live execution. No Higgsfield, Adobe or Blender integration is enabled by this work.
