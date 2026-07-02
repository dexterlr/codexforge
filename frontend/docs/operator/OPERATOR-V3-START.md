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

CodexForge is checkpointed through detected phase 2025 in the local all-smoke registry. The latest completed batch is 2010-2025 - Controlled Video Creation Workspace Release Candidate v1. `/codexforge-cockpit` remains the one normal user UX with Start with a goal, Trading Workspace, Build Workspace, Creative Workspace, Approvals, Evidence & Audit, Next Action, and Developer Diagnostics sections. Creative Workspace includes safe video creation domain boundary previews, safe script and storyboard workspace previews, safe asset and shot planning workspace previews, safe voiceover and caption planning workspace previews, safe render job boundary previews, safe video review and export boundary previews, and the complete safe controlled video creation workspace release candidate. Phase pages remain dev test diagnostics only. Main menu hides phase spam. Diagnostics remain searchable and directly accessible. Latest release candidate: Controlled Video Creation Workspace Release Candidate. No routes were deleted, no smoke coverage was deleted, no execution was enabled, controlled video creation workspace remains review-only, video creation remains planning-only, synthetic data only, frontend generation still blocked, frontend prompt sending still blocked, frontend provider calls still blocked, frontend model calls still blocked, frontend connector calls still blocked, frontend image generation still blocked, frontend video generation still blocked, frontend voice generation still blocked, frontend final script generation still blocked, frontend rendering still blocked, frontend render queue creation still blocked, frontend worker dispatch still blocked, frontend artifact creation still blocked, frontend artifact persistence still blocked, frontend export still blocked, frontend download still blocked, frontend upload still blocked, frontend publishing still blocked, frontend scheduling still blocked, frontend file generation still blocked, frontend script persistence still blocked, frontend storyboard persistence still blocked, frontend asset persistence still blocked, frontend audio persistence still blocked, frontend caption persistence still blocked, frontend transcript persistence still blocked, frontend rights persistence still blocked, frontend prompt persistence still blocked, frontend job persistence still blocked, frontend render persistence still blocked, frontend export persistence still blocked, frontend revision persistence still blocked, frontend publish persistence still blocked, frontend approval persistence still blocked, backend-owned asset storage remains required, backend-owned audio storage remains required, backend-owned render service remains required, backend-owned export service remains required, backend-owned provider gateway remains required, backend-owned rights review remains required, backend-owned consent review remains required, backend-owned approval capture remains required, backend-owned script persistence remains required, backend-owned storyboard persistence remains required, backend-owned caption persistence remains required, backend-owned render queue remains required, backend-owned worker orchestration remains required, backend-owned artifact storage remains required, backend-owned publish gateway remains required, operator review remains required, and explicit operator approval remains required. Trading workspace remains review-only and no-live-transition. Next likely batch: 2026-2041 - Video Backend Service Contract Boundary v1.

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
