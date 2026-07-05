# CodexForge Architecture

## Current State
Current checkpoint: Highest detected phase: 3305. Latest completed batch: 3274-3305 - First Live Audio Provider Call Backend Bridge. First Live Audio Provider Call Backend Bridge is the current audio-provider bridge surface and the first tightly controlled live audio provider call bridge. It remains review-only, disabled by default, backend-owned, and blocked until a backend-owned execution runtime exists.

CodexForge is an operator cockpit for controlled AI/video/workflow/trading development. Current status after latest batch: First Live Audio Provider Call Backend Bridge is now the current audio-provider bridge surface. Live provider execution remains tightly controlled. Provider keys must never be exposed to frontend. The first live audio provider call concept is limited to audio provider only, single approved audio provider only, one harmless approved audio prompt only, one tiny approved test audio artifact only, and the approved prompt marker: "Create one tiny neutral test audio clip for the approved dry-run id." Manual operator approval required before live audio provider call. Backend-owned credential reference only. Provider key never exposed to frontend. Provider token never exposed to frontend. Frontend secret exposure remains blocked. Audio bridge remains backend-owned. Audio result review remains audit backed. Live audio call cannot execute until a backend-owned execution runtime exists. README explains current live readiness status. README explains provider key never exposed to frontend. README explains first live audio provider bridge.

Previous image bridge batch remains covered: 3242-3273 - First Live Image Provider Call Backend Bridge. Historical image bridge checkpoint marker: Highest detected phase: 3273. Image bridge remains backend-owned, image result review remains audit backed, and live image call cannot execute until a backend-owned execution runtime exists. Historical next likely batch marker: next likely batch: 3274-3305 - First Live Audio Provider Call Backend Bridge.

Previous product-shell batch remains covered: 3210-3241 - CodexForge Primary Navigation, README, and Workspace Layout Upgrade. CodexForge Primary Navigation, README, and Workspace Layout Upgrade remains a god-tier product shell consolidation. Historical product-shell checkpoint marker: Highest detected phase: 3241. README explains first live text provider bridge. Return OK and the approved dry-run id. Historical next likely batch marker: next likely batch: 3242-3273 - First Live Image Provider Call Backend Bridge.

Primary product areas: primary navigation product areas are Home / Operator Cockpit, Generate, Projects, Assets, Providers, Workflows, Trading, Audit / Runs, Settings / Safety, and Developer / Checkpoints. Phase/checkpoint routes are preserved but should not dominate the primary product menu; phase checkpoint routes remain preserved and phase checkpoint routes do not dominate primary navigation.

Workspace layout principle: user action first, safety state second, evidence audit third, technical implementation details last. Generation-style pages keep the generation chat box appears first on generation pages, approval state appears above technical metadata, and output preview appears above technical checkpoint details. Audio bridge pages keep the main action/review panel before technical metadata, safety state before technical metadata, evidence/audit before technical metadata, and technical implementation details lower on the page.

Product-shell safety: do not add live frontend provider calls, model calls, prompt sending, streaming, provider SDK imports, frontend provider key reads, credential exposure/storage, browser storage for secrets, localStorage, sessionStorage, IndexedDB, cookies, microphone access, media device access, recording execution, playback engine creation, voice cloning, voice synthesis execution, transcription execution, fetch/network calls, services/APIs from frontend, workers, render/export/publish execution, platform upload, download generation, signed URL creation, file writes from the app, shell/process/command execution from the app, runtime deploy, or route href loosenings.

Next likely batch: next likely batch: 3306-3337 - First Live Video Provider Call Backend Bridge.

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

## First Live Audio Provider Call Backend Bridge Checkpoint
Highest detected phase: 3305. Latest completed batch: 3274-3305 - First Live Audio Provider Call Backend Bridge Mega Batch v1. Latest release candidate: First Live Audio Provider Call Backend Bridge Completion. 3242-3273 - First Live Image Provider Call Backend Bridge Mega Batch v1 remains covered. 3210-3241 - CodexForge Primary Navigation, README, and Workspace Layout Upgrade remains covered. First Live Audio Provider Call Backend Bridge is a review-only first tightly controlled live audio provider call bridge surface with a backend bridge contract/readiness shape only. It defines audio provider only, single approved audio provider only, one approved audio provider only, one harmless approved audio prompt only, one tiny approved test audio artifact only, Create one tiny neutral test audio clip for the approved dry-run id., manual operator approval required before live audio provider call, backend-owned credential reference only, provider key never exposed to frontend, provider token never exposed to frontend, frontend secret exposure remains blocked, first live audio provider request envelope, first live audio provider response envelope, first live audio provider error envelope, first live audio provider duration cap, first live audio provider size cap, first live audio provider cost cap, first live audio provider rate cap, first live audio provider timeout cap, first live audio provider privacy gate, first live audio provider safety gate, first live audio provider redaction preview, first live audio provider audit packet, first live audio provider observability trace, first live audio provider result capture, first live audio provider result review, first live audio provider asset handoff remains review-only, first live audio provider kill switch, first live audio provider single call lock, first live audio provider idempotency key, first live audio provider replay remains blocked, first live audio provider retry policy, first live audio provider fallback policy, first live audio provider region policy, first live audio provider data retention policy, backend runtime check remains required, operator review remains required before first live audio provider call, audio bridge remains backend-owned, audio result review remains audit backed, and first live audio provider call backend bridge completion does not enable broad provider execution. Live audio call cannot execute until a backend-owned execution runtime exists. Next likely batch: 3306-3337 - First Live Video Provider Call Backend Bridge.
First live audio provider call backend bridge markers: 3274-3305 - First Live Audio Provider Call Backend Bridge; 3274-3305 - First Live Audio Provider Call Backend Bridge Mega Batch v1; First Live Audio Provider Call Backend Bridge; first tightly controlled live audio provider call bridge; audio provider only; single approved audio provider only; one approved audio provider only; one harmless approved audio prompt only; one tiny approved test audio artifact only; Create one tiny neutral test audio clip for the approved dry-run id.; manual operator approval required before live audio provider call; backend-owned credential reference only; provider key never exposed to frontend; provider token never exposed to frontend; frontend secret exposure remains blocked; first live audio provider request envelope; first live audio provider response envelope; first live audio provider error envelope; first live audio provider duration cap; first live audio provider size cap; first live audio provider cost cap; first live audio provider rate cap; first live audio provider timeout cap; first live audio provider privacy gate; first live audio provider safety gate; first live audio provider redaction preview; first live audio provider audit packet; first live audio provider observability trace; first live audio provider result capture; first live audio provider result review; first live audio provider asset handoff remains review-only; first live audio provider kill switch; first live audio provider single call lock; first live audio provider idempotency key; first live audio provider replay remains blocked; first live audio provider retry policy; first live audio provider fallback policy; first live audio provider region policy; first live audio provider data retention policy; backend runtime check remains required; operator review remains required before first live audio provider call; first live audio provider call backend bridge completion does not enable broad provider execution; audio bridge remains backend-owned; audio result review remains audit backed; live audio call cannot execute until a backend-owned execution runtime exists; disabled by default; hard kill switch; tiny duration cap; tiny cost cap; tiny size cap; audit/result capture; no provider key in frontend; no token in frontend; no plaintext secrets; no browser storage for secrets; no localStorage; no sessionStorage; no IndexedDB; no cookies; no frontend process.env provider key reads; no provider SDK imports in frontend; no broad provider execution; no frontend audio provider execution; no microphone access; no media device access; no recording execution; no playback engine creation; no voice cloning; no voice synthesis execution; no transcription execution; no image provider calls; no video provider calls; no render execution; no artifact export execution; no publish gateway execution; no platform upload; no download generation; no signed URL creation; no OAuth flow creation; no webhook creation; no worker execution; no file writes from the app; no shell/process/command execution from the app; no service creation from frontend; no API creation from frontend; no runtime deploy; next likely batch: 3306-3337 - First Live Video Provider Call Backend Bridge.
First live audio provider call backend bridge safety: no provider key in frontend, no token in frontend, no plaintext secrets, no browser storage for secrets, no localStorage, no sessionStorage, no IndexedDB, no cookies, no frontend process.env provider key reads, no provider SDK imports in frontend, no broad provider execution, no frontend audio provider execution, no microphone access, no media device access, no recording execution, no playback engine creation, no voice cloning, no voice synthesis execution, no transcription execution, no image provider calls, no video provider calls, no render execution, no artifact export execution, no publish gateway execution, no platform upload, no download generation, no signed URL creation, no file writes from the app, no shell/process/command execution from the app, no service creation from frontend, no API creation from frontend, no runtime deploy. Do not claim live audio provider calls, broad provider execution, provider keys in frontend, provider tokens in frontend, plaintext secrets, browser secret storage, frontend provider SDK imports, frontend audio provider execution, microphone/media device access, recording, playback, voice cloning, voice synthesis, transcription, image/video provider calls, render execution, export execution, publish execution, platform upload, download generation, signed URL creation, worker execution, service creation, API creation, command execution, process execution, file writes from the app, or runtime deploy exists.
