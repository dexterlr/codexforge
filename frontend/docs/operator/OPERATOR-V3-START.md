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

CodexForge is checkpointed through detected phase 2121 in the local all-smoke registry. The latest completed batch is 2090-2121 - Render Queue + Worker Orchestration Contract Mega Batch v1. Latest release candidate: Controlled Worker Orchestration Contract Release Candidate. /codexforge-cockpit now includes safe render queue and worker orchestration contract previews below Audio Storage Contract inside the Video Creation Workspace / Backend Contracts lane. Render and worker contracts remain review-only and synthetic data only. No queue creation from frontend, no job creation from frontend, no job persistence from frontend, no worker dispatch from frontend, no command execution from frontend, no process spawning from frontend, no port binding from frontend, no runtime deployment from frontend, no service deployment from frontend, no artifact creation from frontend, no artifact persistence from frontend, no telemetry persistence from frontend, and no audit persistence from frontend. Backend-owned render queue remains required. Backend-owned worker orchestration remains required. Backend-owned runtime isolation remains required. Backend-owned sandbox policy remains required. Backend-owned telemetry remains required. Backend-owned failure ledger remains required. Backend-owned artifact storage remains required. Backend-owned approval capture remains required. Operator review remains required. Explicit operator approval remains required. Video creation workspace remains review-only and planning-only. Next likely batch: 2122-2153 - Artifact Export + Publish Gateway Contract Mega Batch v1.

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
