# Data Flow

## Current State
Current checkpoint: Highest detected phase: 3273. Latest completed batch: 3242-3273 - First Live Image Provider Call Backend Bridge. First Live Image Provider Call Backend Bridge is the current image-provider bridge surface and the first tightly controlled live image provider call bridge. It remains review-only, disabled by default, and backend-owned.

CodexForge is an operator cockpit for controlled AI/video/workflow/trading development. Current status after latest batch: image provider only, single approved image provider only, one harmless approved image prompt only, one tiny approved test image only, and the approved prompt marker: "Create one tiny neutral test image for the approved dry-run id." Manual operator approval required before live image provider call. Backend-owned credential reference only. Provider key never exposed to frontend. Provider token never exposed to frontend. Frontend secret exposure remains blocked. Image bridge remains backend-owned. Image result review remains audit backed. Live image call cannot execute until a backend-owned execution runtime exists. README explains current live readiness status. README explains provider key never exposed to frontend. README explains first live image provider bridge.

Previous product-shell batch remains covered: 3210-3241 - CodexForge Primary Navigation, README, and Workspace Layout Upgrade. Historical product-shell checkpoint marker: Highest detected phase: 3241. Primary navigation product areas remain Home / Operator Cockpit, Generate, Projects, Assets, Providers, Workflows, Trading, Audit / Runs, Settings / Safety, and Developer / Checkpoints. Phase checkpoint routes remain preserved and phase checkpoint routes do not dominate primary navigation.

Workspace layout principle: user action first, safety state second, evidence audit third, technical implementation details last. Image bridge pages keep the main action/review panel before technical metadata, safety state before technical metadata, evidence/audit before technical metadata, and technical implementation details lower on the page.

Product-shell safety: do not add live frontend provider calls, model calls, prompt sending, streaming, provider SDK imports, frontend provider key reads, credential exposure/storage, browser storage for secrets, localStorage, sessionStorage, IndexedDB, cookies, fetch/network calls, services/APIs from frontend, workers, render/export/publish execution, platform upload, download generation, signed URL creation, file writes from the app, shell/process/command execution from the app, runtime deploy, or route href loosenings.

Next likely batch: next likely batch: 3274-3305 - First Live Audio Provider Call Backend Bridge.

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
