# CodexForge Frontend

CodexForge is a local-first developer control surface for planning, reviewing, and validating AI-assisted coding and creative work. The frontend provides route-backed workspaces for Brain and memory review, file evidence, patch planning, provider governance, Jarvisd/local-daemon boundaries, project intelligence, and operator handoffs while keeping real execution, mutation, provider calls, and local operations behind explicit approval boundaries or future approved local services.

## Canonical Workspace

Work in this frontend only:

```text
C:\ai-lab\projects\openclaw-workspace\repos\<canonical-repo>\frontend
```

See `docs/WORKSPACE_MAP.md` before using duplicate, scratch, or generated copies. Do not edit `clawd/openclaw` or `projects/tools/<canonical-repo>/frontend` for CodexForge frontend work.

## Current Status

CodexForge currently has deterministic frontend control surfaces, safety gates, preview layers, readiness reviews, route-backed panels, and smoke coverage for the local/provider/Jarvisd/project/patch-planning/test-planning areas. Real command execution, test execution, file mutation, patch apply, provider calls, and local daemon actions remain approval-gated or future-local-boundary work where applicable. Provider live tests are represented as approval/readiness/result-review surfaces; they are not automatic background provider calls from arbitrary UI.

## Architecture Overview

- Core workspace and navigation: `src/app`, `src/lib/codexforge/navigation-shell`, command palette, operator home, onboarding, assisted coding, validation, review inbox, recovery, run history, readiness, and repo hygiene.
- Brain and memory: Brain graph inspection, recall, snapshots, continuity, mutation governance, runtime journal/replay, memory inbox, promotion gates, and handoff packets. UI review surfaces do not mutate the Brain graph or auto-promote memory.
- Files, evidence, and patch planning: file command center, safe project reader, apply evidence, validation capture, patch preview, patch preview queue, patch preview workbench, patch apply approval, and patch result capture. These surfaces separate planning, review, approval, validation, and result capture.
- Creative, ComfyUI, and local generation review: creative studio, video planning, ComfyUI/Blender/Unreal previews, local draft/image/keyframe/video review, artifact review, render queues, and export handoffs. These are preview/review surfaces unless a future approved local boundary is explicitly added.
- Provider governance and live-test gates: provider registry, setup, health, adapters, budget guardrails, privacy classifier, audit log, policy bundle, live-test gates, result capture, failure recovery, local-first router review, and release audit. Secrets are redacted and provider calls require explicit approval gates.
- Jarvisd local daemon boundary: Jarvisd contract, health/version readiness, capability registry, and permission boundary. Jarvisd is documented as a future approved local service boundary, not an automatically executing daemon.
- Local operations approval gates: local file operation approval, local command approval, local process preview, and workspace trust policy. These pages review proposed local operations and do not execute, browse, mutate, kill, restart, or grant permissions automatically.
- Project intelligence: safe project indexer, project file search preview, dependency map, and project risk/secrets scan. These use reviewed/approved metadata concepts and do not crawl arbitrary files from the UI.
- Codebase patch and test planning: codebase change plan builder, patch preview workbench, patch apply approval boundary, patch result capture, test command planner, test execution approval boundary, test result summarizer, and test failure triage router. These are review and approval surfaces, not a live apply or test execution pipeline.

## Safety Model

- No silent mutation.
- No arbitrary local file browsing from UI.
- No command execution from arbitrary UI.
- No test execution from arbitrary UI.
- No patch application from UI.
- Filesystem-facing CodexForge API routes and helpers are server-only and bounded to approved project/workspace roots.
- No provider calls without explicit approval gates and result review.
- Secrets are redacted and never displayed, exported, or stored in `localStorage`.
- Local-first routing recommendations are reviewed before use.
- Jarvisd permissions are not granted automatically.
- Brain graph mutation, `appendEvent`, `saveBrainGraph`, memory promotion, and runtime event persistence are not called from UI review surfaces.
- `process.env` values are not printed in UI or logs.

## Route Overview

- Start and guided coding: `/`, `/start`, `/onboarding`, `/first-task`, `/assist`, `/code-flow`, `/apply-validation`, `/validation-results`, `/review-inbox`, `/recovery`, `/workflow-results`, `/run-history`.
- Brain, memory, and audit: `/brain`, `/memory`, `/memory-inbox`, `/runtime-journal`, `/runtime-replay`, `/brain-snapshots`, `/snapshot-restore`, `/brain-continuity`, `/brain-governance`, `/handoff`.
- Files, patch planning, and test planning: `/files`, `/safe-project-indexer`, `/project-file-search`, `/project-dependency-map`, `/project-risk-secrets-scan`, `/codebase-change-plan`, `/patch-preview-workbench`, `/patch-apply-approval`, `/patch-result-capture`, `/test-command-planner`, `/test-execution-approval`, `/test-result-summary`, `/test-failure-triage`.
- Provider governance: `/ai-router`, `/ai-providers`, `/provider-adapters`, `/provider-health`, `/provider-live-test-gate`, `/openai-compatible-live-test`, `/multi-provider-live-test`, `/provider-test-results`, `/prompt-privacy-classifier`, `/provider-policy-bundle`, `/provider-governance-release-audit`.
- Jarvisd and local boundaries: `/jarvisd-contract`, `/jarvisd-health`, `/jarvisd-capabilities`, `/jarvisd-permissions`, `/local-file-approval`, `/local-command-approval`, `/local-process-monitor`, `/workspace-trust-policy`.
- Creative and artifact review: `/creative`, `/local-creative`, `/comfyui`, `/comfyui-health`, `/video-workflows`, `/video-jobs`, `/video-review`, `/creative-readiness`, `/creative-mvp`, `/health-probe`, `/local-bridge-health`, `/artifacts/review`.
- Readiness and administration: `/capabilities`, `/activity`, `/readiness`, `/repo-hygiene`, `/quality-audit`, `/consolidation`, `/validation`, `/stabilization`, `/history`.

## Operator Workflow

1. Inspect the current route, source context, evidence, or readiness packet.
2. Generate or preview a plan, prompt, diff summary, policy bundle, route recommendation, or result packet.
3. Review safety posture, secrets handling, allowed scope, rollback/recovery notes, and handoff text.
4. Cross the approval boundary only through an explicit approved workflow outside arbitrary UI execution.
5. Validate with build, focused smokes, server smoke, and diff hygiene.
6. Capture the result in review inbox, validation results, run history, or handoff surfaces.
7. Commit, tag, or push only after explicit operator approval.

## Development

```powershell
npm install
npm run dev
npm run build
```

## Build And Smoke Commands

Run from the canonical frontend workspace:

```powershell
npm run build
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-codebase-change-plan-builder.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-patch-preview-workbench.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-patch-apply-approval-boundary.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-patch-result-capture.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-test-command-planner.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-test-execution-approval-boundary.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-test-result-summarizer.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-test-failure-triage-router.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-command-ui-simplification.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-repo-hygiene.ps1
npm run smoke:codexforge:server
git diff --check
```

Useful final hygiene checks:

```powershell
git status --short
git diff --stat
```

## Generated Files

Generated and local-only state should stay out of review:

```text
node_modules/
.next/
out/
dist/
build/
coverage/
.operator/
.codexforge/
.checkpoints/
_codexforge-backups/
unpushed-patches/
```

Commit intentional source, docs, package metadata, lockfiles, and smoke scripts only.

## Roadmap

- Phases 230-233 are now the test-planning batch: test command planner, test execution approval boundary, test result summarizer, and test failure triage router.
- Next normal batch: phases 234-237 for Git review and commit approval surfaces.
- Then phases 238-245 for release and Jarvisd audit surfaces.
