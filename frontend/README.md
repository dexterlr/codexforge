# CodexForge Frontend

CodexForge is a local-first developer control surface for planning, reviewing, approving, and validating AI-assisted coding and operator work. The frontend provides route-backed workspaces for Brain and memory review, file evidence, patch planning, provider governance, local model review, connector review, automation review, Jarvisd/local-daemon boundaries, project intelligence, and operator handoffs while real execution, mutation, provider calls, connector access, automation, and local operations stay behind explicit approval boundaries or future approved local services.

## Canonical Workspace

Work in this frontend only:

```text
C:\ai-lab\projects\openclaw-workspace\repos\health-tracker\frontend
```

See `docs/WORKSPACE_MAP.md` before using duplicate, scratch, or generated copies. Do not edit duplicate or scratch workspaces such as `C:\ai-lab\projects\tools\health-tracker` for CodexForge frontend work unless a maintainer explicitly reassigns the canonical path.

## Current Status

CodexForge is checkpointed through phase 633, detected from the local `scripts/smoke-codexforge-all.ps1` registry by taking the highest `Phase N` entry. The latest detected milestone family is the universal controlled execution foundation: execution boundary inventory, file write approval, command execution approval, local runtime approval, provider/model call approval, connector access approval, automation/schedule approval, evidence capture, result review, recovery/retry, packaging/export, workflow profile registry, and creative, research, chatbot, and game server workflow profiles.

The current surface area is still mostly deterministic frontend review and approval UI. Provider live trial review, local model live trial review, connector live trial review, automation live trial review, unified live workflow trial 2, beta operator daily workflow, Daily Beta 1 controlled trial review, execution boundary readiness, first approved test execution, first end-to-end workflow release-candidate, controlled rollout, final boundary signoff, Daily Beta activation, Daily Beta 1 activation, Daily Beta 1 launch-candidate, Daily Beta 1 launch governance, Daily Beta 1 controlled launch review, and universal controlled execution foundation routes are represented as approval/readiness/result-review surfaces. They are not automatic background provider calls, local model calls, connector calls, automation runs, file mutations, patch applies, test execution, boundary probes, shell execution, workflow execution, activation execution, launch execution, controlled launch execution, launch dry-run execution, evidence ingestion, result persistence, recovery triggers, rollback triggers, monitoring jobs, support runbook publishing, hardening applies, readiness locks, release candidate signoffs, handoff sends, go/no-go auto-passes, approval packet sends, package/export writes, workflow profile execution, creative generation, live research, chatbot/agent creation, video-call joining, server building, or go-live actions from arbitrary UI.

## Operational Checkpoint

- Highest detected phase: 633.
- Checkpoint date: 2026-06-16.
- Latest detected milestone family: Universal controlled execution foundation.
- Checkpoint docs: `docs/codexforge-checkpoint-current.md`, `docs/codexforge-operator-checkpoint-runbook.md`, and `docs/codexforge-status-index.md`.
- Checkpoint smoke: `scripts/smoke-codexforge-checkpoint-docs.ps1`, registered in `scripts/smoke-codexforge-all.ps1` as `Checkpoint Documentation Consistency`.

## What Works Now

- Route-backed review panels render for operator home, onboarding, assisted coding, validation, review inbox, recovery, run history, readiness, repo hygiene, and recent live workflow review families.
- Safety copy, hidden smoke markers, deterministic builders, and smoke scripts cover the provider/local/connector/automation/unified/beta/Beta 2/final policy polish/Foundation 500/real daily workflow/multi-workflow/Daily Beta/Daily Beta 1 controlled trial, execution boundary, first approved test execution, first end-to-end workflow release-candidate, controlled rollout, final boundary signoff, Daily Beta candidate, operator handoff, Daily Beta activation, and Daily Beta 1 activation review checkpoint surface.
- Build, command UI simplification smoke, repo hygiene smoke, server smoke, and the all-smoke registry are available as local validation commands.
- Documentation now records how to detect the current checkpoint phase from the local all-smoke registry.

## What Is Still Gated

- Review-only surfaces remain the default.
- Explicit operator approval is required before mutation-capable, spend-capable, provider, local model, connector, automation, file, shell, patch, test, Jarvisd, or memory promotion work can be considered.
- No silent mutation.
- No automatic provider/local/connector/automation execution without approval.
- No credential/output storage in `localStorage` or `sessionStorage`.
- No memory auto-promotion.
- No live execution claim is valid unless a specific approved local/backend/provider boundary exists and is documented.

## Architecture Overview

- Core workspace and navigation: `src/app`, `src/lib/codexforge/navigation-shell`, command palette, operator home, onboarding, assisted coding, validation, review inbox, recovery, run history, readiness, repo hygiene, and checkpoint route families.
- Brain and memory: Brain graph inspection, recall, snapshots, continuity, mutation governance, runtime journal/replay, memory inbox, promotion gates, and handoff packets. UI review surfaces do not mutate the Brain graph or auto-promote memory.
- Files, evidence, and patch planning: file command center, safe project reader, apply evidence, validation capture, patch preview, patch preview queue, patch preview workbench, patch apply approval, and patch result capture. These surfaces separate planning, review, approval, validation, and result capture.
- Creative, ComfyUI, and local generation review: creative studio, video planning, ComfyUI/Blender/Unreal previews, local draft/image/keyframe/video review, artifact review, render queues, and export handoffs. These are preview/review surfaces unless a future approved local boundary is explicitly added.
- Provider governance and live-trial review: provider registry, setup, health, adapters, budget guardrails, privacy classifier, audit log, policy bundle, live-test gates, live call guard review, result capture, failure recovery, local-first router review, and release audit. Secrets are redacted and provider calls require explicit approval gates.
- Local model live trial review: runtime boundary review, live call guard review, first trial review, output capture review, output inbox, failover review, and release candidate surfaces. These do not call local models from arbitrary UI.
- Connector and automation live trial review: connector permission/redaction/evidence review and automation dry-run/approval/schedule/live guard review. These do not call connectors or run automations from arbitrary UI.
- Unified, beta operator, Beta 2, final policy polish, Foundation 500, real daily workflow, multi-workflow, Daily Beta, Daily Beta 1, first end-to-end workflow, controlled rollout, and Daily Beta activation boundary review: unified live workflow trial 2, result review, failure recovery, hardening review, beta daily workflow trial, beta workflow review, friction patch review, beta workflow release candidate, beta workflow release regression review, safety signoff review, documentation review, onboarding final pass, Beta 2 release candidate, controlled operator trial, feedback review, hardening pass, cross-lane cohesion review, approval policy review, evidence policy review, result policy review, recovery policy review, settings review, cockpit polish, command palette polish, final review inbox consolidation, release readiness dashboard, Foundation 500 milestone review, first real daily workflow candidate, evidence review, result review, recovery review, hardening pass, multi-workflow operator trial plan, multi-workflow trial review, multi-workflow regression review, multi-workflow release candidate, controlled live capability signoff, CodexForge Daily Beta release candidate, Daily Beta controlled operator trial, Daily Beta feedback review, Daily Beta 1 controlled trial result/recovery/hardening review, live backend boundary inventory, provider/local model/connector/automation execution boundary readiness review, first approved test execution trial, first real end-to-end workflow trial plan/review, end-to-end evidence/result/recovery/hardening review, CodexForge end-to-end workflow release candidate, end-to-end controlled rollout review family, live execution boundary final signoff, end-to-end Daily Beta candidate, operator handoff, and Daily Beta activation checklist/dry-run/evidence/result/recovery/hardening/release-candidate/operator-readiness reviews.
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
- No provider/local/connector/automation execution without approval.
- Filesystem-facing CodexForge API routes and helpers are server-only and bounded to approved project/workspace roots.
- No provider calls without explicit approval gates and result review.
- Secrets are redacted and never displayed, exported, or stored in `localStorage`.
- No credential/output storage in `localStorage` or `sessionStorage`.
- Local-first routing recommendations are reviewed before use.
- Jarvisd permissions are not granted automatically.
- Brain graph mutation, `appendEvent`, `saveBrainGraph`, memory promotion, and runtime event persistence are not called from UI review surfaces.
- No memory auto-promotion.
- `process.env` values are not printed in UI or logs.

## Route Overview

- Start and guided coding: `/`, `/start`, `/onboarding`, `/first-task`, `/assist`, `/code-flow`, `/apply-validation`, `/validation-results`, `/review-inbox`, `/recovery`, `/workflow-results`, `/run-history`.
- Brain, memory, and audit: `/brain`, `/memory`, `/memory-inbox`, `/runtime-journal`, `/runtime-replay`, `/brain-snapshots`, `/snapshot-restore`, `/brain-continuity`, `/brain-governance`, `/handoff`.
- Files, patch planning, and test planning: `/files`, `/safe-project-indexer`, `/project-file-search`, `/project-dependency-map`, `/project-risk-secrets-scan`, `/codebase-change-plan`, `/patch-preview-workbench`, `/patch-apply-approval`, `/patch-result-capture`, `/test-command-planner`, `/test-execution-approval`, `/test-result-summary`, `/test-failure-triage`.
- Live workflow hardening: `/first-controlled-live-workflow-trial`, `/live-workflow-evidence-capture-review`, `/live-workflow-result-review-inbox`, `/live-workflow-operator-feedback-review`, `/controlled-live-workflow-release-candidate`, `/first-controlled-live-workflow-replay`, `/live-workflow-regression-matrix`, `/live-workflow-failure-patch-review`, `/live-workflow-hardening-pass`.
- Provider and local live trials: `/provider-live-call-guard-review`, `/first-provider-live-call-trial-review`, `/provider-live-response-capture-review`, `/provider-live-trial-release-candidate`, `/local-model-live-call-guard-review`, `/first-local-model-live-trial-review`, `/local-model-live-output-capture-review`, `/local-model-live-trial-release-candidate`.
- Connector and automation live trials: `/connector-live-access-guard-review`, `/first-connector-live-access-trial-review`, `/connector-live-evidence-capture-review`, `/connector-live-trial-release-candidate`, `/automation-live-execution-guard-review`, `/first-automation-live-dry-run-replay`, `/first-automation-live-approval-trial`, `/automation-live-trial-release-candidate`.
- Unified trial 2: `/unified-live-workflow-trial-2`, `/unified-live-workflow-trial-2-result-review`, `/unified-live-workflow-trial-2-failure-recovery`, `/unified-live-workflow-trial-2-hardening-pass`.
- Beta operator workflow: `/beta-operator-daily-workflow-trial`, `/beta-operator-daily-workflow-review`, `/beta-operator-workflow-friction-patch`, `/beta-operator-workflow-release-candidate`.
- Beta 2 review and hardening: `/beta-workflow-release-regression-review`, `/beta-workflow-safety-signoff-review`, `/beta-workflow-documentation-review`, `/beta-workflow-onboarding-final-pass`, `/codexforge-beta-2-release-candidate`, `/beta-2-controlled-operator-trial`, `/beta-2-operator-feedback-review`, `/beta-2-hardening-pass`.
- Final policy polish: `/provider-local-connector-automation-cohesion-review`, `/unified-approval-policy-final-review`, `/unified-evidence-policy-final-review`, `/unified-result-policy-final-review`, `/unified-recovery-policy-final-review`, `/unified-settings-preferences-review`, `/daily-operator-cockpit-final-polish`, `/global-command-palette-final-polish`.
- Foundation 500 and real daily workflow review: `/review-inbox-final-consolidation`, `/release-readiness-dashboard`, `/codexforge-foundation-500-milestone-review`, `/first-real-daily-workflow-candidate`, `/real-daily-workflow-evidence-review`, `/real-daily-workflow-result-review`, `/real-daily-workflow-recovery-review`, `/real-daily-workflow-hardening-pass`.
- Multi-workflow and Daily Beta review: `/multi-workflow-operator-trial-plan`, `/multi-workflow-trial-review`, `/multi-workflow-regression-review`, `/multi-workflow-release-candidate`, `/controlled-live-capability-signoff`, `/codexforge-daily-beta-release-candidate`, `/daily-beta-controlled-operator-trial`, `/daily-beta-feedback-review`.
- Daily Beta activation review: `/daily-beta-activation-checklist-review`, `/daily-beta-activation-dry-run-review`, `/daily-beta-activation-evidence-review`, `/daily-beta-activation-result-review`, `/daily-beta-activation-recovery-review`, `/daily-beta-activation-hardening-pass`, `/codexforge-daily-beta-activation-release-candidate`, `/daily-beta-activation-operator-readiness-review`.
- Daily Beta 1 controlled trial and execution boundary readiness: `/daily-beta-1-controlled-trial-result-review`, `/daily-beta-1-controlled-trial-recovery-review`, `/daily-beta-1-controlled-trial-hardening`, `/live-backend-boundary-inventory`, `/provider-execution-boundary-readiness-review`, `/local-model-execution-boundary-readiness-review`, `/connector-execution-boundary-readiness-review`, `/automation-execution-boundary-readiness-review`.
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
npm run dev
npm run build
```

## Build And Smoke Commands

Run from the canonical frontend workspace:

```powershell
npm run build
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-checkpoint-docs.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-all.ps1
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

- Current checkpoint: documentation and hygiene alignment through detected phase 633.
- Next milestone: define and document approved backend/local/provider/connector/automation/file/command/local runtime/package/deployment boundaries before any route claims live execution or project/server building.
- Keep provider, local model, connector, automation, unified workflow, beta operator, Daily Beta 1 controlled trial, execution boundary, launch governance, controlled launch review, and universal workflow profile pages review-only until those boundaries exist.
- Do not claim CI passed unless actual CI or terminal logs prove it.
