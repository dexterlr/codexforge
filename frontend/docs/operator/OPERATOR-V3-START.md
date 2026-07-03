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

CodexForge is checkpointed through detected phase 2377 in the local all-smoke registry. The latest completed batch is 2346-2377 - First Provider Adapter Dry Run Harness Mega Batch v1. Latest release candidate: Controlled Provider Adapter Dry Run Completion Candidate. /codexforge-cockpit keeps the premium Jarvis command area, First Backend Wiring Boundary readiness rail, Provider Gateway Wiring readiness section, Provider Backend Adapter Contract readiness section, and now adds the Provider Adapter Dry Run Harness section covering request packet synthetic only, response packet synthetic only, fixture registry safe mock data only, transcript preview local deterministic copy only, validation matrix review-only, denial matrix required, audit packet preview only, approval packet preview only, prompt transmission blocked, credentials/tokens blocked, streaming blocked, dry run adapter lane disabled, result review synthetic only, failure recovery policy-only, and next batch 2378-2409 - Provider Adapter Mock Result Harness Mega Batch v1. No live provider execution exists yet. No provider calls from frontend. No model calls from frontend. No prompt sending. No streaming. No credential storage. No token storage. The dry run harness remains synthetic and review-only. Provider dry run remains backend-owned. Explicit operator approval required. Audit trail required. Next likely batch: 2378-2409 - Provider Adapter Mock Result Harness Mega Batch v1.

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
