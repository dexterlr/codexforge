# Subsystems

## Current State
Current checkpoint: Highest detected phase: 3241. Latest completed batch: 3210-3241 - CodexForge Primary Navigation, README, and Workspace Layout Upgrade. CodexForge Primary Navigation, README, and Workspace Layout Upgrade is a god-tier product shell consolidation that moves CodexForge from a phase checklist toward an operator cockpit for controlled AI/video/workflow/trading development.

CodexForge is an operator cockpit for controlled AI/video/workflow/trading development. Current status after previous batch: First Live Text Provider Call Backend Bridge is the latest completed provider bridge if present. Live provider execution remains tightly controlled. Provider keys must never be exposed to frontend. The first live text provider call is limited to one harmless approved prompt: "Return OK and the approved dry-run id." README explains current live readiness status. README explains provider key never exposed to frontend. README explains first live text provider bridge.

Primary product areas: primary navigation product areas are Home / Operator Cockpit, Generate, Projects, Assets, Providers, Workflows, Trading, Audit / Runs, Settings / Safety, and Developer / Checkpoints. Phase/checkpoint routes are preserved but should not dominate the primary product menu; phase checkpoint routes remain preserved and phase checkpoint routes do not dominate primary navigation.

Workspace layout principle: user action first, safety state second, evidence audit third, technical implementation details last. Generation-style pages keep the generation chat box appears first on generation pages, approval state appears above technical metadata, and output preview appears above technical checkpoint details.

Product-shell safety: do not add live provider calls, model calls, prompt sending, streaming, provider SDK imports, frontend provider key reads, credential exposure/storage, browser storage for secrets, fetch/network calls, services/APIs from frontend, workers, render/export/publish execution, or route href loosenings.

Next likely batch: next likely batch: 3242-3273 - First Live Image Provider Call Backend Bridge.

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
