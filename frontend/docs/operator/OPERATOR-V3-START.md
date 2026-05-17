# Operator V3 Working Boundary

This file marks the operator work boundary for approval-gated execution.

## Locked Unless Intentionally Changed

- Existing operator APIs.
- Diff/apply safety model.
- Allowlist enforcement.
- No background jobs.
- No mutation outside repo path allowlists.
- No hidden writes.
- No required LLM dependency.
- Smoke scripts and grouped smoke coverage.

## Current Product Context

CodexForge now includes Brain runtime, cognitive memory, real 3D Brain graph with 2D fallback, approved memory persistence, memory review, evidence memory review, approved Brain graph merge, `/brain`, `/files`, `/tasks`, `/memory`, `/runs`, `/capabilities`, `/creative`, `/artifacts`, Safe Patch Preview, Patch Preview Queue, Preview Diff Composer, Patch Application Gate, Apply-Diff Dry Run, Local Bridge, Mission Control, and policy/approval boundary surfaces.

Operator work should integrate with these surfaces without bypassing the approval model.

## V3 Focus Areas

- Apply Gate Evidence Pack.
- Guarded apply executor behind policy.
- Persistent artifact ledger.
- Full memory replay/merge audit.
- Adapter execution behind local bridge and explicit policies.
- Project onboarding/import.
- Better graph data volume and clustering.

## Non-Goals

- No automatic file mutation.
- No uncontrolled apply executor.
- No broker execution.
- No Blender, Unreal, ComfyUI, render, or PC/camera execution.
- No source edits outside an approved operator path.
