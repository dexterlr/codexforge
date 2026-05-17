# CodexForge Frontend

This directory contains the Next.js frontend for CodexForge, a local-first AI developer workspace with Brain runtime, cognitive memory, real 3D graph inspection, file intelligence, evidence-grounded chat, Safe Patch Preview, guarded apply preparation, operator run review, artifact workflows, and smoke-backed safety boundaries.

For the full product overview, see `../README.md`.

## Current Product

CodexForge currently includes:

- Brain runtime, cognitive memory, deterministic Brain memory ingestion, Brain memory recall, and chat recall context.
- Real 3D Brain graph powered by Three.js, React Three Fiber, and Drei, with a fallback-safe 2D graph view.
- Approved memory persistence, memory review and promotion queue, approved Brain graph merge, and evidence memory review.
- Task Memory Autopilot, reviewed task activation, Execution Readiness, Approved Step Runner Preview, and approved read-only step execution.
- Evidence-Grounded Chat, Safe Patch Preview, Patch Preview Queue, Preview Diff Composer, Patch Application Gate, and Apply-Diff Dry Run simulation.
- Files Command Center and File to Brain to Chat workflow.
- Operator Run Center, Capability Cockpit, Local Bridge, Mission Control, global navigation shell, and header dedupe.
- Creative Production Studio, artifact workspace, artifact executor, artifact export flow, artifact ingestion, and production pack builder.
- Policy guard, approval boundary visibility, product surface planning, and smoke-backed architecture.

## Main Routes

- `/`: product launcher.
- `/ai`: main chat/workspace surface.
- `/brain`: Brain command center with real 3D graph and 2D fallback.
- `/files`: Files Command Center and File to Brain to Chat workflow.
- `/runs`: Operator Run Center.
- `/memory`: memory review, persistence, evidence memory, and graph merge review.
- `/tasks`: task autopilot, reviewed task activation, execution readiness, and step runner review.
- `/capabilities`: Capability Cockpit.
- `/creative`: Creative Production Studio, preview-only.
- `/history`: activity and history intelligence.
- `/mission`: Mission Control.
- `/artifacts`: artifact executor, workspace, export, and ingestion review.
- `/entry`: quick launch surface.
- `/clawd`: operator surface.

## Dependencies

The real 3D Brain graph uses `three`, `@react-three/fiber`, and `@react-three/drei`. The WebGL graph is isolated to the Brain graph visual layer and remains fallback-safe through the 2D graph path.

## Architecture

Key frontend domains live under `src/lib/codexforge/`: `brain`, `memory-review`, `memory-persistence`, `evidence-memory`, `evidence-grounded-chat`, `files`, `patch-preview`, `patch-preview-queue`, `preview-diff-composer`, `patch-application-gate`, `apply-evidence-pack`, `task-autopilot`, `task-activation`, `execution-readiness`, `operator-run`, `capabilities`, `local-bridge`, `creative`, `artifact-executor`, `artifact-workspace`, `artifact-export-flow`, `artifact-ingestion`, `production-pack`, `mission-control`, and `navigation`.

`src/lib/codexforge/memory-replay` is not present in this checkout.

## Safety Posture

- No silent mutation.
- Patch Preview, Preview Diff Composer, Apply Evidence Pack, Patch Application Gate, and Apply-Diff Dry Run are review/preview artifacts, not uncontrolled apply executors.
- `apply-diff` requires explicit tool-policy approval and is not called by UI review panels.
- `write-file` and `run-command` remain blocked unless a future explicit approval path is implemented.
- Broker execution is blocked.
- PC/camera features require explicit future session consent.
- Creative external tools remain approval-gated and preview-only from the frontend.
- The graph visual layer does not mutate graph state; the 3D Brain graph has a 2D fallback.

## Development

```powershell
npm install
npm run dev
npm run build
```

## Smoke Commands

The smoke suite is organized into grouped runners so the full suite is not one flat wall of scripts.

```powershell
npm run smoke:codexforge:server
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-all.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-core.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-brain-suite.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-execution-suite.ps1
```

Focused examples:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-smoke-groups.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-apply-evidence-pack.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-brand-clean.ps1
```

## Roadmap

- Apply Gate Evidence Pack.
- Guarded apply executor behind policy.
- Persistent artifact ledger.
- Full memory replay/merge audit.
- Adapter execution behind local bridge and explicit policies.
- Project onboarding/import.
- Better graph data volume and clustering.
