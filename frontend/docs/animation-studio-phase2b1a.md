# Phase 2B.1A — estimate execution reporting and reconciliation

This is a local-source, synthetic-validation repair. It authorizes no live provider operation. Generation stays locked. The previous one-estimate authorization was never used and must not be reused after this source change.

## Defect and repair

The operator HTTP handler previously described any unknown store failure as "No external execution was attempted." A failure publishing a received estimate, reading the completed job, listing projects or closing the repository could reach that handler after the provider wire had already been entered. The Generate page also inferred no dispatch from a generic HTTP 503.

The HTTP invocation now owns an in-memory EstimateExecutionTracker. RealHiggsfieldEstimateTransport marks TRANSPORT_ENTERED immediately before its sole wire call, after authorization, credential validation, abort checks and request construction. Once entered, the observation cannot be downgraded by a false-transmitted exception, a replay projection or a secondary error. The marker is observational and grants no authority. The service still acquires the existing exclusive estimate claim and fenced attempt before requesting transport.

Every operator execution response carries executionOutcome: externalExecution, transportPhase, outcome, persistence, reconciliationRequired, retryAllowed:false and bounded non-secret response metadata. Human-readable external-execution statements derive from that report, never a generic HTTP status or raw error. A missing or contradictory client report fails closed to UNKNOWN.

| Observed boundary | External execution | Persistence/recovery |
| --- | --- | --- |
| Definite pre-transport validation, claim, construction or credential failure | NOT_ATTEMPTED | Existing canonical claim/attempt alone determines availability; no retry permission is granted |
| Wire entered, response lost/invalid | ATTEMPTED; RESULT_UNKNOWN | Reconciliation required; no automatic retry |
| Response received, atomic outcome publication unconfirmed | ATTEMPTED | Safe HTTP status, validated quote and allowlisted correlation retained in the invocation report; original claim/attempt untouched |
| Quote or definite HTTP failure committed | ATTEMPTED | PERSISTED; exact canonical terminal record, single consumed attempt |
| Claimed/started operation found after restart without terminal record | UNKNOWN | Reconciliation required; no reset, claim deletion or second request |

No separate persistent authority state was added. Restart visibility is derived from existing intent phase, attempt, dispatch, failure and the repository's claim-aware recoveryPlan. A claim surviving the claim-before-aggregate crash gap remains blocking even if the aggregate still displays attempt zero. A lost atomic commit acknowledgement is recognized only by reading a validated canonical terminal record; otherwise it remains unconfirmed.

Dispatch completion metadata, provider response/correlation, quote/cost, failure and terminal job state are committed in the existing single validated aggregate transaction. Tests inject failures at that shared native publication boundary, not invented independent field writes. A post-commit list/read/close failure retains the known PERSISTED response while requiring reconciliation of local completion. A secondary close failure never replaces the first error.

## Validation and limitations

scripts/test-animation-studio-phase2b1a.mjs exercises the actual source HTTP/service/native store with fake wires and fresh synthetic namespaces, including process exits/reopen, lost responses, claim-before-CAS and post-response publication faults, duplicate execution, report parsing, sentinel exclusion and generation separation. It binds source at start/end and checks child fingerprints. Inherited lifecycle, transport, HTTP, readiness, operator and foundation suites remain required, as do source/generated TypeScript, focused lint, the canonical isolated production build and bounded affected-state UI inspection.

All evidence is created in fresh acceptance roots. Failed/provisional runs remain retained and are distinguished from final source-bound results. Browser failure scenes are synthetic UI evidence only, never live provider evidence. The working Phase 2B.0E snapshot, historical visual fixture, prior evidence and E1/chat work must remain byte-for-byte unchanged.

## Next live boundary

After a sealed READY result, the user must restart/rebind the private server to the repaired source using the accepted namespace phase2b0e-preserved-20260914t152345. Then perform a fresh zero-provider-request R4-equivalent preflight against that exact server/source/namespace and unchanged PREPARED 0/1 fixture, with both claim paths absent. Only a new explicit user authorization can permit exactly one later live estimate. This phase does not restart or execute the private server, authenticate, estimate, generate, stage, commit, tag or push.
