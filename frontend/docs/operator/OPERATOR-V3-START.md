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

CodexForge is checkpointed through detected phase 1737 in the local all-smoke registry. The latest completed batch is 1722-1737 - Cockpit Navigation Cleanup + User UX Consolidation v1. `/codexforge-cockpit` now acts as the one normal user UX with Start with a goal, Trading Workspace, Build Workspace, Approvals, Evidence & Audit, Next Action, and Developer Diagnostics sections. Phase pages remain dev test diagnostics only. Main menu hides phase spam. Diagnostics remain searchable and directly accessible. Latest release candidate: Controlled Consolidated User UX Release Candidate. No routes were deleted, no smoke coverage was deleted, no execution was enabled, backend-owned boundaries remain required, and explicit operator approval remains required. Next likely batch: 1738-1753 - Broker Execution Boundary.

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
