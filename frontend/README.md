# CodexForge Frontend

This directory contains the Next.js frontend for CodexForge, a local-first AI developer workspace with Brain runtime, cognitive memory, real 3D graph inspection, file intelligence, evidence-grounded chat, Safe Patch Preview, guarded apply preparation, operator run review, artifact workflows, and smoke-backed safety boundaries.

For the full product overview, see `../README.md`.

## Current Stage

CodexForge is now a foundation-stage local developer workspace. It has real deterministic frontend domains, route-backed review surfaces, smoke coverage, and explicit safety boundaries. Some areas are runtime-ready review surfaces; creative execution, provider execution, and broad apply automation remain preview-only or approval-gated.

Canonical frontend path:

```text
C:\ai-lab\projects\openclaw-workspace\repos\<current-project>\frontend
```

See `docs/WORKSPACE_MAP.md` before using duplicate or scratch copies.

## Current Product

CodexForge currently includes:

- Novice onboarding, assisted coding, validation capture, recovery, review inbox, and run history.
- Brain runtime, cognitive memory, deterministic Brain memory ingestion, Brain memory recall, and chat recall context.
- AI Subscription Router for local/API/provider profiles, model catalog metadata, subscription tiers, deterministic task classification, approximate token budgets, route recommendations, fallback route visibility, and usage ledger preview.
- Local machine, provider readiness, env readiness, and safe local provider probe previews.
- Creative and video planning for local-first draft workflows, render planning, review, recovery, and finishing.
- Repo hygiene, product readiness, quality audit, consolidation, validation, and stabilization surfaces.
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
- `/ai-router`: AI Subscription Router cockpit for local-first, subscription-efficient model routing metadata.
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
- `/repo-hygiene`: generated-file, workspace, test-script, secret, and docs cleanup posture.
- `/entry`: quick launch surface.
- `/clawd`: operator surface.

## Dependencies

The real 3D Brain graph uses `three`, `@react-three/fiber`, and `@react-three/drei`. The WebGL graph is isolated to the Brain graph visual layer and remains fallback-safe through the 2D graph path.

## Architecture

Key frontend domains live under `src/lib/codexforge/`: `brain`, `ai-router`, `memory-review`, `memory-persistence`, `evidence-memory`, `evidence-grounded-chat`, `files`, `patch-preview`, `patch-preview-queue`, `preview-diff-composer`, `patch-application-gate`, `apply-evidence-pack`, `task-autopilot`, `task-activation`, `execution-readiness`, `operator-run`, `capabilities`, `local-bridge`, `creative`, `artifact-executor`, `artifact-workspace`, `artifact-export-flow`, `artifact-ingestion`, `production-pack`, `mission-control`, and `navigation`.

`src/lib/codexforge/memory-replay` is not present in this checkout.

## AI Subscription Router

The AI Router is a local deterministic control plane. Operators can describe local model servers, OpenAI-compatible APIs, Anthropic-compatible APIs, Google/Gemini-compatible APIs, OpenRouter-compatible APIs, custom HTTP providers, and manual subscription profiles without storing secrets in the browser.

Routing uses provider metadata, model capability metadata, manual subscription tiers, task classification, approximate token estimates, privacy posture, context fit, and fallback reliability to recommend the best provider/model/tier for a task. It does not call external providers, does not query live pricing, and does not create real billing records. Token estimates are approximate chars/4 planning signals only.

Provider configuration remains operator-controlled. API keys must stay in approved server-side environment configuration, while local profiles such as Ollama or LM Studio are represented as metadata until a future approved adapter is connected.

## Safety Posture

- No silent mutation.
- Patch Preview, Preview Diff Composer, Apply Evidence Pack, Patch Application Gate, and Apply-Diff Dry Run are review/preview artifacts, not uncontrolled apply executors.
- `apply-diff` requires explicit tool-policy approval and is not called by UI review panels.
- `write-file` and `run-command` remain blocked unless a future explicit approval path is implemented.
- No AI provider secrets stored in browser storage; router profiles are metadata/control-plane only.
- AI Router token and cost estimates are approximate and never treated as billing truth.
- Broker execution is blocked.
- PC/camera features require explicit future session consent.
- Creative external tools remain approval-gated and preview-only from the frontend.
- The graph visual layer does not mutate graph state; the 3D Brain graph has a 2D fallback.
- Repo hygiene UI does not delete files or run commands.
- Generated folders, local env files, runtime state, dependency folders, build output, and backup folders should not be committed.

## Generated Files

Generated and local-only state belongs outside review:

```text
node_modules/
.next/
out/
dist/
build/
coverage/
.operator/
.codexforge/
.checkpoints/
_codexforge-backups/
unpushed-patches/
```

Do commit intentional source, smoke scripts, package lockfiles, README files, and real docs.

## Development

```powershell
npm install
npm run dev
npm run typecheck
npm run test
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
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-repo-hygiene.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-ai-router.ps1
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
