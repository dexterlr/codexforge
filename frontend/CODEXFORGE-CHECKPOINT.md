# CodexForge Checkpoint

Branch: `codexforge-foundation`

## Current Product State

CodexForge now includes:

- Brain runtime, cognitive memory, deterministic Brain memory ingestion, Brain memory recall, and chat recall context.
- Real 3D Brain graph with WebGL/Three/Fiber/Drei and a 2D fallback.
- Approved memory persistence, memory review and promotion queue, evidence memory review, approved Brain graph merge, and Brain merge review.
- Files Command Center and File to Brain to Chat workflow.
- Safe Patch Preview, Patch Preview Queue, Preview Diff Composer, Patch Application Gate, and Apply-Diff Dry Run simulation.
- Task Autopilot, reviewed task activation, Execution Readiness, Approved Step Runner Preview, and approved read-only step execution.
- Operator Run Center, Capability Cockpit, Creative Production Studio, artifact workspace/executor/export/ingestion, Production Pack Builder, Local Bridge, Mission Control, global navigation shell, and product surface planning.
- Policy guard, approval boundary visibility, and local-first deterministic smoke-backed architecture.

## Safety Boundary

- No silent mutation.
- File mutation is approval-gated and not automatic.
- `apply-diff` requires explicit tool-policy approval.
- `write-file` and `run-command` remain blocked unless a future explicit approval path exists.
- Patch Preview, Preview Diff Composer, Patch Application Gate, Apply Evidence Pack, and Apply-Diff Dry Run are review or simulation surfaces, not uncontrolled apply executors.
- Creative Studio and Capability Cockpit do not execute Blender, Unreal, ComfyUI, render jobs, broker jobs, or PC/camera control.
- Broker execution is blocked.
- PC/camera features require explicit future session consent.
- Brain graph visual layers do not mutate graph state, and the 3D graph keeps a 2D fallback.

## Validation Baseline

Use these checks after documentation or product changes:

```powershell
npm run build
npm run smoke:codexforge:server
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-all.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-smoke-groups.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-brand-clean.ps1
git diff --check
git status --short
```

## Near-Term Roadmap

- Apply Gate Evidence Pack.
- Guarded apply executor behind policy.
- Persistent artifact ledger.
- Full memory replay/merge audit.
- Adapter execution behind local bridge and explicit policies.
- Project onboarding/import.
- Better graph data volume and clustering.

CodexForge checkpoint documentation now records through phase 1801.

The latest completed batch is 1786-1801 - Paper Trading Review Dashboard v1. The latest family adds Paper Trading Review Dashboard Boundary, Simulated Performance Summary Preview, Simulated Trade Review Queue Preview, Simulated Risk Review Queue Preview, Simulated Evidence Review Queue Preview, Simulated Approval Review Queue Preview, Simulated Metric Cards Preview, Simulated Ledger Timeline Preview, Simulated Exception Queue Preview, Simulated Review Note Packet Preview, Simulated Operator Signoff Preview, Simulated Dashboard Export Boundary Preview, Simulated Dashboard Health Status Preview, Cockpit Paper Trading Review Dashboard Summary, First Paper Trading Review Dashboard Candidate, and Controlled Paper Trading Review Dashboard Release Candidate surfaces. Latest release candidate: Controlled Paper Trading Review Dashboard Release Candidate. `/codexforge-cockpit` now acts as the one normal user UX and includes safe paper trading review dashboard previews grouped inside Trading Workspace below Paper Trading Result Ledger. Dashboard remains review-only. Synthetic data only. Frontend broker connection still blocked. Frontend broker account reads still blocked. Frontend live position reads still blocked. Frontend order placement and dispatch still blocked. Frontend paper order execution still blocked. Frontend dashboard persistence still blocked. Frontend evidence persistence still blocked. Frontend export/file writes still blocked. Frontend money movement still blocked. Frontend live market data calls still blocked. Frontend real P&L calculation still blocked. Frontend financial advice still blocked. Frontend performance guarantee claims still blocked. Backend-owned paper broker adapter remains required. Backend-owned result ledger remains required. Backend-owned evidence capture remains required. Backend-owned review workflow remains required. Risk governor approval remains required. Kill switch enforcement remains required. Explicit operator approval remains required. Phase pages remain dev test diagnostics only. Next likely batch: 1802-1817 - Strategy Performance Review Loop.

The latest simulated runtime execution dry-run review layer covers phases 1130-1145: boundary, intent packet, plan packet, process review, port review, environment review, dependency review, risk review, evidence preview, result preview, failure preview, recovery preview, operator review, execution hold state, First Simulated Runtime Candidate, and Controlled Simulated Runtime Release Candidate. These surfaces remain static, deterministic, preview-only, denied runtime execution by default, and require explicit operator approval before any runtime start, process spawn, port binding, endpoint call, local bridge call, health probe, evidence persistence, result persistence, recovery, queue persistence, dry-run execution, model call, provider call, backend adapter execution, or domain adapter execution can exist.


The previous family is the real guarded file-write adapter MVP review layer: Real Guarded File Write Adapter Boundary, File Write Adapter Contract, File Write Path Guard, File Write Diff Builder, File Write Approval Ticket, File Write Preflight Review, File Write Apply Hold, File Write Evidence Capture Contract, File Write Result Capture Contract, File Write Rollback Contract, File Write Dry Run Harness, File Write Denied Mutation Review, File Write Operator Review Packet, File Write Cockpit Integration Contract, First Real Guarded File Write Candidate, and Controlled Real Guarded File Write MVP Release Candidate. These deterministic review/dev surfaces start the real file-write adapter spine while the UI remains blocked from writing files, applying diffs, persisting approvals, persisting evidence, persisting results, executing rollback, running dry-runs, calling models, calling providers, executing adapters, running commands, starting runtimes, spawning processes, binding ports, or mutating paths. Future real file writes remain behind explicit operator approval, path guard, diff preview, preflight review, evidence capture, result capture, and rollback contract.

An earlier family is the real guarded command-runner adapter MVP review layer: Real Guarded Command Runner Adapter Boundary, Command Runner Adapter Contract, Command Allowlist Policy, Command Argument Guard, Command Working Directory Guard, Command Environment Guard, Command Approval Ticket, Command Preflight Review, Command Execution Hold, Command Evidence Capture Contract, Command Result Capture Contract, Command Recovery Contract, Command Dry Run Harness, Command Cockpit Integration Contract, First Real Guarded Command Candidate, and Controlled Real Guarded Command MVP Release Candidate. These deterministic review/dev surfaces prepare the real command-runner adapter spine while the UI remains blocked from running commands, running shell commands, running git commands, running tests, running builds, running smokes, persisting approvals, persisting evidence, persisting results, executing recovery, running dry-runs, calling models, calling providers, executing adapters, writing files, starting runtimes, spawning processes, binding ports, forwarding credentials, or displaying environment values. Future real commands remain behind explicit operator approval, command allowlist policy, argument guard, working-directory guard, environment guard, evidence capture, result capture, and recovery contract.


Phases 1162-1177 cover Real Guarded File Write Adapter Boundary, File Write Adapter Contract, File Write Path Guard, File Write Diff Builder, File Write Approval Ticket, File Write Preflight Review, File Write Apply Hold, File Write Evidence Capture Contract, File Write Result Capture Contract, File Write Rollback Contract, File Write Dry Run Harness, File Write Denied Mutation Review, File Write Operator Review Packet, File Write Cockpit Integration Contract, First Real Guarded File Write Candidate, Controlled Real Guarded File Write MVP Release Candidate. These surfaces start the real guarded file-write adapter spine as deterministic review/dev surfaces only: UI cannot write files, apply diffs, persist approvals, persist evidence, persist results, execute rollback, run dry-runs, call models, call providers, execute adapters, run commands, start runtimes, spawn processes, bind ports, or mutate paths. Future real file writes remain behind explicit operator approval, path guard, diff preview, preflight review, evidence capture, result capture, and rollback contract. Normal user UX should converge into one CodexForge cockpit showing goal, plan, diff, approval, execution state, evidence, result, and recovery in one place; phase pages are dev/test surfaces only.

Phases 1178-1193 cover Real Guarded Command Runner Adapter Boundary, Command Runner Adapter Contract, Command Allowlist Policy, Command Argument Guard, Command Working Directory Guard, Command Environment Guard, Command Approval Ticket, Command Preflight Review, Command Execution Hold, Command Evidence Capture Contract, Command Result Capture Contract, Command Recovery Contract, Command Dry Run Harness, Command Cockpit Integration Contract, First Real Guarded Command Candidate, Controlled Real Guarded Command MVP Release Candidate. These surfaces prepare the real guarded command-runner adapter spine as deterministic review/dev surfaces only: UI cannot run commands, run shell commands, run git commands, run tests, run builds, run smokes, persist approvals, persist evidence, persist results, execute recovery, run dry-runs, call models, call providers, execute adapters, write files, start runtimes, spawn processes, bind ports, forward credentials, or display environment values. Future real commands remain behind explicit operator approval, command allowlist policy, argument guard, working-directory guard, environment guard, evidence capture, result capture, and recovery contract. Normal user UX should converge into one CodexForge cockpit showing goal, plan, command, approval, execution state, evidence, result, and recovery in one place; phase pages are dev/test surfaces only.
