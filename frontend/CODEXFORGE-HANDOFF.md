# CodexForge Handoff

Branch: `codexforge-foundation`

## Continue From Here

```powershell
git status --short
npm run build
npm run smoke:codexforge:server
```

## Current Surfaces

- `/`: product launcher.
- `/ai`: main workspace with chat, evidence-grounded chat, preview diff composition, apply gate review, and dry-run review.
- `/brain`: Brain command center with real 3D graph and 2D fallback.
- `/files`: Files Command Center and File to Brain to Chat workflow.
- `/runs`: Operator Run Center.
- `/memory`: memory review, approved persistence, evidence memory, and Brain merge review.
- `/tasks`: Task Autopilot, reviewed activation, execution readiness, step runner preview, and approved read-only execution.
- `/capabilities`: Capability Cockpit.
- `/creative`: Creative Production Studio, preview-only.
- `/history`: activity and history intelligence.
- `/mission`: Mission Control.
- `/artifacts`: artifact executor, workspace, export, and ingestion review.
- `/entry`: quick launch surface.
- `/clawd`: operator surface.

## Current Capabilities

- Brain runtime, cognitive memory, deterministic ingestion, recall, and approved memory persistence.
- Real 3D Brain graph with fallback-safe 2D graph.
- Approved Brain graph merge and evidence memory review.
- Safe Patch Preview, Patch Preview Queue, Preview Diff Composer, Patch Application Gate, and Apply-Diff Dry Run simulation.
- Files Command Center and File to Brain to Chat workflow.
- Task Autopilot, reviewed task activation, execution readiness, step runner preview, and read-only step execution.
- Operator Run Center, Capability Cockpit, Local Bridge, Mission Control, Creative Production Studio, artifact workflow, and Production Pack Builder.
- Tool adapter registry, policy guard, global navigation shell, and grouped smoke coverage.

## Do Not Overclaim

- No uncontrolled apply executor.
- No silent file mutation.
- No Blender execution.
- No Unreal execution.
- No ComfyUI execution.
- No render execution.
- No broker execution.
- No PC/camera control.
- `apply-diff`, `write-file`, and `run-command` require explicit future approval paths before mutation or command execution.

## Next Useful Work

- Apply Gate Evidence Pack.
- Guarded apply executor behind policy.
- Persistent artifact ledger.
- Full memory replay/merge audit.
- Adapter execution behind local bridge and explicit policies.
- Project onboarding/import.
- Better graph data volume and clustering.

CodexForge checkpoint documentation now records through phase 1801.

The latest completed batch is 1786-1801 - Paper Trading Review Dashboard v1. The latest family adds Paper Trading Review Dashboard Boundary, Simulated Performance Summary Preview, Simulated Trade Review Queue Preview, Simulated Risk Review Queue Preview, Simulated Evidence Review Queue Preview, Simulated Approval Review Queue Preview, Simulated Metric Cards Preview, Simulated Ledger Timeline Preview, Simulated Exception Queue Preview, Simulated Review Note Packet Preview, Simulated Operator Signoff Preview, Simulated Dashboard Export Boundary Preview, Simulated Dashboard Health Status Preview, Cockpit Paper Trading Review Dashboard Summary, First Paper Trading Review Dashboard Candidate, and Controlled Paper Trading Review Dashboard Release Candidate surfaces. Phase pages remain dev test diagnostics only. Latest release candidate: Controlled Paper Trading Review Dashboard Release Candidate. `/codexforge-cockpit` now acts as the one normal user UX with feature-first sections for Start with a goal, Trading Workspace, Build Workspace, Approvals, Evidence & Audit, Next Action, and Developer Diagnostics. Trading Workspace includes safe broker execution boundary previews, safe paper broker adapter simulator previews, safe paper trading result ledger previews, and safe paper trading review dashboard previews. Dashboard remains review-only. Synthetic data only. Frontend broker connection still blocked. Frontend broker account reads still blocked. Frontend live position reads still blocked. Frontend order placement and dispatch still blocked. Frontend paper order execution still blocked. Frontend dashboard persistence still blocked. Frontend evidence persistence still blocked. Frontend export/file writes still blocked. Frontend money movement still blocked. Frontend live market data calls still blocked. Frontend real P&L calculation still blocked. Frontend financial advice still blocked. Frontend performance guarantee claims still blocked. Backend-owned paper broker adapter remains required. Backend-owned result ledger remains required. Backend-owned evidence capture remains required. Backend-owned review workflow remains required. Risk governor approval remains required. Kill switch enforcement remains required. Explicit operator approval remains required. Main menu hides phase spam. Diagnostics remain searchable and directly accessible. No routes were deleted. No smoke coverage was deleted. No execution was enabled. Next likely batch: 1802-1817 - Strategy Performance Review Loop.

The latest simulated runtime execution dry-run review layer covers phases 1130-1145: boundary, intent packet, plan packet, process review, port review, environment review, dependency review, risk review, evidence preview, result preview, failure preview, recovery preview, operator review, execution hold state, First Simulated Runtime Candidate, and Controlled Simulated Runtime Release Candidate. These surfaces remain static, deterministic, preview-only, denied runtime execution by default, and require explicit operator approval before any runtime start, process spawn, port binding, endpoint call, local bridge call, health probe, evidence persistence, result persistence, recovery, queue persistence, dry-run execution, model call, provider call, backend adapter execution, or domain adapter execution can exist.


The simulated adapter execution dry-run review layer covers boundary, intent packet, selection review, capability review, permission review, input review, output review, risk review, evidence preview, result preview, failure preview, recovery preview, operator review, execution hold state, First Simulated Adapter Candidate, and Controlled Simulated Adapter Release Candidate surfaces. Simulated adapter execution previews remain static, deterministic, review-only, preview-only, and approval-gated until explicit operator approval. They represent guarded queue reference, dry-run ticket reference, adapter intent, adapter family, adapter capability preview, permission gate, input contract preview, output contract preview, expected evidence preview, expected result preview, failure preview, recovery preview, operator review state, adapter execution hold state, denied adapter execution state, and explicit approval requirement. They support file-write, command-runner, local-runtime, project-scaffold, provider-model, connector, automation, evidence-store, result-store, recovery, packaging, creative, research, chatbot, game-server, no-op, denied, and preview-only adapter families while showing no real adapter call, backend execution, domain execution, connector execution, provider execution, automation execution, creative generation, research execution, game server launch, local runtime start, file mutation, command execution, queue persistence, dry-run execution, or hidden approvals.

An earlier family is the real guarded file-write adapter MVP review layer for phases 1162-1177. It covers the adapter boundary, adapter contract, path guard, diff builder, approval ticket, preflight review, apply hold, evidence capture contract, result capture contract, rollback contract, dry-run harness, denied mutation review, operator review packet, cockpit integration contract, First Real Guarded File-Write Candidate, and Controlled Real Guarded File-Write MVP Release Candidate surfaces. These surfaces remain static, deterministic, review-only, and approval-gated, keep every mutation blocked until explicit operator approval, and prepare the future single-page CodexForge cockpit to show goal, plan, diff, approval, execution state, evidence, result, and recovery in one place.
