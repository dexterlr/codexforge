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

CodexForge is checkpointed through phase 2281 in the local all-smoke registry. The latest completed batch is 2250-2281 - First Backend Wiring Boundary Mega Batch v1. Latest release candidate: Controlled First Backend Wiring Boundary Completion Candidate. /codexforge-cockpit now includes the First Backend Wiring Boundary readiness section below the premium Jarvis-style command area, covering disabled backend adapter layer, provider gateway boundary, asset storage boundary, audio storage boundary, render queue boundary, worker orchestration boundary, artifact export boundary, publish gateway boundary, approval capture boundary, rights consent audit boundary, endpoint inventory preview, contract-to-service mapping preview, request boundary review-only, audit envelope required, permission envelope required, and secret handling server-only. No live backend execution exists yet. The frontend remains review-only/local-state-only and synthetic data only. No frontend persistence, no browser storage writes, no provider calls, no model calls, no connector calls, no prompt sending, no upload, no download, no render, no export, no publish, no schedule, no queue dispatch, no worker dispatch, no database writes, no credential storage, no token storage, no command execution, no service creation, and no API creation from frontend. Backend-owned services remain required. Operator review remains required. Explicit operator approval remains required. Audit trail required. Next likely batch: 2282-2313 - Provider Gateway Wiring Mega Batch v1.

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
