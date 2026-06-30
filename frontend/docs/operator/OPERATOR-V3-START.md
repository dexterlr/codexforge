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

CodexForge is checkpointed through detected phase 1785 in the local all-smoke registry. The latest completed batch is 1770-1785 - Paper Trading Result Ledger v1. `/codexforge-cockpit` now acts as the one normal user UX with Start with a goal, Trading Workspace, Build Workspace, Approvals, Evidence & Audit, Next Action, and Developer Diagnostics sections. Trading Workspace includes safe broker execution boundary previews, safe paper broker adapter simulator previews, and safe paper trading result ledger previews. Phase pages remain dev test diagnostics only. Main menu hides phase spam. Diagnostics remain searchable and directly accessible. Latest release candidate: Controlled Paper Trading Result Ledger Release Candidate. No routes were deleted, no smoke coverage was deleted, no execution was enabled, paper trading result ledger remains review-only and synthetic-only, frontend broker connection still blocked, frontend broker account reads still blocked, frontend live position reads still blocked, frontend order placement and dispatch still blocked, frontend paper order execution still blocked, frontend ledger persistence still blocked, frontend evidence persistence still blocked, frontend export/file writes still blocked, frontend money movement still blocked, frontend live market data calls still blocked, frontend real P&L calculation still blocked, frontend financial advice still blocked, backend-owned paper broker adapter remains required, backend-owned result ledger remains required, backend-owned evidence capture remains required, risk governor approval remains required, kill switch enforcement remains required, and explicit operator approval remains required. Next likely batch: 1786-1801 - Paper Trading Review Dashboard.

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
