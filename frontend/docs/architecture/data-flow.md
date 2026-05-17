# Data Flow

CodexForge data flow is preview-first, evidence-aware, and approval-aware.

## Product Flow

1. User opens a route such as `/mission`, `/brain`, `/files`, `/tasks`, `/memory`, `/runs`, `/capabilities`, `/creative`, `/artifacts`, `/history`, `/ai`, or `/clawd`.
2. The route loads deterministic local domain data, fixtures, or approved local review state.
3. The relevant domain prepares context, plans, risks, readiness, previews, evidence, graph state, or artifacts.
4. Policy and approval boundaries are shown before any mutation-capable path.
5. Review output is rendered in the UI.
6. Apply-oriented flows prepare preview diffs, approval packets, evidence packs, rollback plans, test plans, and dry-run simulations before any future guarded executor can be considered.
7. Memory, history, run, graph, or artifact review state can be used by later workflows.

## File To Brain To Chat Flow

```text
File selection
  -> file context, risk, dependencies, safe next action
  -> Brain context bridge
  -> chat handoff context
  -> structured response, evidence-grounded chat, or preview plan
```

This flow enriches reasoning context. It does not imply automatic file writes.

## Patch Review Flow

```text
Grounded fix or selected file context
  -> Safe Patch Preview
  -> Patch Preview Queue
  -> Preview Diff Composer
  -> Patch Application Gate
  -> Apply Gate Evidence Pack
  -> future guarded apply executor only after explicit policy approval
```

The current product stops at review, approval evidence, and simulation. It does not call `apply-diff`, `write-file`, or `run-command` from these UI surfaces.

## Creative Artifact Preview Flow

```text
Creative brief
  -> Blender/ComfyUI/Unreal/storyboard/render plan
  -> safety boundary
  -> artifact handoff preview
  -> artifact workspace/export approval
  -> artifact ingestion candidates
  -> production pack review
```

This is preview/review only. No Blender, Unreal, ComfyUI, render, broker, or PC/camera execution occurs from these surfaces.

## Safety Properties

- No direct hidden writes.
- `apply-diff` requires explicit tool-policy approval.
- `write-file` and `run-command` remain blocked unless future explicit approval paths exist.
- Patch review surfaces prepare evidence and approvals only.
- Creative Studio is preview-only.
- File mutation requires explicit approval.
- The Brain graph visual layer does not mutate graph state.
- PC/camera control is not active and would require explicit future session consent.
