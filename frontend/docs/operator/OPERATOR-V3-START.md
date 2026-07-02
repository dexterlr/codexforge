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

CodexForge is checkpointed through phase 2249 in the local all-smoke registry. The latest completed batch is 2218-2249 - Jarvis Cockpit Visual Upgrade Mega Batch v1. Latest release candidate: Controlled Jarvis Cockpit Completion Candidate. /codexforge-cockpit now includes premium Jarvis-style high-end visual command centre UX with a cinematic mission-control hero, holographic command grid, readiness orb cluster, cinematic workflow timeline, polished project command brief, storyboard orbit shell, asset/audio status matrix, approval rights safety rail, backend systems health wall, blocked action command deck, contract status drawer, preserved interactive local-state video workspace core, and lower-priority backend contract status coverage. The cockpit remains local React state only and synthetic data only. No backend execution from frontend, no frontend persistence, no browser storage writes, no provider calls from frontend, no model calls from frontend, no connector calls from frontend, no prompt sending from frontend, no uploads from frontend, no downloads from frontend, and no render/export/publish/schedule from frontend. Backend-owned persistence, provider gateway, asset/audio storage, render queue, worker orchestration, artifact export, publish gateway, approval capture, and rights consent audit ledger remain required. Operator review remains required. Explicit operator approval remains required. Next likely batch: 2250-2281 - First Backend Wiring Boundary Mega Batch v1.

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

