# CodexForge

CodexForge is a local-first AI developer workspace for planning, memory, file inspection, safe patch previews, evidence review, and operator-controlled execution workflows. It is built as a Next.js app with deterministic local domains, explicit approval boundaries, and smoke-backed product slices.

The product is a foundation-stage engineering runtime. It can prepare and review many future execution paths, but it does not silently mutate files, bypass approval gates, or run external creative or broker tools from preview UI.

## Current Product

CodexForge includes:

- Brain runtime with canonical graph types, runtime events, context assembly, memory ranking, episodes, lineage, semantic links, health dashboards, recommendations, and deterministic memory ingestion.
- Cognitive memory, approved memory persistence, memory review and promotion queue, evidence memory review, approved Brain graph merge, Brain memory recall, and chat recall context.
- Real 3D Brain graph built with WebGL, Three.js, React Three Fiber, and Drei, plus a fallback-safe 2D Brain graph.
- `/brain` command center for memory, topology, lineage, replay, runtime health, focus, recommendations, and graph inspection.
- `/files` command center and File to Brain to Chat workflow for file context, risk, handoffs, and preview-oriented actions.
- Task Memory Autopilot, reviewed task activation, Execution Readiness cockpit, Approved Step Runner Preview, and approved read-only step execution.
- Evidence-Grounded Chat, Safe Patch Preview, Patch Preview Queue, Preview Diff Composer, Patch Application Gate, and Apply-Diff Dry Run simulation.
- Operator Run Center, Capability Cockpit, Local Bridge, Mission Control, global navigation shell, header dedupe, and product surface planning.
- Creative Production Studio, artifact workspace, artifact executor, artifact export flow, artifact ingestion, and production pack builder.
- Policy guard, approval boundary visibility, and smoke-backed architecture.

## Architecture

CodexForge is organized around deterministic local domains:

- `src/lib/codexforge/brain`: Brain runtime, graph memory, ingestion, health, topology, replay, recommendations, recall, 3D graph UI, and 2D fallback.
- `src/lib/codexforge/memory-review`: memory candidate review and promotion queue.
- `src/lib/codexforge/memory-persistence`: approved memory event persistence.
- `src/lib/codexforge/approved-brain-merge` and `src/lib/codexforge/brain-merge`: graph merge review and approved merge flow.
- `src/lib/codexforge/brain-recall` and `src/lib/codexforge/chat-recall`: deterministic recall and visible chat grounding context.
- `src/lib/codexforge/evidence-memory`: read-only evidence to memory review candidates.
- `src/lib/codexforge/evidence-grounded-chat`: selected evidence, citations, and grounded chat handoffs.
- `src/lib/codexforge/files`: Files Command Center, file risk, dependency context, file workflows, and File to Brain to Chat bridge data.
- `src/lib/codexforge/patch-preview`: preview-only patch planning and Safe Patch Preview.
- `src/lib/codexforge/patch-preview-queue`: queue for reviewed patch preview handoffs.
- `src/lib/codexforge/preview-diff-composer`: pseudo-diff composition, verification plan, rollback plan, and approval boundary.
- `src/lib/codexforge/patch-application-gate`: explicit apply gate packet, request preview, mutation firewall, verification gate, and rollback gate.
- `src/lib/codexforge/apply-diff-dry-run`: simulation-only apply-diff review.
- `src/lib/codexforge/task-autopilot`: review-gated task suggestions.
- `src/lib/codexforge/task-activation`: reviewed task activation and no-auto-run handoff.
- `src/lib/codexforge/execution-readiness`: step preflight, tool posture, risk, tests, and approval readiness.
- `src/lib/codexforge/step-runner-preview` and `src/lib/codexforge/read-only-step-execution`: approved preview and read-only step execution paths.
- `src/lib/codexforge/operator-run`: Operator Run Center, queues, policy boundary, replay, artifacts, and context.
- `src/lib/codexforge/capabilities`: Capability Cockpit, adapter readiness, policy boundaries, and blocked execution visibility.
- `src/lib/codexforge/local-bridge`: Jarvis local bridge consent, adapter matrix, blocked action notices, and audit trail.
- `src/lib/codexforge/creative`: Creative Production Studio planning for Blender, ComfyUI, Unreal, storyboards, render queues, and handoffs.
- `src/lib/codexforge/artifact-executor`, `src/lib/codexforge/artifact-workspace`, `src/lib/codexforge/artifact-export-flow`, and `src/lib/codexforge/artifact-ingestion`: artifact preview, guarded workspace, export approval, and read-only ingestion candidates.
- `src/lib/codexforge/production-pack`: production pack builder, manifest, validation, export, replay, and ledger preview.
- `src/lib/codexforge/mission-control`: health, readiness, system map, safe next actions, and safety boundary.
- `src/lib/codexforge/navigation`: global navigation shell and local action bar.
- `src/lib/codexforge/tools`: contracts, adapter registry, policy guard, approval lifecycle, and safe local tool implementations.

`src/lib/codexforge/memory-replay` is not present in this checkout.

Core planning prefers deterministic local logic. AI/provider integrations are optional and must stay subordinate to the safety model.

## Routes

- `/`: CodexForge home and product surface launcher.
- `/ai`: main workspace for chat, structured replies, planning, memory context, evidence-grounded chat, preview diff composition, and apply gate review.
- `/brain`: Brain command center with real 3D graph and 2D fallback.
- `/files`: Files Command Center and file intelligence workflow.
- `/runs`: Operator Run Center.
- `/memory`: memory review, persistence, evidence memory, and Brain merge review.
- `/tasks`: task autopilot, reviewed activation, execution readiness, step runner preview, and read-only step execution.
- `/capabilities`: Capability Cockpit.
- `/creative`: Creative Production Studio, preview-only.
- `/history`: local activity and history intelligence.
- `/mission`: Mission Control.
- `/artifacts`: artifact executor, workspace, export, and ingestion review.
- `/entry`: quick launch surface.
- `/clawd`: operator surface.

## Feature Overview

### Brain And Memory

The Brain surface presents real 3D graph memory with a 2D fallback, memory clusters, runtime health, topology, lineage, recommendations, replay, focus drilldown, recall, and command-oriented navigation. The graph visual layer is an inspection surface and does not mutate graph state.

Approved memory persistence writes only approved memory events. Memory review, evidence memory review, Brain merge review, and approved Brain graph merge keep review and merge boundaries visible.

### Files And Patch Review

Files Command Center provides file tree browsing, file inspector, dependency context, risk, safe next actions, workflow rail, and File to Brain to Chat handoffs. Safe Patch Preview, Patch Preview Queue, Preview Diff Composer, Patch Application Gate, and Apply-Diff Dry Run prepare review artifacts before any future guarded apply.

### Tasks And Execution Readiness

Task Autopilot proposes review-gated tasks. Reviewed Task Activation creates active plan previews and handoff prompts without auto-run. Execution Readiness, Step Runner Preview, and read-only step execution make tool posture, risk, tests, approvals, and evidence visible before any broader execution path.

### Operator, Capabilities, And Bridge

Operator Run Center previews run queues, policy boundaries, replay packets, artifact ledgers, and read-only context. Capability Cockpit and Local Bridge expose readiness, consent, and blocked execution posture without launching external adapters.

### Creative And Artifacts

Creative Production Studio plans creative work for Blender, ComfyUI, Unreal, storyboards, render queues, and artifact handoff. Artifact workspace, executor, export flow, ingestion, and production pack builder keep generated artifacts in explicit review and export flows.

### Mission Control

Mission Control summarizes health, readiness, system map, safe next actions, and the product safety boundary across Brain, memory, files, tasks, execution, capabilities, creative, artifacts, bridge, and chat.

## Safety Model

CodexForge is intentionally conservative:

- No silent mutation.
- File mutation is approval-gated and not automatic.
- Safe Patch Preview, Preview Diff Composer, Apply Evidence Pack, Patch Application Gate, and Apply-Diff Dry Run prepare evidence, approval, and simulation artifacts only.
- Patch Application Gate prepares evidence and approval state; it is not an uncontrolled apply executor.
- `apply-diff` requires explicit tool-policy approval.
- `write-file` and `run-command` remain blocked unless a future explicit approval path exists.
- Broker execution is blocked.
- PC/camera features require explicit future session consent and are not active automation.
- Creative external tools remain approval-gated; the frontend does not execute Blender, Unreal, ComfyUI, render jobs, or broker jobs.
- The graph visual layer does not mutate graph state.
- The real 3D Brain graph has a 2D fallback.
- Local deterministic logic is preferred for core planning and safety decisions.

## Dependencies

The 3D Brain graph uses:

- `three`
- `@react-three/fiber`
- `@react-three/drei`

The WebGL graph is isolated to the Brain graph visual layer and fallback-safe. If WebGL is unavailable, the 2D graph remains the review surface.

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
git diff --check
```

Grouped smoke runners:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-core.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-ui.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-brain-suite.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-memory-suite.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-files-suite.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-execution-suite.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-artifacts-suite.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-creative-suite.ps1
```

Focused checks:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-smoke-groups.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-apply-evidence-pack.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-brand-clean.ps1
```

## Current Phase Status

Working foundation:

- Brain runtime, cognitive memory, real deterministic Brain memory ingestion, recall, and graph review.
- Real 3D Brain graph with fallback-safe 2D graph.
- Memory review, approved memory persistence, evidence memory review, and approved Brain graph merge.
- Files Command Center, File to Brain to Chat workflow, and patch preview pipeline.
- Evidence-grounded chat, task autopilot, reviewed task activation, execution readiness, step runner preview, and read-only step execution.
- Operator Run Center, Capability Cockpit, Creative Production Studio, Artifact workspace/executor/export/ingestion, Production Pack Builder, Local Bridge, Mission Control, and global navigation shell.
- Tool policy guard, approval-boundary visibility, and smoke-backed architecture.

Not production-ready:

- A real guarded apply executor is not implemented in this phase.
- External adapter execution remains blocked or preview-only.
- Artifact ledger persistence is not a complete production ledger.
- Creative workflows are plans, not render jobs.
- Broker execution and PC/camera control are not active.

## Known Limitations

- Some local paths still reflect repository lineage or test-harness history.
- `/entry` and `/clawd` remain supporting surfaces while navigation continues to consolidate.
- Several adapter capabilities are readiness or planning surfaces only.
- Legacy local storage compatibility may include migrated local entries from older app states; this is import compatibility, not active old-product branding.

## Near-Term Roadmap

- Apply Gate Evidence Pack.
- Guarded apply executor behind policy.
- Persistent artifact ledger.
- Full memory replay/merge audit.
- Adapter execution behind local bridge and explicit policies.
- Project onboarding/import.
- Better graph data volume and clustering.

## Product Posture

CodexForge should stay grounded: local-first, deterministic where possible, explicit about approval, and honest about preview-only capabilities.
