# Phase 2B.1D — single-request estimate wire

The estimate-only transport uses Node core HTTPS, not Fetch. Node 24.13.0's bundled Undici 7.18.2 can internally repeat a replayable POST on HTTP 421; a single application call was therefore insufficient evidence of one HTTP request.

## Boundary

Exact estimate authority → exclusive durable estimate claim → fenced attempt → transient single-use permit → validated request construction → irreversible transport entry → one core request and one end(body) → existing canonical result handling.

The wire accepts only the pinned server-side HTTPS estimate endpoint. It does not accept a client-selected URL, method, headers or dispatcher. The existing credential parser and exact request serialization/digest are unchanged. No generation capability is added.

One-shot requests use agent:false, autoSelectFamily:false, a 16 KiB response/header bound, a 30-second absolute deadline and the lifecycle abort signal. No redirect following, retry, fallback endpoint, Fetch or SDK is involved. One agent/socket is closed when the response completes or the request fails.

Before entry, canonical URL/options, credentials, core header encoding, body and abort state are checked. Node HTTP/HTTPS/network/stream debug modes fail closed to prevent standard runtime diagnostics from printing Authorization. Only diagnostic enabled flags are inspected; raw environment values are not exposed.

After the irreversible entry, uncertain delivery stays ATTEMPTED/RESULT_UNKNOWN with reconciliation required and retry disallowed. HTTP 421 and redirects 301/302/303/307/308 are definite first responses: FAILED, original safe status preserved, no follow or retry. The pure client report validator recognizes exactly those redirect failures as well as 4xx/5xx; other inconsistent reports still fail closed.

## Tests and provenance

- test-animation-studio-phase2b1d-wire.mjs --focused validates source routing, SSRF/options, zero-request pre-send failures, Unicode header rejection, synthetic debug-mode secret protection and generation locks.
- The same script's --matrix mode uses actual owned HTTP and HTTPS counting servers. The server-owned connector changes only the network destination to a unique numeric loopback listener; production validation, single-request construction, body/end call, response handling and instrumentation remain real.
- Tests record invocation, factory, socket assignment, end and server-received counts. Both HTTP 421 cases leave the listener open for 500 ms after the outcome to detect a second request. Redirects point to a forbidden follow-up path and must not reach it.
- The HTTPS test creates and trusts one ephemeral synthetic certificate in memory. Production TLS verification is not relaxed.
- test-animation-studio-phase2b1d-lifecycle.mjs integrates actual local wire behavior with native authority/claim/attempt persistence, double-click exclusion, second-process/restart recovery and injected post-response publication failure.
- A private WeakSet identifies core-wire observation callbacks so test connectors exercise the same pre-entry boundary as production. This identity is not an execution capability; the canonical permit/claim remains mandatory.
- Old injected fake wires keep their historical observation semantics. These tests are distinct from server-observed wire counts.

The first focused invocation was preserved as FAIL because its test guard blocked literal-IP listener setup. The corrected guard allows only 127.0.0.1 lookup during the owned listen call; other DNS/network remains blocked. No provider call occurred.

No UI change is part of this repair. Exact per-run counts, source hashes, process closure and canonical build evidence belong to the fresh Phase 2B.1D acceptance checkpoint.

## Live acceptance is still separate

The preserved live fixture must remain PREPARED 0/1 with authorization/result/failure/dispatch null and both estimate/generation claims absent. All real provider counts stay zero during this repair.

The blocked Phase 2B.1C authorization was unused and is invalid after source repair. It must not be reused. Subsequent steps require the user's private server to be restarted/rebound from repaired source, a fresh zero-provider-request preflight, and a NEW explicit exactly-one estimate authorization. No automatic execution, generation, provider discovery or retry is permitted.

