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
- Smoke scripts.

## Current Product Context

CodexForge now includes Brain runtime, cognitive memory, `/brain`, `/files`, `/capabilities`, `/creative`, Safe Patch Preview, and policy/approval boundary surfaces.

Operator work should integrate with these surfaces without bypassing the approval model.

## V3 Focus Areas

- Operator Runs Timeline.
- Approval-gated apply pipeline.
- Better patch preview to apply handoff.
- Audit trail and artifact ledger persistence.
- Real adapter execution only behind policies.
- UI resumability after refresh, API errors, or partial failure.

## Non-Goals

- No automatic file mutation.
- No broker execution.
- No Blender, Unreal, ComfyUI, render, or PC/camera execution.
- No source edits outside the approved operator path.
