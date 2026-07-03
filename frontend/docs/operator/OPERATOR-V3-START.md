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

CodexForge is checkpointed through detected phase 2473 in the local all-smoke registry. The latest completed batch is 2442-2473 - First Controlled Provider Dry Run Candidate Mega Batch v1. Latest release candidate: Controlled Provider Dry Run Completion Candidate. /codexforge-cockpit keeps the premium Jarvis command area, First Backend Wiring Boundary readiness rail, Provider Gateway Wiring readiness section, Provider Backend Adapter Contract readiness section, Provider Adapter Dry Run Harness section, Provider Adapter Mock Result Harness section, Provider Approval Audit Enforcement section, and now adds the Controlled Provider Dry Run Candidate section covering run intent packet: synthetic only, approval-bound packet: review-only, audit-bound packet: review-only, preflight summary: required, fixture selection: synthetic only, transcript assembly: deterministic only, mock result handoff: review-only, denied execution summary: required, operator review panel: disabled actions, execution lane: disabled, and next batch 2474-2505 - Provider Backend Execution Readiness Mega Batch v1. No live provider execution exists yet. No provider calls from frontend. No model calls from frontend. No prompt sending. No streaming. No credential storage. No token storage. No frontend persistence. No browser storage writes. No connector calls. No queue dispatch. No worker dispatch. No database writes. No command execution. No service creation. No API creation from frontend. No approval persistence from frontend. No audit persistence from frontend. The dry run harness remains synthetic and review-only. Provider dry run remains backend-owned. The mock result harness remains synthetic and review-only. Provider mock result handling remains backend-owned. Approval audit enforcement remains synthetic and review-only. Provider approval audit handling remains backend-owned. The controlled provider dry run candidate remains synthetic and review-only. Review-only controlled provider dry run candidate. Synthetic controlled provider dry run data only. Provider dry run remains backend-owned. Backend-owned provider adapter remains required. Explicit operator approval required. Audit trail required. Next likely batch: 2474-2505 - Provider Backend Execution Readiness Mega Batch v1.

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


CodexForge is checkpointed through detected phase 2537 in the local all-smoke registry. The latest completed batch is 2506-2537 - First Real Provider Call Guard Mega Batch v1. Latest release candidate: First Real Provider Call Guard Completion Candidate. /codexforge-cockpit keeps the premium Jarvis command area, First Backend Wiring Boundary readiness rail, Provider Gateway Wiring readiness section, Provider Backend Adapter Contract section, Provider Adapter Dry Run Harness section, Provider Mock Result Harness section, Provider Approval Audit Enforcement section, Controlled Provider Dry Run Candidate section, Provider Backend Execution Readiness section, and now adds the First Real Provider Call Guard section covering eligibility checklist: required, execution lock: locked, backend-only gate: required, operator approval enforcement: required, audit enforcement: required, credential presence guard: backend-only, token redaction guard: required, prompt transmission guard: blocked, SDK import guard: blocked, network egress guard: blocked, real call lane: disabled, and next batch 2538-2569 - First Approved Provider Trial Mega Batch v1. No live provider execution exists yet. No provider calls from frontend. No model calls from frontend. No prompt sending. No streaming. No credential storage. No token storage. No frontend persistence. No browser storage writes. No connector calls. No queue dispatch. No worker dispatch. No database writes. No command execution. No service creation. No API creation from frontend. No approval persistence from frontend. No audit persistence from frontend. The dry run harness remains synthetic and review-only. Provider dry run remains backend-owned. The mock result harness remains synthetic and review-only. Provider mock result handling remains backend-owned. Approval audit enforcement remains synthetic and review-only. Provider approval audit handling remains backend-owned. The controlled provider dry run candidate remains synthetic and review-only. Provider backend execution readiness remains synthetic and review-only. First real provider call guard remains synthetic and review-only. Review-only first real provider call guard. Synthetic real provider call guard data only. Real provider call remains backend-owned and blocked. Backend-owned provider adapter remains required. Explicit operator approval required. Audit trail required. Next likely batch: 2538-2569 - First Approved Provider Trial Mega Batch v1.
