# Architecture Overview

CodexForge is a local-first cognitive engineering workspace built from deterministic domains with optional AI/provider integration.

## Core Domains

1. Brain runtime and cognitive memory.
2. Visual Brain graph and command center.
3. Files command center and File to Brain to Chat bridge.
4. Safe Patch Preview.
5. Capability Cockpit and adapter registry.
6. Creative Production Studio, preview-only.
7. Operator policy and approval boundary.
8. Smoke-backed validation.

## High-Level Flow

```text
User request
  -> route/page surface
  -> deterministic domain planner
  -> Brain memory/context where relevant
  -> preview, risk, policy, or approval boundary
  -> optional operator/apply path only after explicit approval
  -> history, graph, or artifact preview state
```

## Design Philosophy

- Keep core planning local and deterministic where possible.
- Make hidden execution impossible by design.
- Treat file mutation as approval-gated.
- Prefer previews, risk summaries, and policy state before any execution.
- Keep external adapters blocked or preview-only until policy-backed execution exists.

## Current Boundaries

CodexForge does not currently execute Blender, Unreal, ComfyUI, render jobs, broker jobs, or PC/camera automation. Creative and capability surfaces are planning/readiness surfaces unless a future approved execution path is explicitly added.
