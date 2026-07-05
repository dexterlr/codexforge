# Architecture Overview

## Current State
Current checkpoint: Highest detected phase: 3273. Latest completed batch: 3242-3273 - First Live Image Provider Call Backend Bridge. First Live Image Provider Call Backend Bridge is the current image-provider bridge surface and the first tightly controlled live image provider call bridge. It remains review-only, disabled by default, and backend-owned.

CodexForge is an operator cockpit for controlled AI/video/workflow/trading development. Current status after latest batch: image provider only, single approved image provider only, one harmless approved image prompt only, one tiny approved test image only, and the approved prompt marker: "Create one tiny neutral test image for the approved dry-run id." Manual operator approval required before live image provider call. Backend-owned credential reference only. Provider key never exposed to frontend. Provider token never exposed to frontend. Frontend secret exposure remains blocked. Image bridge remains backend-owned. Image result review remains audit backed. Live image call cannot execute until a backend-owned execution runtime exists. README explains current live readiness status. README explains provider key never exposed to frontend. README explains first live image provider bridge.

Previous product-shell batch remains covered: 3210-3241 - CodexForge Primary Navigation, README, and Workspace Layout Upgrade. Historical product-shell checkpoint marker: Highest detected phase: 3241. Primary navigation product areas remain Home / Operator Cockpit, Generate, Projects, Assets, Providers, Workflows, Trading, Audit / Runs, Settings / Safety, and Developer / Checkpoints. Phase checkpoint routes remain preserved and phase checkpoint routes do not dominate primary navigation.

Workspace layout principle: user action first, safety state second, evidence audit third, technical implementation details last. Image bridge pages keep the main action/review panel before technical metadata, safety state before technical metadata, evidence/audit before technical metadata, and technical implementation details lower on the page.

Product-shell safety: do not add live frontend provider calls, model calls, prompt sending, streaming, provider SDK imports, frontend provider key reads, credential exposure/storage, browser storage for secrets, localStorage, sessionStorage, IndexedDB, cookies, fetch/network calls, services/APIs from frontend, workers, render/export/publish execution, platform upload, download generation, signed URL creation, file writes from the app, shell/process/command execution from the app, runtime deploy, or route href loosenings.

Next likely batch: next likely batch: 3274-3305 - First Live Audio Provider Call Backend Bridge.

CodexForge is a local-first cognitive engineering workspace built from deterministic domains with optional AI/provider integration.

## Core Domains

1. Brain runtime, cognitive memory, deterministic ingestion, recall, approved memory persistence, and graph merge review.
2. Real 3D Brain graph with WebGL/Three/Fiber/Drei and 2D fallback.
3. Files Command Center and File to Brain to Chat bridge.
4. Safe Patch Preview, Patch Preview Queue, Preview Diff Composer, Patch Application Gate, Apply Evidence Pack, and Apply-Diff Dry Run.
5. Task Autopilot, reviewed task activation, Execution Readiness, Step Runner Preview, and read-only step execution.
6. Evidence memory review and Evidence-Grounded Chat.
7. Operator Run Center, Capability Cockpit, Local Bridge, and policy/approval boundary.
8. Creative Production Studio, artifact workspace/executor/export/ingestion, and Production Pack Builder.
9. Mission Control, global navigation shell, and smoke-backed validation.

## High-Level Flow

```text
User request
  -> route/page surface
  -> deterministic domain planner
  -> Brain memory, file context, task context, or evidence context where relevant
  -> preview, risk, policy, approval boundary, or evidence pack
  -> optional future guarded executor only after explicit approval and policy
  -> history, graph, memory, run, or artifact review state
```

## Design Philosophy

- Keep core planning local and deterministic where possible.
- Make hidden execution impossible by design.
- Treat file mutation as approval-gated.
- Prefer previews, evidence packs, risk summaries, rollback plans, test plans, and policy state before any execution.
- Keep external adapters blocked or preview-only until policy-backed execution exists.

## Current Boundaries

CodexForge does not currently execute Blender, Unreal, ComfyUI, render jobs, broker jobs, or PC/camera automation from preview UI. Creative, capability, artifact, operator, patch, and apply-gate surfaces are planning/readiness/review surfaces unless a future approved execution path is explicitly added.
