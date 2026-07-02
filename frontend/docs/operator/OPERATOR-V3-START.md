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

CodexForge is checkpointed through phase 2217, detected from the local `scripts/smoke-codexforge-all.ps1` registry by taking the highest `Phase N` entry. The latest completed batch is 2186-2217 - Interactive Video Workspace UX Mega Batch v1. The latest release candidate is Controlled Interactive Video Workspace Completion Candidate. The cockpit now includes a prominent interactive local-state video workspace UX near the top with project setup, project brief editor, audience and outcome selectors, script outline editor, storyboard scene cards, shot list planner, asset checklist, audio and voiceover planner, caption and accessibility planner, brand style guard, rights and consent checklist, approval gate checklist, render/export/publish readiness panels, fake video job timeline, blocked backend action centre, and first backend wiring readiness preview. Phase pages remain diagnostic surfaces and existing contract status coverage remains available below the normal user workspace. The UX remains local React state only and synthetic data only: no backend execution from frontend, no frontend persistence, no browser storage writes, no provider calls from frontend, no model calls from frontend, no connector calls from frontend, no prompt sending from frontend, no uploads from frontend, no downloads from frontend, no render/export/publish/schedule from frontend, and no protected action execution from frontend. Backend contracts are foundation complete enough for the first backend wiring boundary. Backend-owned persistence, provider gateway, asset/audio storage, render queue, worker orchestration, artifact export, publish gateway, approval capture, and rights consent audit ledger remain required. Operator review and explicit operator approval remain required. Next likely batch: 2218-2249 - First Backend Wiring Boundary Mega Batch v1.

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
