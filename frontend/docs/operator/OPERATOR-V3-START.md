# Operator V3 Working Boundary

This file marks the operator work boundary for approval-gated execution.

## Locked Unless Intentionally Changed

- Existing operator APIs.

- Diff/apply safety model.

- Allowlist enforcement.

- No background jobs.

- No mutation outside repo path allowlists.

- No hidden writes.

- No required LLM dependency.

- Smoke scripts and grouped smoke coverage.

## Current Product Context

CodexForge is checkpointed through detected phase 2313 in the local all-smoke registry. The latest completed batch is 2282-2313 - Provider Gateway Wiring Mega Batch v1. Latest release candidate: Controlled Provider Gateway Wiring Completion Candidate. /codexforge-cockpit keeps the premium Jarvis command area and First Backend Wiring Boundary readiness rail, and now adds the Provider Gateway Wiring readiness section covering Provider Gateway Wiring status, request envelope review-only, response envelope synthetic only, provider capability catalog preview only, model family catalog preview only, approval gate required, audit envelope required, credential boundary backend-only, token boundary backend-only, streaming boundary blocked, fallback/retry/timeout policy-only, disabled adapter registry, execution state blocked, and next batch 2314-2345 - Provider Gateway Backend Adapter Contract Mega Batch v1. No live provider execution exists yet. The frontend remains review-only/local-state-only and synthetic provider data only with no frontend persistence, no browser storage writes, no provider calls from frontend, no model calls from frontend, no connector calls from frontend, no prompt sending, no streaming, no upload, no download, no render, no export, no publish, no schedule, no queue dispatch, no worker dispatch, no database writes, no credential storage, no token storage, no command execution, no service creation, and no API creation from frontend. Provider gateway remains backend-owned. Explicit operator approval required. Audit trail required. Next likely batch: 2314-2345 - Provider Gateway Backend Adapter Contract Mega Batch v1.

Operator work should integrate with these surfaces without bypassing the approval model. Most current pages are review-only surfaces; they do not provide automatic live execution, dry-run execution, provider/local/connector/automation calls, model calls, hidden model calls, secret reads, file mutation, shell execution, patch apply, backend adapter execution, domain adapter execution, credential/output storage, browser credential storage, approval persistence, queue persistence, or memory auto-promotion from arbitrary UI.

## V3 Focus Areas

- Apply Gate Evidence Pack.

- Guarded apply executor behind policy.

- Persistent artifact ledger.

- Full memory replay/merge audit.

- Adapter execution behind local bridge and explicit policies.

- Project onboarding/import.

- Better graph data volume and clustering.

- Approved backend/local/provider boundary definition before any live execution claim.

## Non-Goals

- No automatic file mutation.

- No uncontrolled apply executor.

- No broker execution.

- No Blender, Unreal, ComfyUI, render, or PC/camera execution.

- No provider, local model, connector, or automation execution without explicit operator approval and an approved boundary.

- No credential/output storage in browser storage.

- No memory auto-promotion.

- No source edits outside an approved operator path.
