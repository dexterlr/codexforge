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

- Checkpoint through detected phase 1321 in `scripts/smoke-codexforge-all.ps1`.
- Brain runtime, memory review, runtime journal/replay, snapshots, continuity, mutation governance, memory inbox, and promotion gates.
- Files, evidence, project intelligence, codebase change planning, patch preview, patch apply approval review, patch result capture, test planning, test result summary, and test failure triage review.
- Provider governance, provider live call guard review, first provider live call trial review, provider response capture review, and provider live trial release candidate.
- Local model runtime boundary review, local model live call guard review, first local model live trial review, local model output capture review, and local model release candidate.
- Connector permission/redaction/evidence review, connector live access guard review, first connector live access trial review, connector evidence capture review, and connector release candidate.
- Automation dry-run review, approval queue review, schedule safety review, live execution guard review, automation replay/approval trial review, and automation release candidate.
- Unified live workflow trial 2, result review, failure recovery review, and hardening review.
- Beta operator daily workflow trial, workflow review, friction patch review, and release candidate.
- Beta workflow release regression review, safety signoff review, documentation review, and onboarding final pass.
- Beta 2 release candidate, controlled operator trial review, operator feedback review, and hardening pass.
- Unified operator cohesion and final policy polish for cross-lane cohesion, approval policy, evidence policy, result policy, recovery policy, settings/preferences, cockpit readiness, and command palette discoverability.
- Creative and artifact review surfaces remain preview/review oriented unless an approved boundary is explicitly documented.
- Model router/provider beta release-candidate surfaces cover provider readiness through Controlled Model Router Beta Release Candidate while remaining preview-only, dry-run, and approval-gated. Current checkpoint coverage extends through phase 1321, including model-routed backend execution, project-builder MVP, universal game-builder, universal project-builder, universal builder cockpit, guided build workflow, build plan bundle, build plan approval, guarded execution queue, dry-run execution handoff, simulated file/command/runtime/adapter reviews, real guarded file-write and command-runner adapter reviews, unified cockpit, cockpit evidence/result/recovery, first local change trial, controlled end-to-end build/fix workflow release-candidate surfaces, guided operator run hardening release-candidate surfaces, controlled execution readiness gate surfaces, real controlled operator trial packet release-candidate layer, and the backend approval handoff release-candidate layer. These surfaces support build-anything goals across games, apps, websites, dashboards, tools, research, automation, creative, trading, data, documentation, integration, and general project targets while remaining static, preview-only, approval-gated, denied live execution and denied mutation by default, and blocked from auto-approval, approval decision persistence, queue persistence, dry-run execution, lock release, model calls, provider calls, backend execution, backend adapter execution, domain adapter execution, file writes, file updates, file deletes, file moves, patch applies, arbitrary path crawling, arbitrary local file browsing, auto-open local files, commands, runtimes, validation execution, evidence/result persistence, recovery triggers, packaging, exports, real operator trial execution, and memory promotion. The latest detected phase is 1321. Models are workers; CodexForge is the brain with shared memory, knowledge, evidence, result, audit, and approval.

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

### 6. Approved Boundary Definition

Define the backend, local service, provider, connector, automation, credential, output-retention, audit, and rollback boundaries before any page claims live execution.

### 7. Project Onboarding And Import

Make project setup explicit and reviewable.

### 8. Better Graph Data Volume And Clustering

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
- No provider/local/connector/automation execution without explicit operator approval and an approved boundary.
- No credential/output storage in browser storage.
- No memory auto-promotion.
- No CI or live execution claims without terminal, CI, or approved-boundary evidence.

## Success Definition

CodexForge can explain every proposed write, show every risk and approval boundary, assemble the evidence needed before guarded apply, resume interrupted operator work, and keep preview-only systems clearly separated from execution systems.
