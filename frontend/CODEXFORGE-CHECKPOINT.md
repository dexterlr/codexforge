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

CodexForge checkpoint documentation now records through phase 1177.

The latest simulated runtime execution dry-run review layer covers phases 1130-1145: boundary, intent packet, plan packet, process review, port review, environment review, dependency review, risk review, evidence preview, result preview, failure preview, recovery preview, operator review, execution hold state, First Simulated Runtime Candidate, and Controlled Simulated Runtime Release Candidate. These surfaces remain static, deterministic, preview-only, denied runtime execution by default, and require explicit operator approval before any runtime start, process spawn, port binding, endpoint call, local bridge call, health probe, evidence persistence, result persistence, recovery, queue persistence, dry-run execution, model call, provider call, backend adapter execution, or domain adapter execution can exist.


The latest family is the real guarded file-write adapter MVP review layer: Real Guarded File Write Adapter Boundary, File Write Adapter Contract, File Write Path Guard, File Write Diff Builder, File Write Approval Ticket, File Write Preflight Review, File Write Apply Hold, File Write Evidence Capture Contract, File Write Result Capture Contract, File Write Rollback Contract, File Write Dry Run Harness, File Write Denied Mutation Review, File Write Operator Review Packet, File Write Cockpit Integration Contract, First Real Guarded File Write Candidate, and Controlled Real Guarded File Write MVP Release Candidate. These deterministic review/dev surfaces start the real file-write adapter spine while the UI remains blocked from writing files, applying diffs, persisting approvals, persisting evidence, persisting results, executing rollback, running dry-runs, calling models, calling providers, executing adapters, running commands, starting runtimes, spawning processes, binding ports, or mutating paths. Future real file writes remain behind explicit operator approval, path guard, diff preview, preflight review, evidence capture, result capture, and rollback contract.


Phases 1162-1177 cover Real Guarded File Write Adapter Boundary, File Write Adapter Contract, File Write Path Guard, File Write Diff Builder, File Write Approval Ticket, File Write Preflight Review, File Write Apply Hold, File Write Evidence Capture Contract, File Write Result Capture Contract, File Write Rollback Contract, File Write Dry Run Harness, File Write Denied Mutation Review, File Write Operator Review Packet, File Write Cockpit Integration Contract, First Real Guarded File Write Candidate, Controlled Real Guarded File Write MVP Release Candidate. These surfaces start the real guarded file-write adapter spine as deterministic review/dev surfaces only: UI cannot write files, apply diffs, persist approvals, persist evidence, persist results, execute rollback, run dry-runs, call models, call providers, execute adapters, run commands, start runtimes, spawn processes, bind ports, or mutate paths. Future real file writes remain behind explicit operator approval, path guard, diff preview, preflight review, evidence capture, result capture, and rollback contract. Normal user UX should converge into one CodexForge cockpit showing goal, plan, diff, approval, execution state, evidence, result, and recovery in one place; phase pages are dev/test surfaces only.
