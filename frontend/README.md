# CodexForge Frontend

CodexForge is a local-first developer control surface for planning, reviewing, approving, and validating AI-assisted coding and operator work. The frontend provides route-backed workspaces for Brain and memory review, file evidence, patch planning, provider governance, local model review, connector review, automation review, Jarvisd/local-daemon boundaries, project intelligence, and operator handoffs while real execution, mutation, provider calls, connector access, automation, and local operations stay behind explicit approval boundaries or future approved local services.

## Canonical Workspace

Work in this frontend only:

```text
C:\ai-lab\projects\openclaw-workspace\repos\health-tracker\frontend
```

See `docs/WORKSPACE_MAP.md` before using duplicate, scratch, or generated copies. Do not edit duplicate or scratch workspaces such as `C:\ai-lab\projects\tools\health-tracker` for CodexForge frontend work unless a maintainer explicitly reassigns the canonical path.

## Current Status

CodexForge is checkpointed through phase 1545, detected from the local `scripts/smoke-codexforge-all.ps1` registry by taking the highest `Phase N` entry. The latest completed batch is 1530-1545 - Model Router v2. The latest detected milestone family adds deterministic model router v2 boundary, model capability registry preview, local private model preference preview, cheapest capable model policy preview, paid pro model justification preview, specialist model domain fit preview, model privacy class preview, model cost class preview, prompt payload preview, model approval gate preview, model fallback route preview, model denial route preview, model evidence result audit preview, cockpit model router summary, first model router v2 candidate, and controlled model router v2 release candidate surfaces while `/codexforge-cockpit` remains the normal user surface and phase pages remain dev test diagnostics only. frontend model/provider/connector calls still blocked: no model calls, provider calls, connector calls, prompt sending, credential storage, hidden routing, hidden approvals, routing decision persistence, queue creation, transaction creation, evidence/result/audit persistence, browser storage writes from the cockpit, file writes, diff application, command execution, rollback/retry/recovery execution, process spawning, port binding, installs, deploys, or runtime starts occur from the cockpit. backend-owned provider-gated model routing remains required. Explicit operator approval remains required.

The current surface area is still mostly deterministic frontend review and approval UI. Provider live trial review, local model live trial review, connector live trial review, automation live trial review, unified live workflow trial 2, beta operator daily workflow, Daily Beta 1 controlled trial review, execution boundary readiness, first approved test execution, first end-to-end workflow release-candidate, controlled rollout, final boundary signoff, Daily Beta activation, Daily Beta 1 activation, Daily Beta 1 launch-candidate, Daily Beta 1 launch governance, Daily Beta 1 controlled launch review, universal controlled execution foundation, controlled builder dry-run, bounded adapter implementation-plan, first real adapter MVP design, first bounded adapter implementation, first useful controlled adapter MVP review, first adapter execution beta boundary, real adapter wiring plan, first adapter execution beta review, broad controlled builder beta, backend/local adapter contract, backend adapter implementation preview, backend dry-run packet, controlled model-use release-candidate routes, model router execution-readiness candidate routes, controlled model router beta release-candidate routes, model-routed backend execution review routes, project-builder MVP review routes, universal game-builder review routes, universal project-builder review routes, build plan approval routes, guarded execution queue preview routes, dry-run execution handoff preview routes, simulated file write dry-run routes, simulated command execution dry-run routes, simulated runtime execution dry-run routes, and simulated adapter execution dry-run routes are represented as approval/readiness/result-review surfaces. They are not automatic background provider calls, local model calls, connector calls, automation runs, file mutations, patch applies, test execution, boundary probes, backend execution, local bridge calls, shell execution, workflow execution, scaffold creation, project-builder execution, universal project-builder execution, project goal prompt sending, live project domain classification, live model routing, backend adapter execution, project adapter execution, game-builder execution, game target prompt sending, live game platform classification, game server starts, mod installation, asset downloads, asset rendering, game client launch, game adapter execution, deployment execution, activation execution, launch execution, controlled launch execution, launch dry-run execution, evidence ingestion, result persistence, recovery triggers, rollback triggers, monitoring jobs, support runbook publishing, hardening applies, readiness locks, release candidate signoffs, handoff sends, go/no-go auto-passes, approval packet sends, dry-run launches, audit storage, package/export writes, workflow profile execution, creative generation, live research, chatbot/agent creation, video-call joining, supported game target server building, live model calls, provider calls, credential reads, network calls, router execution, hidden model calls, hidden execution, automatic memory promotion, browser credential storage, or go-live actions from arbitrary UI. Models are workers; CodexForge is the brain with one shared memory, knowledge, evidence, result, audit, and approval layer.

## Operational Checkpoint

- Highest detected phase: 1545.
- Checkpoint date: 2026-06-23.
- Latest completed batch: 1530-1545 - Model Router v2.
- Latest detected milestone family: Model Router v2.
- Latest release candidate: Controlled Model Router v2 Release Candidate.
- Next likely batch: 1546-1561 - Provider Approval Gate.
- Checkpoint docs: `docs/codexforge-checkpoint-current.md`, `docs/codexforge-operator-checkpoint-runbook.md`, and `docs/codexforge-status-index.md`.
- Checkpoint smoke: `scripts/smoke-codexforge-checkpoint-docs.ps1`, registered in `scripts/smoke-codexforge-all.ps1` as `Checkpoint Documentation Consistency`.

## What Works Now

- Route-backed review panels render for operator home, onboarding, assisted coding, validation, review inbox, recovery, run history, readiness, repo hygiene, and recent live workflow review families.
- Safety copy, hidden smoke markers, deterministic builders, and smoke scripts cover the provider/local/connector/automation/unified/beta/Beta 2/final policy polish/Foundation 500/real daily workflow/multi-workflow/Daily Beta/Daily Beta 1 controlled trial, execution boundary, first approved test execution, first end-to-end workflow release-candidate, controlled rollout, final boundary signoff, Daily Beta candidate, operator handoff, Daily Beta activation, Daily Beta 1 activation, universal execution foundation, controlled builder dry-run, bounded adapter implementation-plan, first real adapter MVP design, first bounded adapter implementation, first useful controlled adapter MVP, first adapter execution beta boundary, real adapter wiring plan, broad controlled builder beta, backend/local adapter contract, backend adapter implementation/dry-run packet, model router/provider readiness, controlled model-use release-candidate, model router execution-readiness candidate, controlled model router beta release-candidate, model-routed backend execution, project-builder MVP, universal game-builder, universal project-builder, universal builder cockpit, guided build workflow, build plan bundle, build plan approval, guarded execution queue, dry-run execution handoff, simulated file write dry-run, simulated command execution dry-run, simulated runtime execution dry-run, simulated adapter execution dry-run, real guarded file-write adapter, real guarded command-runner adapter, unified cockpit, cockpit evidence/result/recovery, first local change trial, end-to-end build/fix workflow, daily-testable cockpit MVP, and project context brain checkpoint surfaces.
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

- Unified cockpit: `/codexforge-cockpit` is the preferred normal user surface for goal, plan, work proposal, file-write diff preview, command preview, approval queue, execution state, evidence, result, recovery, timeline, model/tool handoff, safety coach, project context brain summary, and dev/test diagnostics.
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
- Controlled builder dry-run layer: `/project-scaffold-dry-run-plan`, `/project-scaffold-evidence-review`, `/project-scaffold-result-review`, `/project-scaffold-recovery-review`, `/project-scaffold-hardening-pass`, `/file-write-controlled-trial-plan`, `/file-write-controlled-trial-review`, `/command-execution-controlled-trial-plan`, `/command-execution-controlled-trial-review`, `/local-runtime-controlled-trial-plan`, `/local-runtime-controlled-trial-review`, `/provider-model-controlled-trial-plan`, `/connector-controlled-trial-plan`, `/automation-controlled-trial-plan`, `/packaging-export-controlled-trial-plan`, `/universal-builder-controlled-trial-candidate`.
- Project-builder MVP review layer: `/project-builder-mvp-integration-boundary`, `/project-goal-intake-packet`, `/project-domain-classifier-preview`, `/project-plan-model-routing-preview`, `/project-file-plan-preview`, `/project-command-plan-preview`, `/project-runtime-plan-preview`, `/project-evidence-plan-preview`, `/project-result-plan-preview`, `/project-recovery-plan-preview`, `/project-packaging-plan-preview`, `/project-approval-plan-preview`, `/project-builder-operator-review`, `/first-useful-project-builder-candidate`, `/project-builder-mvp-trial-packet`, `/controlled-project-builder-release-candidate`.
- Universal game-builder review layer: `/universal-game-builder-boundary`, `/game-target-intake-packet`, `/game-platform-classifier-preview`, `/game-server-plan-preview`, `/game-modpack-plan-preview`, `/game-content-plan-preview`, `/game-automation-plan-preview`, `/game-asset-pipeline-plan-preview`, `/game-deployment-plan-preview`, `/game-safety-approval-plan`, `/game-evidence-capture-plan`, `/game-result-review-plan`, `/game-recovery-plan-preview`, `/game-packaging-plan-preview`, `/first-universal-game-builder-candidate`, `/controlled-universal-game-builder-release-candidate`.
- Universal project-builder review layer: `/universal-project-builder-boundary`, `/app-builder-target-packet`, `/website-builder-target-packet`, `/dashboard-builder-target-packet`, `/tool-builder-target-packet`, `/research-pack-builder-target-packet`, `/automation-workflow-builder-target-packet`, `/creative-workflow-builder-target-packet`, `/trading-workspace-builder-target-packet`, `/data-workspace-builder-target-packet`, `/documentation-pack-builder-target-packet`, `/integration-pack-builder-target-packet`, `/universal-project-builder-safety-plan`, `/first-universal-project-builder-candidate`, `/universal-builder-mvp-trial-packet`, `/controlled-universal-project-builder-release-candidate`.
- Universal builder cockpit review layer: `/universal-builder-cockpit-boundary`, `/build-anything-goal-composer`, `/builder-intent-clarifier-preview`, `/builder-target-recommendation-preview`, `/builder-plan-outline-preview`, `/builder-adapter-stack-preview`, `/builder-approval-timeline-preview`, `/builder-evidence-timeline-preview`, `/builder-result-timeline-preview`, `/builder-recovery-timeline-preview`, `/builder-packaging-timeline-preview`, `/builder-cost-privacy-risk-review`, `/builder-operator-decision-packet`, `/first-guided-build-anything-candidate`, `/universal-builder-cockpit-trial-packet`, `/controlled-universal-builder-cockpit-release-candidate`.
- Guided build workflow review layer: `/guided-build-workflow-boundary`, `/guided-build-goal-review`, `/guided-build-target-selection`, `/guided-build-requirement-checklist`, `/guided-build-architecture-sketch`, `/guided-build-file-blueprint`, `/guided-build-command-blueprint`, `/guided-build-runtime-blueprint`, `/guided-build-adapter-blueprint`, `/guided-build-validation-blueprint`, `/guided-build-risk-review`, `/guided-build-approval-queue`, `/guided-build-evidence-plan`, `/guided-build-result-plan`, `/first-practical-guided-build-candidate`, `/controlled-guided-build-workflow-release-candidate`.
- Build plan bundle review layer: `/build-plan-bundle-boundary`, `/build-plan-summary-packet`, `/build-plan-requirements-packet`, `/build-plan-architecture-packet`, `/build-plan-file-manifest-packet`, `/build-plan-command-manifest-packet`, `/build-plan-runtime-manifest-packet`, `/build-plan-adapter-manifest-packet`, `/build-plan-validation-manifest-packet`, `/build-plan-risk-manifest-packet`, `/build-plan-approval-manifest-packet`, `/build-plan-evidence-manifest-packet`, `/build-plan-result-manifest-packet`, `/build-plan-recovery-manifest-packet`, `/first-complete-build-plan-candidate`, `/controlled-build-plan-bundle-release-candidate`.
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

- Current checkpoint: documentation and hygiene alignment through detected phase 1545.
- Next milestone: keep Provider Approval Gate work preview-only unless explicitly approved, and choose any first bounded backend/local/model implementation proposal only after explicit approval, backend contract review, local bridge contract review, sandbox enforcement, audit, evidence/result links, rollback plan, validation packet, denial behavior, and safety smoke evidence exist.
- Keep provider, local model, connector, automation, unified workflow, beta operator, Daily Beta 1 controlled trial, execution boundary, launch governance, controlled launch review, and universal workflow profile pages review-only until those boundaries exist.
- Do not claim CI passed unless actual CI or terminal logs prove it.


The previous simulated adapter execution dry-run review layer covered boundary, intent packet, selection review, capability review, permission review, input review, output review, risk review, evidence preview, result preview, failure preview, recovery preview, operator review, execution hold state, First Simulated Adapter Candidate, and Controlled Simulated Adapter Release Candidate surfaces. Simulated adapter execution previews remain static, deterministic, review-only, preview-only, and approval-gated until explicit operator approval. They represent guarded queue reference, dry-run ticket reference, adapter intent, adapter family, adapter capability preview, permission gate, input contract preview, output contract preview, expected evidence preview, expected result preview, failure preview, recovery preview, operator review state, adapter execution hold state, denied adapter execution state, and explicit approval requirement. They support file-write, command-runner, local-runtime, project-scaffold, provider-model, connector, automation, evidence-store, result-store, recovery, packaging, creative, research, chatbot, game-server, no-op, denied, and preview-only adapter families while showing no real adapter call, backend execution, domain execution, connector execution, provider execution, automation execution, creative generation, research execution, game server launch, local runtime start, file mutation, command execution, queue persistence, dry-run execution, or hidden approvals.


Phases 1162-1177 cover Real Guarded File Write Adapter Boundary, File Write Adapter Contract, File Write Path Guard, File Write Diff Builder, File Write Approval Ticket, File Write Preflight Review, File Write Apply Hold, File Write Evidence Capture Contract, File Write Result Capture Contract, File Write Rollback Contract, File Write Dry Run Harness, File Write Denied Mutation Review, File Write Operator Review Packet, File Write Cockpit Integration Contract, First Real Guarded File Write Candidate, Controlled Real Guarded File Write MVP Release Candidate. These surfaces start the real guarded file-write adapter spine as deterministic review/dev surfaces only: UI cannot write files, apply diffs, persist approvals, persist evidence, persist results, execute rollback, run dry-runs, call models, call providers, execute adapters, run commands, start runtimes, spawn processes, bind ports, or mutate paths. Future real file writes remain behind explicit operator approval, path guard, diff preview, preflight review, evidence capture, result capture, and rollback contract. Normal user UX should converge into one CodexForge cockpit showing goal, plan, diff, approval, execution state, evidence, result, and recovery in one place; phase pages are dev/test surfaces only.

Phases 1178-1193 cover Real Guarded Command Runner Adapter Boundary, Command Runner Adapter Contract, Command Allowlist Policy, Command Argument Guard, Command Working Directory Guard, Command Environment Guard, Command Approval Ticket, Command Preflight Review, Command Execution Hold, Command Evidence Capture Contract, Command Result Capture Contract, Command Recovery Contract, Command Dry Run Harness, Command Cockpit Integration Contract, First Real Guarded Command Candidate, Controlled Real Guarded Command MVP Release Candidate. These surfaces prepare the real guarded command-runner adapter spine as deterministic review/dev surfaces only: UI cannot run commands, run shell commands, run git commands, run tests, run builds, run smokes, persist approvals, persist evidence, persist results, execute recovery, run dry-runs, call models, call providers, execute adapters, write files, start runtimes, spawn processes, bind ports, forward credentials, or display environment values. Future real commands remain behind explicit operator approval, command allowlist policy, argument guard, working-directory guard, environment guard, evidence capture, result capture, and recovery contract. Normal user UX should converge into one CodexForge cockpit showing goal, plan, command, approval, execution state, evidence, result, and recovery in one place; phase pages are dev/test surfaces only.

Phases 1194-1209 cover the unified cockpit foundation and establish `/codexforge-cockpit` as the preferred normal user surface. Phases 1210-1225 add cockpit evidence/result/recovery preview surfaces. Phases 1226-1241 cover the first local change trial layer. Phases 1242-1257 add the first cockpit-centered end-to-end build/fix workflow release-candidate layer. Phases 1258-1273 cover Guided Operator Run Boundary through Controlled Guided Operator Run Hardening Release Candidate. Phases 1274-1289 cover Controlled Execution Readiness Gate Boundary through Controlled Execution Readiness Gate Release Candidate. Phases 1290-1305 cover Real Controlled Operator Trial Packet Boundary through Controlled Real Operator Trial Packet Release Candidate. Phases 1306-1321 cover Backend Approval Handoff Boundary through Controlled Backend Approval Handoff Release Candidate. Phases 1322-1337 cover Backend Guarded Apply Run Boundary through Controlled Backend Guarded Apply Run Preview Release Candidate. Phases 1338-1353 cover Guarded Apply Run Dry-Run Boundary through Controlled Guarded Apply Run Dry-Run Release Candidate. Phases 1354-1369 cover Tiny Real Controlled Trial Boundary through Controlled Tiny Real Operator Trial Release Candidate. Phases 1370-1385 cover Real Trial Hardening Boundary through Controlled Real Trial Hardening Release Candidate. Phases 1386-1401 cover Daily-Testable Cockpit Boundary through Controlled Daily-Testable Cockpit MVP Release Candidate. Phases 1402-1417 cover Project Context Brain Boundary through Controlled Project Context Brain Release Candidate. Phases 1418-1433 cover Goal Compiler Boundary through Controlled Goal Compiler Release Candidate. Phases 1434-1449 cover Plan Diff Command Composer Boundary through Controlled Plan Diff Command Composer Release Candidate. Phases 1450-1465 cover Evidence Memory Boundary through Controlled Evidence Memory Release Candidate. Phases 1466-1481 cover Backend Execution Queue Boundary through Controlled Backend Execution Queue Release Candidate. Phases 1482-1497 cover Apply Run Transaction Boundary through Controlled Apply Run Transaction Release Candidate. Phases 1498-1513 cover Command Runner Safety Boundary through Controlled Command Runner Safety v2 Release Candidate. Phases 1514-1529 cover Release-Grade Audit Trail Boundary through Controlled Release-Grade Audit Trail Release Candidate. Phases 1530-1545 cover Model Router v2 Boundary through Controlled Model Router v2 Release Candidate. These surfaces keep `/codexforge-cockpit` current through phase 1545 as the normal user surface while phase pages remain dev test diagnostics only. Latest completed batch: 1530-1545 - Model Router v2. Latest release candidate: Controlled Model Router v2 Release Candidate. frontend model/provider/connector calls still blocked. backend-owned provider-gated model routing remains required. File writes, diff application, commands, queue creation, transaction creation, snapshot creation, execution release, environment value display, shell escalation, install, deploy, port binding, runtime starts, process spawning, memory promotion, model calls, provider calls, connector calls, prompt sending, credential storage, hidden routing, hidden approval, browser storage writes, approval persistence, evidence persistence, result persistence, audit persistence, rollback execution, retry execution, and recovery execution remain blocked from the cockpit until explicit operator approval and backend-owned provider gating exist. Next likely batch: 1546-1561 - Provider Approval Gate.
