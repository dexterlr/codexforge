# CodexForge Checkpoint

Branch: `codexforge-foundation`

## Current Product State

CodexForge now includes:

- Brain runtime and cognitive memory.
- Real deterministic Brain memory ingestion.
- Visual Brain graph and `/brain` command center.
- `/files` command center.
- File to Brain to Chat workflow.
- Capability Cockpit at `/capabilities`.
- Safe Patch Preview.
- Creative Production Studio at `/creative`.
- Preview-only artifact pipeline planning.
- Tool adapter registry.
- Policy guard and approval boundary visibility.
- Local-first deterministic smoke-backed architecture.

## Safety Boundary

- File mutation is approval-gated and not automatic.
- Patch Preview is preview-only.
- Creative Studio is preview-only.
- Capability Cockpit does not execute Blender, Unreal, ComfyUI, render jobs, broker jobs, or PC/camera control.
- Broker execution is blocked.
- No unapproved file mutation is allowed.
- PC/camera features require explicit future session consent and are not active automation.

## Validation Baseline

Use these checks after documentation or product changes:

```powershell
npm run build
npm run smoke:codexforge:server
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-all.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-brand-clean.ps1
git diff --check
git status --short
```

## Near-Term Roadmap

- Operator Runs Timeline.
- Approval-gated apply pipeline.
- Real adapter execution behind policies.
- Artifact ledger persistence.
- Better navigation and global command palette.
- More real memory sources.
- Project onboarding and import.
