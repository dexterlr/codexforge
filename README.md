# CodexForge

CodexForge is a local-first AI developer workspace for planning, memory, file inspection, safe patch previews, and operator-controlled execution workflows. It is built as a Next.js app with deterministic local fallbacks and smoke-backed feature slices.

The product is currently a foundation-stage engineering runtime. It documents and previews several execution paths, but it does not silently mutate files or run external creative tools.

## Current Product

CodexForge includes:

- Brain runtime with canonical graph types, runtime events, context assembly, memory ranking, episodes, concept candidates, lineage, and semantic link helpers.
- Cognitive memory and deterministic Brain memory ingestion.
- Visual Brain graph and `/brain` command center for memory, topology, lineage, runtime health, focus, recommendations, and graph inspection.
- `/files` command center for file tree browsing, file intelligence, safe next actions, file risk, and File to Brain to Chat workflow context.
- Safe Patch Preview system for preview-only patch planning, diff review, risk review, rollback notes, and test planning.
- Capability Cockpit at `/capabilities` for adapter readiness, policy boundaries, artifact ledger previews, and blocked execution visibility.
- Creative Production Studio at `/creative` for preview-only Blender, ComfyUI, Unreal, storyboard, render queue, and artifact planning.
- History and activity intelligence at `/history`.
- Tool adapter registry, capability bridge, tool policy guard, approval lifecycle, and retry visibility.
- Smoke scripts that guard product surfaces, safety posture, Brain runtime, files, capabilities, patch preview, creative planning, and brand cleanup.

## Architecture

CodexForge is organized around local deterministic domains:

- `src/lib/codexforge/brain`: provider routing, graph memory, Brain UI components, runtime, ingestion, health, topology, replay, recommendations, and predictive context.
- `src/lib/codexforge/files`: file command center, file preview, dependency tracing, file risk, file safe planning, and File to Brain to Chat bridge data.
- `src/lib/codexforge/patch-preview`: preview-only patch planning, approval boundary display, risk board, rollback plan, and test plan.
- `src/lib/codexforge/capabilities`: capability cockpit, adapter readiness, artifact ledger preview, approval boundary, and blocked execution panels.
- `src/lib/codexforge/creative`: preview-only creative production planning for Blender, ComfyUI, Unreal, storyboards, render queues, and artifact handoff.
- `src/lib/codexforge/tools`: tool contracts, adapter registry, policy guard, approval lifecycle, and safe local tool implementations.
- `src/app/api/operator`: operator plan, diff, apply, snapshot, checkpoint, test, and run-state routes.

Core planning prefers deterministic local logic. AI/provider integrations are optional and must remain subordinate to the product safety model.

## Routes

- `/`: CodexForge home and product surface launcher.
- `/ai`: main workspace for chat, structured replies, planning, memory context, and execution-state visibility.
- `/brain`: Brain command center and visual memory graph.
- `/files`: Files command center and file intelligence workflow.
- `/history`: local activity and history intelligence.
- `/capabilities`: Capability Cockpit and adapter readiness surface.
- `/creative`: Creative Production Studio, preview-only.
- `/entry`: quick launch surface, still present.
- `/clawd`: operator surface, still present.

## Feature Overview

### Brain Command Center

The Brain surface presents graph memory, memory clusters, runtime health, topology, lineage, recommendations, replay, focus drilldown, and command-oriented navigation.

### Visual Brain Graph

The graph view displays local memory nodes, edges, metadata, semantic topology, and relationships. It is an inspection and reasoning surface, not an autonomous executor.

### Brain Memory Ingestion

Memory ingestion normalizes real local inputs into Brain memory structures with deterministic IDs, source metadata, dedupe logic, and smoke coverage.

### Files Command Center

The files surface provides a project file tree, file inspector, dependency context, file risk, safe next actions, workflow rail, and preview-oriented actions.

### File to Brain to Chat Workflow

File intelligence can be bridged into Brain context and chat handoff panels so file-specific facts, risks, and next actions can inform later reasoning without direct mutation.

### Safe Patch Preview

Patch Preview shows candidate changes, risks, approval boundary, rollback notes, and test planning. It is preview-only and does not apply changes by itself.

### Capability Cockpit

The cockpit shows adapter readiness, policy gates, artifact ledger previews, blocked execution status, and future capability workflow posture.

### Creative Production Studio

Creative Studio plans Blender scenes, ComfyUI workflows, Unreal levels, storyboards, render queues, and artifact handoff. It is preview-only planning and does not execute external tools.

### History / Activity Intelligence

The history surface tracks local activity and review context so plans, launches, and workspace continuity can be inspected without depending on a remote service.

### Tool Adapter Registry

The registry describes available or planned tools, readiness, policy constraints, and blocked execution posture. Registry presence is not permission to execute a tool.

### Policy Guard / Approval Boundary

Tool execution decisions are routed through policy checks and visible approval state. File mutation and external execution require explicit future approval paths.

### Smoke Suite

The smoke suite checks product surfaces, Brain runtime, files, file workflows, capability cockpit, patch preview, creative planning, policy boundaries, and brand cleanup.

## Safety Model

CodexForge is intentionally conservative:

- File mutation is approval-gated and not automatic.
- Patch Preview is preview-only.
- Creative Studio is preview-only.
- Capability Cockpit does not execute Blender, Unreal, ComfyUI, broker jobs, render jobs, or PC/camera control.
- Broker execution is blocked.
- There is no Blender execution.
- There is no Unreal execution.
- There is no ComfyUI execution.
- There is no render execution.
- There is no PC/camera automation.
- PC/camera features require explicit future session consent and are not active automation.
- There is no unapproved file mutation.
- Local deterministic logic is preferred for core planning and safety decisions.

## Development

From the frontend directory:

```powershell
cd .\frontend
npm install
npm run dev
```

Open:

```text
http://localhost:3000/
```

## Build And Smoke Commands

Core validation:

```powershell
npm run build
npm run smoke:codexforge:server
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-all.ps1
```

Individual smoke scripts present in this repo include:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-brain-runtime.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-brain-graph-ui.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-brain-memory-ingestion.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-files-command-center.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-file-workflow.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-file-brain-chat-workflow.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-capability-cockpit.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-patch-preview.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-creative-production-studio.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-brand-clean.ps1
```

Useful local checks:

```powershell
npm run lint
npm run typecheck
git diff --check
```

## Current Phase Status

Working foundation:

- Brain runtime and cognitive memory foundations.
- Real deterministic Brain memory ingestion.
- Visual Brain graph and `/brain` command center.
- `/files`, `/capabilities`, and `/creative` command centers.
- File to Brain to Chat bridge.
- Safe Patch Preview.
- Preview-only artifact planning.
- Tool policy guard and approval-boundary visibility.
- Local-first smoke-backed architecture.

Not production-ready:

- Approval-gated apply pipeline still needs stronger end-to-end UX and persistence.
- External adapter execution is intentionally blocked or preview-only.
- Artifact ledger persistence is not a complete production ledger.
- Creative workflows are plans, not render jobs.
- Broker execution and PC/camera control are not active.

## Known Limitations

- Some paths still reflect repo lineage and local test-harness history.
- `/entry` and `/clawd` remain as supporting surfaces while navigation continues to consolidate.
- Several adapter capabilities are readiness or planning surfaces only.
- Local storage compatibility may include migrated local entries from older app states; this is legacy import compatibility, not active old-product branding.

## Near-Term Roadmap

- Operator Runs Timeline.
- Approval-gated apply pipeline.
- Real adapter execution behind policies.
- Artifact ledger persistence.
- Better navigation and global command palette.
- More real memory sources.
- Project onboarding and import.

## Product Posture

CodexForge should stay grounded: local-first, deterministic where possible, explicit about approval, and honest about preview-only capabilities.
