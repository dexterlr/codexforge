# Operator V3 Scope And Intent

## Existing Safety Guarantees To Preserve

- Build passes with `npm run build`.
- Dev server works with `npm run dev`.
- Operator loop remains approval-oriented.
- Checkpoint and snapshot routes remain available.
- No writes outside repo path allowlists.
- Mutation-capable operations require explicit approval.
- `apply-diff` requires explicit tool-policy approval.
- `write-file` and `run-command` remain blocked unless future explicit approval paths exist.
- Local deterministic logic remains available without AI.

## Current CodexForge Surface Area

- Brain runtime, cognitive memory, deterministic ingestion, recall, real 3D graph, and 2D fallback.
- Approved memory persistence, memory review, evidence memory review, and approved Brain graph merge.
- Files Command Center and File to Brain to Chat workflow.
- Safe Patch Preview, Patch Preview Queue, Preview Diff Composer, Patch Application Gate, and Apply-Diff Dry Run.
- Evidence-Grounded Chat.
- Task Autopilot, reviewed task activation, Execution Readiness, Step Runner Preview, and approved read-only step execution.
- Operator Run Center.
- Capability Cockpit.
- Local Bridge.
- Creative Production Studio, preview-only.
- Artifact workspace/executor/export/ingestion and Production Pack Builder.
- Mission Control and global navigation shell.
- Tool adapter registry and policy guard.

## Goals

### 1. Apply Gate Evidence Pack

Bundle preview diff package, current file verification metadata, target files, risk, rollback plan, test plan, approval packet, operator approval note, evidence refs, smoke/check placeholders, mutation firewall summary, and final readiness decision before any future guarded apply executor.

### 2. Guarded Apply Executor Behind Policy

Connect evidence-reviewed patches to a clear approval workflow without automatic mutation.

### 3. Persistent Artifact Ledger

Promote current artifact previews into persisted records without implying external execution.

### 4. Full Memory Replay/Merge Audit

Audit reviewed memory events and Brain graph merge state before any graph mutation path.

### 5. Adapter Execution Behind Local Bridge And Explicit Policies

Keep adapters blocked until policy, consent, approval, audit, and operator state are ready.

### 6. Project Onboarding And Import

Make project setup explicit and reviewable.

### 7. Better Graph Data Volume And Clustering

Improve graph scale and clustering without weakening deterministic layout or fallback safety.

## Explicit Non-Goals

- No unapproved file mutation.
- No uncontrolled apply executor.
- No LLM dependency for core safety.
- No background broker execution.
- No Blender execution.
- No Unreal execution.
- No ComfyUI execution.
- No render execution.
- No PC/camera control.

## Success Definition

CodexForge can explain every proposed write, show every risk and approval boundary, assemble the evidence needed before guarded apply, resume interrupted operator work, and keep preview-only systems clearly separated from execution systems.
