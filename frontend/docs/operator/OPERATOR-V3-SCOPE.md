# Operator V3 Scope And Intent

## Existing Safety Guarantees To Preserve

- Build passes with `npm run build`.
- Dev server works with `npm run dev`.
- Operator loop remains approval-oriented.
- Checkpoint and snapshot routes remain available.
- No writes outside repo path allowlists.
- Mutation-capable operations require explicit approval.
- Local deterministic logic remains available without AI.

## Current CodexForge Surface Area

- Brain runtime and cognitive memory.
- Brain memory ingestion.
- Visual Brain graph.
- Files Command Center and File to Brain to Chat workflow.
- Safe Patch Preview.
- Capability Cockpit.
- Creative Production Studio, preview-only.
- History/activity intelligence.
- Tool adapter registry and policy guard.

## Goals

### 1. Operator Runs Timeline

Persist and display plan, diff, approval, apply, test, failure, and recovery events.

### 2. Approval-Gated Apply Pipeline

Connect previewed patches to a clear approval workflow without automatic mutation.

### 3. Real Adapter Execution Behind Policies

Keep adapters blocked until policy, approval, audit, and operator state are ready.

### 4. Artifact Ledger Persistence

Promote current artifact previews into persisted records without implying execution.

### 5. Resumability

Support reload, retry, and partial-failure recovery with visible state.

## Explicit Non-Goals

- No unapproved file mutation.
- No LLM dependency for core safety.
- No background broker execution.
- No Blender execution.
- No Unreal execution.
- No ComfyUI execution.
- No render execution.
- No PC/camera control.

## Success Definition

CodexForge can explain every proposed write, show every risk and approval boundary, resume interrupted operator work, and keep preview-only systems clearly separated from execution systems.
