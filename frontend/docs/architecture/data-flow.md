# Data Flow

## Current State
Current checkpoint: Highest detected phase: 3241. Latest completed batch: 3210-3241 - CodexForge Primary Navigation, README, and Workspace Layout Upgrade. CodexForge Primary Navigation, README, and Workspace Layout Upgrade is a god-tier product shell consolidation that moves CodexForge from a phase checklist toward an operator cockpit for controlled AI/video/workflow/trading development.

CodexForge is an operator cockpit for controlled AI/video/workflow/trading development. Current status after previous batch: First Live Text Provider Call Backend Bridge is the latest completed provider bridge if present. Live provider execution remains tightly controlled. Provider keys must never be exposed to frontend. The first live text provider call is limited to one harmless approved prompt: "Return OK and the approved dry-run id." README explains current live readiness status. README explains provider key never exposed to frontend. README explains first live text provider bridge.

Primary product areas: primary navigation product areas are Home / Operator Cockpit, Generate, Projects, Assets, Providers, Workflows, Trading, Audit / Runs, Settings / Safety, and Developer / Checkpoints. Phase/checkpoint routes are preserved but should not dominate the primary product menu; phase checkpoint routes remain preserved and phase checkpoint routes do not dominate primary navigation.

Workspace layout principle: user action first, safety state second, evidence audit third, technical implementation details last. Generation-style pages keep the generation chat box appears first on generation pages, approval state appears above technical metadata, and output preview appears above technical checkpoint details.

Product-shell safety: do not add live provider calls, model calls, prompt sending, streaming, provider SDK imports, frontend provider key reads, credential exposure/storage, browser storage for secrets, fetch/network calls, services/APIs from frontend, workers, render/export/publish execution, or route href loosenings.

Next likely batch: next likely batch: 3242-3273 - First Live Image Provider Call Backend Bridge.

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
