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

CodexForge checkpoint documentation now records through phase 1705.

The latest completed batch is 1690-1705 - Backtest + Paper Trading Engine v1. The latest family adds deterministic backtest paper trading boundary, dataset requirement preview, historical data quality preview, fees slippage assumption preview, survivorship bias check preview, sample period definition preview, backtest metric definition preview, backtest run packet preview, backtest result review preview, paper account boundary preview, paper trade journal preview, paper trading metrics preview, paper evidence map preview, cockpit backtest paper summary, first backtest paper trading candidate, and controlled backtest paper trading release candidate surfaces. Phase pages remain dev test diagnostics only. Latest release candidate: Controlled Backtest Paper Trading Release Candidate. The cockpit now includes safe backtest and paper trading previews below Strategy Lab + Signal Engine. Backtests and paper trading remain review-only. frontend backtest execution still blocked. frontend paper trade placement still blocked. frontend executable signals still blocked. frontend broker connection and trade placement still blocked. frontend live market data calls still blocked. frontend financial advice still blocked. frontend guaranteed profit claims still blocked. frontend trading automation still blocked. Backtesting remains backend-owned. Paper trading remains backend-owned. Risk governor remains required. backend-owned broker boundary remains required. Explicit operator approval remains required. Next likely batch: 1706-1721 - Profit Lockbox + Reinvestment Rules.

The latest simulated runtime execution dry-run review layer covers phases 1130-1145: boundary, intent packet, plan packet, process review, port review, environment review, dependency review, risk review, evidence preview, result preview, failure preview, recovery preview, operator review, execution hold state, First Simulated Runtime Candidate, and Controlled Simulated Runtime Release Candidate. These surfaces remain static, deterministic, preview-only, denied runtime execution by default, and require explicit operator approval before any runtime start, process spawn, port binding, endpoint call, local bridge call, health probe, evidence persistence, result persistence, recovery, queue persistence, dry-run execution, model call, provider call, backend adapter execution, or domain adapter execution can exist.


The simulated adapter execution dry-run review layer covers boundary, intent packet, selection review, capability review, permission review, input review, output review, risk review, evidence preview, result preview, failure preview, recovery preview, operator review, execution hold state, First Simulated Adapter Candidate, and Controlled Simulated Adapter Release Candidate surfaces. Simulated adapter execution previews remain static, deterministic, review-only, preview-only, and approval-gated until explicit operator approval. They represent guarded queue reference, dry-run ticket reference, adapter intent, adapter family, adapter capability preview, permission gate, input contract preview, output contract preview, expected evidence preview, expected result preview, failure preview, recovery preview, operator review state, adapter execution hold state, denied adapter execution state, and explicit approval requirement. They support file-write, command-runner, local-runtime, project-scaffold, provider-model, connector, automation, evidence-store, result-store, recovery, packaging, creative, research, chatbot, game-server, no-op, denied, and preview-only adapter families while showing no real adapter call, backend execution, domain execution, connector execution, provider execution, automation execution, creative generation, research execution, game server launch, local runtime start, file mutation, command execution, queue persistence, dry-run execution, or hidden approvals.

An earlier family is the real guarded file-write adapter MVP review layer for phases 1162-1177. It covers the adapter boundary, adapter contract, path guard, diff builder, approval ticket, preflight review, apply hold, evidence capture contract, result capture contract, rollback contract, dry-run harness, denied mutation review, operator review packet, cockpit integration contract, First Real Guarded File-Write Candidate, and Controlled Real Guarded File-Write MVP Release Candidate surfaces. These surfaces remain static, deterministic, review-only, and approval-gated, keep every mutation blocked until explicit operator approval, and prepare the future single-page CodexForge cockpit to show goal, plan, diff, approval, execution state, evidence, result, and recovery in one place.
