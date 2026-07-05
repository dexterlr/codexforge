# CodexForge Architecture

## Current State
Current checkpoint: Highest detected phase: 3241. Latest completed batch: 3210-3241 - CodexForge Primary Navigation, README, and Workspace Layout Upgrade. CodexForge Primary Navigation, README, and Workspace Layout Upgrade is a god-tier product shell consolidation that moves CodexForge from a phase checklist toward an operator cockpit for controlled AI/video/workflow/trading development.

CodexForge is an operator cockpit for controlled AI/video/workflow/trading development. Current status after previous batch: First Live Text Provider Call Backend Bridge is the latest completed provider bridge if present. Live provider execution remains tightly controlled. Provider keys must never be exposed to frontend. The first live text provider call is limited to one harmless approved prompt: "Return OK and the approved dry-run id." README explains current live readiness status. README explains provider key never exposed to frontend. README explains first live text provider bridge.

Primary product areas: primary navigation product areas are Home / Operator Cockpit, Generate, Projects, Assets, Providers, Workflows, Trading, Audit / Runs, Settings / Safety, and Developer / Checkpoints. Phase/checkpoint routes are preserved but should not dominate the primary product menu; phase checkpoint routes remain preserved and phase checkpoint routes do not dominate primary navigation.

Workspace layout principle: user action first, safety state second, evidence audit third, technical implementation details last. Generation-style pages keep the generation chat box appears first on generation pages, approval state appears above technical metadata, and output preview appears above technical checkpoint details.

Product-shell safety: do not add live provider calls, model calls, prompt sending, streaming, provider SDK imports, frontend provider key reads, credential exposure/storage, browser storage for secrets, fetch/network calls, services/APIs from frontend, workers, render/export/publish execution, or route href loosenings.

Next likely batch: next likely batch: 3242-3273 - First Live Image Provider Call Backend Bridge.

## Overview

CodexForge is organized as a Next.js app with local-first runtime domains. The app favors deterministic planning, explicit approval gates, and preview or review surfaces over hidden automation.

## Frontend Routes

- `/`: product launcher.
- `/ai`: main workspace for chat, evidence-grounded chat, preview diff composition, apply gate review, and dry-run review.
- `/brain`: Brain command center with real 3D graph and 2D fallback.
- `/files`: Files Command Center.
- `/runs`: Operator Run Center.
- `/memory`: memory review, persistence, evidence memory, and Brain merge review.
- `/tasks`: task autopilot, reviewed activation, execution readiness, step runner preview, and read-only step execution.
- `/capabilities`: Capability Cockpit.
- `/creative`: Creative Production Studio, preview-only.
- `/history`: activity and history intelligence.
- `/mission`: Mission Control.
- `/artifacts`: artifact executor, workspace, export, and ingestion review.
- `/entry`: quick launch surface.
- `/clawd`: operator surface.

## Brain Runtime

Location:

```text
src/lib/codexforge/brain
```

Responsibilities:

- Canonical graph schema.
- Append-only runtime event helpers.
- Context assembly.
- Memory ranking and cognitive memory scoring.
- Episode creation.
- Concept synthesis candidates.
- Execution lineage and semantic link helpers.
- Deterministic Brain memory ingestion.
- Brain memory recall and chat recall handoff.
- Real 3D Brain graph plus fallback-safe 2D graph.

## Memory Domains

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
- Convert read-only evidence into review candidates.
- Review graph merge plans.
- Apply approved Brain graph merge only through the existing explicit merge flow.

`src/lib/codexforge/memory-replay` is not present in this checkout.

## Files And Patch Review

Locations:

```text
src/lib/codexforge/files
src/lib/codexforge/patch-preview
src/lib/codexforge/patch-preview-queue
src/lib/codexforge/preview-diff-composer
src/lib/codexforge/patch-application-gate
src/lib/codexforge/apply-evidence-pack
src/lib/codexforge/apply-diff-dry-run
```

Responsibilities:

- File tree and file inspector.
- File risk and safe next action planning.
- Dependency context and File to Brain to Chat bridge.
- Preview-only patch planning.
- Queue reviewed preview items.
- Compose pseudo-diff packages.
- Build apply gate approval packets.
- Build Apply Gate Evidence Packs before any future guarded apply executor.
- Simulate apply-diff readiness without mutation.

Patch review domains do not apply changes by themselves.

## Tasks And Execution Readiness

Locations:

```text
src/lib/codexforge/task-autopilot
src/lib/codexforge/task-activation
src/lib/codexforge/execution-readiness
src/lib/codexforge/step-runner-preview
src/lib/codexforge/read-only-step-execution
```

Responsibilities:

- Review-gated task suggestions.
- Reviewed task activation with no auto-run.
- Step preflight, tool readiness, risk, tests, and approvals.
- Preview approved step runner packets.
- Execute only approved read-only tool steps.

## Operator, Capabilities, And Bridge

Locations:

```text
src/lib/codexforge/operator-run
src/lib/codexforge/capabilities
src/lib/codexforge/local-bridge
src/lib/codexforge/tools
```

Responsibilities:

- Operator run queues, replay packets, artifacts, policy boundaries, and context.
- Adapter readiness and health.
- Tool/capability policy status.
- Local bridge consent and blocked action visibility.
- Tool contracts, adapter registry, policy guard, and approval lifecycle.

Execution posture:

- No unapproved file mutation.
- `apply-diff` requires explicit tool-policy approval.
- `write-file` and `run-command` remain blocked unless future approval paths exist.
- Broker execution is blocked.
- PC/camera control requires explicit future session consent.
- External adapter execution remains blocked or preview-only until future policy-backed execution is implemented.

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

- Creative brief planning.
- Blender, ComfyUI, Unreal, storyboard, render queue, and artifact handoff previews.
- Artifact execution preview and workspace review.
- Export approval and path guard.
- Read-only artifact ingestion candidates.
- Production pack manifest, validation, export, replay, and ledger preview.

Creative and artifact surfaces are approval-gated review surfaces, not external tool launchers.

## Navigation And Mission Control

Locations:

```text
src/lib/codexforge/mission-control
src/lib/codexforge/navigation
```

Responsibilities:

- Mission health, readiness, system map, safe next actions, and safety boundary.
- Global navigation shell and local action bar.

## Data Flow

```text
Page or API request
  -> domain model
  -> deterministic planner/context builder
  -> Brain memory, file context, task context, artifact context, or evidence context where needed
  -> policy/approval/evidence boundary
  -> preview output, review packet, or approved read-only path
  -> local history, graph, memory, run, or artifact review state
```

## Validation

Primary checks:

```powershell
npm run build
npm run smoke:codexforge:server
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-all.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-smoke-groups.ps1
git diff --check
```
