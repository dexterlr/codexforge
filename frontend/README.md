# CodexForge Frontend

This directory contains the Next.js frontend for CodexForge, a local-first AI developer workspace with Brain runtime, cognitive memory, file intelligence, safe patch previews, capability readiness, and preview-only creative production planning.

For the full product overview, see `../README.md`.

## Main Routes

- `/`: product launcher.
- `/ai`: main chat/workspace surface.
- `/brain`: Brain command center and visual memory graph.
- `/files`: Files command center and File to Brain to Chat workflow.
- `/history`: activity and history intelligence.
- `/capabilities`: Capability Cockpit.
- `/creative`: Creative Production Studio, preview-only.
- `/entry`: quick launch surface.
- `/clawd`: operator surface.

## Safety Posture

- File mutation is approval-gated and not automatic.
- Patch Preview is preview-only.
- Creative Studio is preview-only.
- Capability Cockpit does not execute Blender, Unreal, ComfyUI, render jobs, broker jobs, or PC/camera control.
- No unapproved file mutation is expected from documentation or preview flows.

## Development

```powershell
npm install
npm run dev
npm run build
```

## Smoke Commands

```powershell
npm run smoke:codexforge:server
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-all.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-brand-clean.ps1
```

Focused scripts that exist:

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
```
