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

CodexForge is checkpointed through detected phase 1353 in the local all-smoke registry. It includes Brain and memory review, runtime journal/replay, provider governance, local model live trial review, connector live trial review, automation live trial review, unified live workflow trial 2 review, beta operator daily workflow review, beta workflow release review, Beta 2 review and hardening, unified operator cohesion and final policy polish, Foundation 500 and first real daily workflow review-only preparation, multi-workflow and Daily Beta review-only preparation, Jarvisd/local-daemon boundary review, project intelligence, patch planning, test planning, creative/artifact review, backend/local adapter review, model router/provider readiness preview, controlled model-use release-candidate review, model router execution-readiness candidate review, controlled model router beta release-candidate review, model-routed backend execution review, project-builder MVP review, universal game-builder review, universal project-builder review, universal builder cockpit review, guided build workflow review, build plan bundle review, build plan approval review, guarded execution queue preview, dry-run execution handoff preview, simulated file/command/runtime/adapter dry-run review, real guarded file-write and command-runner adapter review, unified cockpit, cockpit evidence/result/recovery preview, first local change trial preview, controlled end-to-end build/fix workflow release-candidate preview, guided operator run hardening release-candidate layer, controlled execution readiness gate layer, real controlled operator trial packet release-candidate layer, backend approval handoff release-candidate layer, backend guarded apply/run preview release-candidate layer, and guarded apply/run dry-run packet layer through Controlled Guarded Apply Run Dry-Run Release Candidate. Latest completed batch: 1338-1353 - First Guarded Apply/Run Dry-Run Packet. Latest release candidate: Controlled Guarded Apply Run Dry-Run Release Candidate. Still no real apply/run execution. Next likely batch: 1354-1369 - First Tiny Real Controlled Operator Trial.

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
