# Phase 2B.0C: real estimate seam, local validation only

No live provider operation is authorized by this implementation or its tests.
Generation, paid generation, Adobe automation and Blender rendering remain off.

## Official transport

The Phase 2A.1 decision remains **OFFICIAL REST API**. Its retained official SDK
inspection (`@higgsfield/client@0.2.1`, isolated inspection only) found a subscribe
flow that did not expose the required explicit lifecycle and response headers.
No SDK dependency was added or installed. The retained official billing document
describes POST `/estimate/<model route>`, using the same model input and decimal
string `credits` and `usd`. The retained OpenAPI describes authentication as
`Authorization: Key <key-id>:<key-secret>` but has no model-specific estimate path.

The sole destination is
`POST https://api.higgsfield.ai/estimate/bytedance/seedance/v1/lite/text-to-video`.
This mapping remains **CANDIDATE / NOT REMOTELY VERIFIED**. There are no redirects,
alternate routes, probes, authentication checks, status queries, or POST retries.
Successful amounts must match the accepted bounded non-negative decimal-string
contract. Unknown keys, duplicate keys, malformed UTF-8 and oversized response
bodies fail closed. Raw provider bodies and exceptions are never persisted.

## Exact server authority

The existing `prepareEstimateIntent` accepts a server-only final execution mode;
its default is still MOCK. A future authorized local preflight can explicitly
prepare LIVE_ESTIMATE. The browser cannot choose that mode or grant authority.

`liveEstimateAuthorization` describes the exact intent, project, sequence, shot,
revision, provider, model route, request digest, operation digest, creation time,
attempt 1 and maximum 1. `authorizeEstimateIntent` requires that exact descriptor
for LIVE_ESTIMATE, validates canonical current state, and records the actor,
authorization time and unconsumed state in the existing intent/audit lifecycle.
There is no HTTP action that grants this authority. Live authority expires ten
minutes after authorization, and is rejected before its authorization time.

Acquisition retains the existing exclusive workspace claim and fenced aggregate
CAS. Only a winner receives a transient, opaque dispatch capability. The real
transport consumes that capability once and rechecks the acquired current state.
Neither a JSON object, credential presence, an exposed digest nor a persisted
dispatch token can mint a capability. Restart loses the capability while retaining
the consumed claim and attempt. Claims are never automatically reclaimed.

## Credentials and transport execution

Construction, page load, GET, preparation and acquisition do not read credentials.
Only authorized transport entry calls the existing server configuration parser.
Authentication is constructed immediately before the one wire invocation.
Missing or invalid configuration produces a structured local pre-send block.
Without an acquired capability, the transport returns
`ESTIMATE_EXECUTION_NOT_AUTHORIZED` without inspecting configuration.

The production HTTP handler derives the request from saved canonical state and
uses its existing strict Phase 1 mutation boundary. It cannot accept caller prices,
digests, attempt counts, provider results, transport choice or authorization.
The production route supplies the estimate-only transport but never authorizes an
intent. The Generate workspace has no live execution button. It projects actual
saved execution provenance rather than labeling every result synthetic; the UI
does not inspect credentials or assert their presence.

## Accounting and uncertainty

The existing job is the estimate's canonical identity and ledger. Its persisted
result contains the estimate intent ID, exact project/sequence/shot/revision/model/
request digest, credits, USD, attempt, timestamp and optional provider correlation
ID. It is ESTIMATE data, never ACTUAL spend, generation approval or generation
intent. No parallel cost database is introduced.

Acquisition consumes attempt 1 before transport. A definite pre-send failure
records terminal FAILED with transmitted=false and keeps the attempt consumed.
HTTP 4xx/5xx responses record sanitized terminal failure without retries. An
uncertain wire failure, timeout, redirect rejection or malformed success records
RESULT_UNKNOWN. Reload, restart and duplicate callers cannot restore an attempt.
The UI retains reconciliation-required and RE-ESTIMATE REQUIRED behavior.

All non-estimate methods on the real estimate transport delegate to the existing
disabled transport. The generation service still requires MOCK, independent of
successful estimates or estimate-only authority.

## Local validation

`scripts/test-animation-studio-phase2b0c.mjs` uses synthetic credential sentinels,
an injected FakeHiggsfieldTransport exercising the real REST implementation, the
real native store, actual child processes and the actual HTTP handler/NextRequest.
It covers exact/forged/expired/consumed authority, concurrency, restart, failures,
normalization, provenance, strict HTTP input, stale state and generation separation.
All fixtures are isolated and are not evidence of remote prices or authentication.
Network instrumentation rejects provider connections; no real credential is read.
Phase evidence records commands, exit codes, source bindings, failures/corrections,
regressions, build and browser results without modifying historical evidence.

## Next operation

A new bounded zero-request preflight must resolve fresh isolated synthetic
identities, prepare LIVE_ESTIMATE with attempt 0/max 1 and no authorization, derive
the exact canonical request and operation digests, and inspect all generation and
single-attempt protections. Credential inheritance may be checked by the existing
label-only parser in that separately authorized process. Preflight must not call
`authorizeEstimateIntent`, acquire, or invoke a transport. Only a later explicit
authorization for that exact reviewed operation may grant the one estimate.
