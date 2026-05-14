# CodexForge Architecture

## Overview

CodexForge is organized as a Next.js app with local-first runtime domains. The app favors deterministic planning, explicit approval gates, and preview surfaces over hidden automation.

## Frontend Routes

- `/`: product launcher.
- `/ai`: main chat/workspace surface.
- `/brain`: Brain command center and visual graph.
- `/files`: file command center.
- `/history`: activity and history intelligence.
- `/capabilities`: Capability Cockpit.
- `/creative`: Creative Production Studio, preview-only.
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
- Real deterministic Brain memory ingestion.
- Visual graph and Brain command center panels.

## Files Domain

Location:

```text
src/lib/codexforge/files
```

Responsibilities:

- File tree and file inspector.
- File risk and safe next action planning.
- Dependency context and predictive file context.
- File workflow rail.
- File to Brain to Chat bridge.
- Preview-oriented file actions.

## Patch Preview Domain

Location:

```text
src/lib/codexforge/patch-preview
```

Responsibilities:

- Preview-only patch planning.
- Diff preview panels.
- Risk board.
- Approval boundary display.
- Rollback notes.
- Test plan preview.

Patch Preview does not apply changes by itself.

## Capabilities Domain

Location:

```text
src/lib/codexforge/capabilities
```

Responsibilities:

- Adapter readiness and health.
- Tool/capability policy status.
- Artifact ledger preview.
- Blocked execution visibility.
- Capability roadmap and workflow preview.

The Capability Cockpit does not execute Blender, Unreal, ComfyUI, render jobs, broker jobs, or PC/camera automation.

## Creative Domain

Location:

```text
src/lib/codexforge/creative
```

Responsibilities:

- Creative brief planning.
- Blender scene plan preview.
- ComfyUI workflow plan preview.
- Unreal level plan preview.
- Storyboard planning.
- Render queue preview.
- Artifact handoff preview.

Creative Studio is preview-only.

## Tooling And Policy

Locations:

```text
src/lib/codexforge/tools
src/app/api/codexforge/tools
src/app/api/operator
```

Responsibilities:

- Tool contracts and adapter registry.
- Policy guard and approval lifecycle.
- Safe local file/read/search/test helpers.
- Operator plan, diff, apply, snapshot, checkpoint, and test routes.

Execution posture:

- No unapproved file mutation.
- File mutation is approval-gated.
- Broker execution is blocked.
- External adapter execution remains blocked or preview-only until future policy-backed execution is implemented.

## Data Flow

```text
Page or API request
  -> domain model
  -> deterministic planner/context builder
  -> Brain memory or file context where needed
  -> policy/approval boundary
  -> preview output or approved operator path
  -> local history, graph, or artifact preview
```

## Validation

Primary checks:

```powershell
npm run build
npm run smoke:codexforge:server
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-all.ps1
git diff --check
```
