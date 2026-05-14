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
- `/ai`: main chat/workspace surface.
- `/brain`: Brain command center and graph memory.
- `/files`: Files Command Center and File to Brain to Chat workflow.
- `/history`: activity and history intelligence.
- `/capabilities`: Capability Cockpit.
- `/creative`: Creative Production Studio, preview-only.
- `/entry`: quick launch surface.
- `/clawd`: operator surface.

## Current Capabilities

- Brain runtime and cognitive memory.
- Brain memory ingestion.
- Visual graph memory.
- Safe Patch Preview.
- Files Command Center.
- Capability Cockpit.
- Creative planning for Blender, ComfyUI, Unreal, storyboard, render queue, and artifacts.
- Tool adapter registry and policy guard.
- Smoke coverage for major product slices.

## Do Not Overclaim

- No Blender execution.
- No Unreal execution.
- No ComfyUI execution.
- No render execution.
- No broker execution.
- No PC/camera control.
- No unapproved file mutation.

## Next Useful Work

- Operator Runs Timeline.
- Approval-gated apply pipeline.
- Artifact ledger persistence.
- Real adapter execution behind policies.
- More real Brain memory sources.
- Better global navigation and command palette.
