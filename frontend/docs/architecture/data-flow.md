# Data Flow

CodexForge data flow is preview-first and approval-aware.

## Product Flow

1. User opens a route such as `/brain`, `/files`, `/capabilities`, `/creative`, `/history`, `/ai`, or `/clawd`.
2. The route loads deterministic local domain data or fixtures.
3. The relevant domain prepares context, plans, risks, readiness, previews, or graph state.
4. Policy and approval boundaries are shown before any mutation-capable path.
5. Preview output is rendered in the UI.
6. Approved operator paths may use plan, diff, apply, checkpoint, snapshot, and test APIs.
7. Memory, history, or artifact preview state can be used by later workflows.

## File to Brain to Chat Flow

```text
File selection
  -> file context, risk, dependencies, safe next action
  -> Brain context bridge
  -> chat handoff context
  -> structured response or preview plan
```

This flow enriches reasoning context. It does not imply automatic file writes.

## Creative Artifact Preview Flow

```text
Creative brief
  -> Blender/ComfyUI/Unreal/storyboard/render plan
  -> safety boundary
  -> artifact handoff preview
  -> future ledger persistence
```

This is preview-only. No Blender, Unreal, ComfyUI, render, or broker execution occurs.

## Safety Properties

- No direct hidden writes.
- Patch Preview is preview-only.
- Creative Studio is preview-only.
- File mutation requires explicit approval.
- PC/camera control is not active and would require explicit future session consent.
