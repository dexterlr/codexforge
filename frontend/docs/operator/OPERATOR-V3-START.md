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

CodexForge is checkpointed through detected phase 2057 in the local all-smoke registry. The latest completed batch is 2042-2057 - Provider Gateway Contract v1. `/codexforge-cockpit` remains the one normal user UX with Start with a goal, Trading Workspace, Build Workspace, Creative Workspace, Approvals, Evidence & Audit, Next Action, and Developer Diagnostics sections. Creative Workspace includes safe provider gateway contract previews below Video Backend Service Contract Boundary. Phase pages remain dev test diagnostics only. Main menu hides phase spam. Diagnostics remain searchable and directly accessible. Latest release candidate: Controlled Provider Gateway Contract Release Candidate. No routes were deleted, no smoke coverage was deleted, no execution was enabled, provider gateway contract remains review-only, backend service contracts remain review-only, controlled video creation workspace remains review-only, video creation remains planning-only, synthetic data only, frontend provider calls remain blocked, frontend model calls remain blocked, frontend connector calls remain blocked, frontend prompt sending remains blocked, frontend credential storage remains blocked, frontend request dispatch remains blocked, frontend response persistence remains blocked, frontend quota mutation remains blocked, frontend audit persistence remains blocked, frontend generation remains blocked, frontend backend implementation remains blocked, frontend API creation remains blocked, frontend service deployment remains blocked, and frontend command execution remains blocked. Backend-owned provider gateway remains required, backend-owned credential vault remains required, backend-owned prompt review remains required, backend-owned safety review remains required, backend-owned audit trail remains required, backend-owned approval capture remains required, operator review remains required, and explicit operator approval remains required. Video creation workspace remains review-only and planning-only. Trading workspace remains review-only and no-live-transition. Next likely batch: 2058-2073 - Asset Storage Contract v1.

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
