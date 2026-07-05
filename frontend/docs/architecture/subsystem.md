# Subsystems

## Current State
Current checkpoint: Highest detected phase: 3273. Latest completed batch: 3242-3273 - First Live Image Provider Call Backend Bridge. First Live Image Provider Call Backend Bridge is the current image-provider bridge surface and the first tightly controlled live image provider call bridge. It remains review-only, disabled by default, and backend-owned.

CodexForge is an operator cockpit for controlled AI/video/workflow/trading development. Current status after latest batch: image provider only, single approved image provider only, one harmless approved image prompt only, one tiny approved test image only, and the approved prompt marker: "Create one tiny neutral test image for the approved dry-run id." Manual operator approval required before live image provider call. Backend-owned credential reference only. Provider key never exposed to frontend. Provider token never exposed to frontend. Frontend secret exposure remains blocked. Image bridge remains backend-owned. Image result review remains audit backed. Live image call cannot execute until a backend-owned execution runtime exists. README explains current live readiness status. README explains provider key never exposed to frontend. README explains first live image provider bridge.

Previous product-shell batch remains covered: 3210-3241 - CodexForge Primary Navigation, README, and Workspace Layout Upgrade. Historical product-shell checkpoint marker: Highest detected phase: 3241. Primary navigation product areas remain Home / Operator Cockpit, Generate, Projects, Assets, Providers, Workflows, Trading, Audit / Runs, Settings / Safety, and Developer / Checkpoints. Phase checkpoint routes remain preserved and phase checkpoint routes do not dominate primary navigation.

Workspace layout principle: user action first, safety state second, evidence audit third, technical implementation details last. Image bridge pages keep the main action/review panel before technical metadata, safety state before technical metadata, evidence/audit before technical metadata, and technical implementation details lower on the page.

Product-shell safety: do not add live frontend provider calls, model calls, prompt sending, streaming, provider SDK imports, frontend provider key reads, credential exposure/storage, browser storage for secrets, localStorage, sessionStorage, IndexedDB, cookies, fetch/network calls, services/APIs from frontend, workers, render/export/publish execution, platform upload, download generation, signed URL creation, file writes from the app, shell/process/command execution from the app, runtime deploy, or route href loosenings.

Next likely batch: next likely batch: 3274-3305 - First Live Audio Provider Call Backend Bridge.

## Brain

Location:

```text
src/lib/codexforge/brain
```

Responsibilities:

- Brain runtime.
- Cognitive memory.
- Graph schema and storage.
- Deterministic memory ingestion.
- Context assembly, memory ranking, recall, and chat recall handoff.
- Runtime health, topology, lineage, replay, recommendations, focus panels, real 3D graph, and 2D fallback.

## Memory

Locations:

```text
src/lib/codexforge/memory-review
src/lib/codexforge/memory-persistence
src/lib/codexforge/evidence-memory
src/lib/codexforge/brain-merge
src/lib/codexforge/approved-brain-merge
```

Responsibilities:

- Review memory candidates before promotion.
- Persist approved memory events.
- Convert read-only evidence into reviewable memory candidates.
- Review Brain merge plans.
- Apply approved Brain merge only through explicit approval flow.

## Files

Location:

```text
src/lib/codexforge/files
```

Responsibilities:

- Files Command Center.
- File inspector and file tree.
- File risk and safe next action.
- Dependency and predictive context.
- File to Brain to Chat bridge.

## Patch Review

Locations:

```text
src/lib/codexforge/patch-preview
src/lib/codexforge/patch-preview-queue
src/lib/codexforge/preview-diff-composer
src/lib/codexforge/patch-application-gate
src/lib/codexforge/apply-evidence-pack
src/lib/codexforge/apply-diff-dry-run
```

Responsibilities:

- Patch plan preview.
- Preview queue review.
- Pseudo-diff composition.
- Apply approval packet and mutation firewall.
- Apply Gate Evidence Pack before any future real apply executor.
- Dry-run simulation and conflict review.

These subsystems do not apply changes by themselves.

## Tasks And Execution

Locations:

```text
src/lib/codexforge/task-autopilot
src/lib/codexforge/task-activation
src/lib/codexforge/execution-readiness
src/lib/codexforge/step-runner-preview
src/lib/codexforge/read-only-step-execution
src/lib/codexforge/operator-run
```

Responsibilities:

- Review-gated task suggestions.
- Reviewed task activation.
- Execution readiness.
- Approved step runner preview.
- Approved read-only step execution.
- Operator run queues, replay packets, artifact previews, and run context.

## Capabilities And Bridge

Locations:

```text
src/lib/codexforge/capabilities
src/lib/codexforge/local-bridge
src/lib/codexforge/tools
```

Responsibilities:

- Capability Cockpit.
- Adapter readiness.
- Approval boundary and blocked execution status.
- Local bridge consent and audit trail.
- Tool contracts, adapter registry, and policy guard.

These subsystems do not execute Blender, Unreal, ComfyUI, render jobs, broker jobs, or PC/camera control from preview UI.

## Creative And Artifacts

Locations:

```text
src/lib/codexforge/creative
src/lib/codexforge/artifact-executor
src/lib/codexforge/artifact-workspace
src/lib/codexforge/artifact-export-flow
src/lib/codexforge/artifact-ingestion
src/lib/codexforge/production-pack
```

Responsibilities:

- Creative Production Studio.
- Creative brief planning.
- Blender scene, ComfyUI workflow, Unreal level, storyboard, and render queue previews.
- Artifact workspace, executor, export approval, ingestion candidates, and production pack review.

## Mission And Navigation

Locations:

```text
src/lib/codexforge/mission-control
src/lib/codexforge/navigation
```

Responsibilities:

- Mission health, readiness, safe next actions, and safety boundary.
- Global navigation shell and local action bar.
