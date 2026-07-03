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

CodexForge is checkpointed through detected phase 2409 in the local all-smoke registry. The latest completed batch is 2378-2409 - Provider Adapter Mock Result Harness Mega Batch v1. Latest release candidate: Controlled Provider Mock Result Harness Completion Candidate. /codexforge-cockpit keeps the premium Jarvis command area, First Backend Wiring Boundary readiness rail, Provider Gateway Wiring readiness section, Provider Backend Adapter Contract readiness section, Provider Adapter Dry Run Harness section, and now adds the Provider Adapter Mock Result Harness section covering mock output packet: synthetic only, fixture catalog: safe deterministic outputs only, quality review: review-only, safety review: required, redaction review: required, audit packet: preview only, approval packet: preview only, rejection path: review-only, recovery path: policy-only, prompt leakage: blocked, credentials/tokens: blocked, streaming: blocked, mock result lane: disabled, and next batch 2410-2441 - Provider Approval/Audit Enforcement Boundary Mega Batch v1. No live provider execution exists yet. No provider calls from frontend. No model calls from frontend. No prompt sending. No streaming. No credential storage. No token storage. The dry run harness remains synthetic and review-only. Provider dry run remains backend-owned. The mock result harness remains synthetic and review-only. Synthetic provider mock result data only. Provider mock result handling remains backend-owned. Backend-owned provider adapter remains required. Explicit operator approval required. Audit trail required. Next likely batch: 2410-2441 - Provider Approval/Audit Enforcement Boundary Mega Batch v1.

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
