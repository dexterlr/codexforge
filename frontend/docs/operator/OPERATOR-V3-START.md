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

CodexForge is checkpointed through detected phase 1625 in the local all-smoke registry. The latest completed batch is 1610-1625 - Domain Pack Runner Preview. `/codexforge-cockpit` is the normal user surface and is becoming the front user-facing product shell with Domain Pack Runner for Choose Domain, Game Server Builder, Trading Research, Web App Builder, Docs Pack, Data Analysis Pack, Creative Campaign Pack, Goal Intake, Domain Classifier, Worker Route, Plan, Artifacts, Commands, Approvals, Evidence, Results, Audit, Recovery, and Hold Before Execution. Phase pages remain dev test diagnostics only. Latest release candidate: Controlled Domain Pack Runner Release Candidate. frontend domain pack execution still blocked, backend-owned domain pack runner remains required, and explicit operator approval remains required. Next likely batch: 1626-1641 - Cockpit Domain Workspace v1.

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
