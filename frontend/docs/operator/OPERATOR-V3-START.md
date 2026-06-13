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

CodexForge is checkpointed through detected phase 481 in the local all-smoke registry. It includes Brain and memory review, runtime journal/replay, provider governance, local model live trial review, connector live trial review, automation live trial review, unified live workflow trial 2 review, beta operator daily workflow review, Jarvisd/local-daemon boundary review, project intelligence, patch planning, test planning, creative/artifact review, and policy/approval boundary surfaces.

Operator work should integrate with these surfaces without bypassing the approval model. Most current pages are review-only surfaces; they do not provide automatic live execution, provider/local/connector/automation calls, file mutation, shell execution, patch apply, credential/output storage, or memory auto-promotion from arbitrary UI.

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
