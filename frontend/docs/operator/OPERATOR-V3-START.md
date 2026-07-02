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

CodexForge is checkpointed through detected phase 2185 in the local all-smoke registry. The latest completed batch is 2154-2185 - Approval Capture + Rights Consent + Audit Ledger Mega Batch v1. Latest release candidate: Controlled Foundation Contracts Completion Candidate. /codexforge-cockpit now includes safe approval capture rights consent and audit ledger contract previews below Publish Gateway Contract inside the Video Creation Workspace / Backend Contracts lane. Approval rights consent audit contracts remain review-only and synthetic data only. No approval persistence from frontend, no signature capture from frontend, no identity verification from frontend, no rights clearance from frontend, no consent approval from frontend, no license grant from frontend, no legal approval from frontend, no audit persistence from frontend, no evidence storage from frontend, and no export publish render from frontend. Backend-owned approval capture remains required. Backend-owned rights workflow remains required. Backend-owned consent workflow remains required. Backend-owned legal review remains required. Backend-owned immutable audit ledger remains required. Backend-owned redaction and retention policy remains required. Operator review remains required. Explicit operator approval remains required. Video creation workspace remains review-only and planning-only. Next likely batch: 2186-2217 - Interactive Video Workspace UX Mega Batch v1.

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
