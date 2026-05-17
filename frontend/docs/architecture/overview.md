# Architecture Overview

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
