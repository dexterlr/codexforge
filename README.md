# CodexForge

## What CodexForge Is

CodexForge is a local-first AI developer/operator workspace. It provides frontend control surfaces for planning, reviewing, approving, and validating AI-assisted coding and operator workflows while real file mutation, command execution, patch apply, provider calls, local daemon action, connector access, automation, and test execution remain behind explicit approval gates or future approved boundaries.

## Current State

Current checkpoint: through phase 2409, detected from the local `frontend/scripts/smoke-codexforge-all.ps1` registry by taking the highest `Phase N` entry. The latest completed batch is 2378-2409 - Provider Adapter Mock Result Harness Mega Batch v1. Latest release candidate: Controlled Provider Mock Result Harness Completion Candidate. /codexforge-cockpit keeps the premium Jarvis command area, backend wiring readiness rail, Provider Gateway Wiring readiness section, Provider Backend Adapter Contract readiness section, Provider Adapter Dry Run Harness section, and Provider Adapter Mock Result Harness section. No live provider execution exists yet. No provider calls from frontend. No model calls from frontend. No prompt sending. No streaming. No credential storage. No token storage. The dry run harness remains synthetic and review-only. Provider dry run remains backend-owned. The mock result harness remains synthetic and review-only. Synthetic provider mock result data only. Provider mock result handling remains backend-owned. Explicit operator approval required. Audit trail required. Next likely batch: 2410-2441 - Provider Approval/Audit Enforcement Boundary Mega Batch v1.

CodexForge currently includes deterministic frontend review and approval surfaces for:

- Operator home, guided onboarding, assisted coding, validation capture, review inbox, recovery, run history, readiness, route search, and repo hygiene.
- Brain and memory review, runtime journal/replay, snapshots, continuity, mutation governance, memory inbox, and memory promotion gates.
- Provider governance, setup, health, budget, privacy, live trial review, result capture, cost/rate-limit review, safety regression review, and failure recovery.
- Local model trial review, runtime boundary review, output review inbox, failover review, and local model integration release-candidate surfaces.
- Connector permission review, redaction review, evidence handoff, live access guard review, live evidence capture review, and connector release-candidate surfaces.
- Automation dry-run review, approval queue review, schedule safety review, live execution guard review, replay/approval trial review, and automation release-candidate surfaces.
- Unified live workflow trial 2, result review, failure recovery review, and hardening review.
- Beta operator daily workflow trial, review, friction patch review, and release candidate.
- Beta workflow release regression, safety signoff, documentation, onboarding final pass, Beta 2 release candidate, controlled trial, feedback review, and hardening pass review surfaces.
- Jarvisd/local-daemon contract, health, capability, permission, local file approval, local command approval, local process preview, and workspace trust boundaries.
- Project intelligence, codebase change planning, patch preview, patch apply approval, patch result capture, test planning, and test result/failure review.
- Model router/provider preview, model connection-test preview, model scoring, controlled model-use dry-run preview, shared context and memory handoff review, decision explanation review, first controlled model router trial review, controlled model-use release-candidate, provider test packet, trial cockpit, provider trial candidate, model router execution-readiness candidate, controlled model router beta release-candidate, model-routed backend execution review, project-builder MVP review, universal game-builder review, universal project-builder review, universal builder cockpit review, guided build workflow review, build plan bundle review, build plan approval review, guarded execution queue preview, dry-run execution handoff preview, simulated file write dry-run preview, simulated command execution dry-run preview, simulated runtime execution dry-run preview, real guarded file-write adapter review, real guarded command-runner adapter review, unified cockpit, and cockpit evidence/result/recovery review surfaces.

These are review-only surfaces unless an approved local/backend/provider boundary exists for the specific action. CodexForge is the brain; models are workers that share the same CodexForge brain, memory, knowledge, evidence, result, audit, and approval layer. CodexForge does not claim live execution for provider, local model, connector, automation, file, shell, patch, test, Jarvisd, model routing, or memory mutation work from arbitrary UI.

## Safety Model

- Review-only surfaces are the default.
- Explicit operator approval is required before any mutation-capable or spend-capable action can be considered.
- No silent mutation.
- No automatic provider/local/connector/automation execution without approval.
- No arbitrary local file browsing from UI.
- No command, shell, test, patch apply, process control, connector, automation, provider, local model, or local daemon execution from arbitrary UI.
- No credential/output storage in browser storage; secrets and live outputs must not be persisted in `localStorage` or `sessionStorage`.
- No provider calls, live-test sends, local model calls, connector access, automation runs, or token-spending routes without explicit approval gates and result review.
- Jarvisd permissions and local daemon actions are not granted or executed automatically.
- Brain graph mutation, `appendEvent`, `saveBrainGraph`, memory promotion, and runtime persistence are not called from UI review surfaces.
- No memory auto-promotion.
- `process.env` values are not printed in UI or logs.

## Main Route Families

- Start and safe coding: `/`, `/start`, `/onboarding`, `/first-task`, `/assist`, `/code-flow`.
- Validation and review: `/apply-validation`, `/validation-results`, `/review-inbox`, `/recovery`, `/workflow-results`, `/run-history`.
- Project, patch, and test planning: `/safe-project-indexer`, `/project-file-search`, `/project-dependency-map`, `/project-risk-secrets-scan`, `/codebase-change-plan`, `/patch-preview-workbench`, `/patch-apply-approval`, `/patch-result-capture`, `/test-command-planner`, `/test-execution-approval`, `/test-result-summary`, `/test-failure-triage`.
- Project-builder MVP review: `/project-builder-mvp-integration-boundary`, `/project-goal-intake-packet`, `/project-domain-classifier-preview`, `/project-plan-model-routing-preview`, `/project-file-plan-preview`, `/project-command-plan-preview`, `/project-runtime-plan-preview`, `/project-evidence-plan-preview`, `/project-result-plan-preview`, `/project-recovery-plan-preview`, `/project-packaging-plan-preview`, `/project-approval-plan-preview`, `/project-builder-operator-review`, `/first-useful-project-builder-candidate`, `/project-builder-mvp-trial-packet`, `/controlled-project-builder-release-candidate`.
- Universal game-builder review: `/universal-game-builder-boundary`, `/game-target-intake-packet`, `/game-platform-classifier-preview`, `/game-server-plan-preview`, `/game-modpack-plan-preview`, `/game-content-plan-preview`, `/game-automation-plan-preview`, `/game-asset-pipeline-plan-preview`, `/game-deployment-plan-preview`, `/game-safety-approval-plan`, `/game-evidence-capture-plan`, `/game-result-review-plan`, `/game-recovery-plan-preview`, `/game-packaging-plan-preview`, `/first-universal-game-builder-candidate`, `/controlled-universal-game-builder-release-candidate`.
- Universal project-builder review: `/universal-project-builder-boundary`, `/app-builder-target-packet`, `/website-builder-target-packet`, `/dashboard-builder-target-packet`, `/tool-builder-target-packet`, `/research-pack-builder-target-packet`, `/automation-workflow-builder-target-packet`, `/creative-workflow-builder-target-packet`, `/trading-workspace-builder-target-packet`, `/data-workspace-builder-target-packet`, `/documentation-pack-builder-target-packet`, `/integration-pack-builder-target-packet`, `/universal-project-builder-safety-plan`, `/first-universal-project-builder-candidate`, `/universal-builder-mvp-trial-packet`, `/controlled-universal-project-builder-release-candidate`.
- Guided build workflow review: `/guided-build-workflow-boundary`, `/guided-build-goal-review`, `/guided-build-target-selection`, `/guided-build-requirement-checklist`, `/guided-build-architecture-sketch`, `/guided-build-file-blueprint`, `/guided-build-command-blueprint`, `/guided-build-runtime-blueprint`, `/guided-build-adapter-blueprint`, `/guided-build-validation-blueprint`, `/guided-build-risk-review`, `/guided-build-approval-queue`, `/guided-build-evidence-plan`, `/guided-build-result-plan`, `/first-practical-guided-build-candidate`, `/controlled-guided-build-workflow-release-candidate`.
- Build plan bundle review: `/build-plan-bundle-boundary`, `/build-plan-summary-packet`, `/build-plan-requirements-packet`, `/build-plan-architecture-packet`, `/build-plan-file-manifest-packet`, `/build-plan-command-manifest-packet`, `/build-plan-runtime-manifest-packet`, `/build-plan-adapter-manifest-packet`, `/build-plan-validation-manifest-packet`, `/build-plan-risk-manifest-packet`, `/build-plan-approval-manifest-packet`, `/build-plan-evidence-manifest-packet`, `/build-plan-result-manifest-packet`, `/build-plan-recovery-manifest-packet`, `/first-complete-build-plan-candidate`, `/controlled-build-plan-bundle-release-candidate`.
- Provider governance and provider live trial review: `/ai-router`, `/ai-providers`, `/provider-adapters`, `/provider-health`, `/provider-live-test-gate`, `/openai-compatible-live-test`, `/multi-provider-live-test`, `/provider-live-call-guard-review`, `/first-provider-live-call-trial-review`, `/provider-live-response-capture-review`, `/provider-live-trial-release-candidate`, `/provider-test-results`, `/provider-governance-release-audit`.
- Local model live trial review: `/local-model-runtime-boundary-review`, `/local-model-output-review-inbox`, `/local-model-live-call-guard-review`, `/first-local-model-live-trial-review`, `/local-model-live-output-capture-review`, `/local-model-live-trial-release-candidate`, `/local-model-integration-release-candidate`.
- Connector live trial review: `/connector-live-permission-trial-review`, `/connector-live-access-guard-review`, `/first-connector-live-access-trial-review`, `/connector-live-evidence-capture-review`, `/connector-live-trial-release-candidate`, `/connector-integration-release-candidate`.
- Automation live trial review: `/automation-dry-run-trial-review`, `/automation-approval-queue-review`, `/automation-live-execution-guard-review`, `/first-automation-live-dry-run-replay`, `/first-automation-live-approval-trial`, `/automation-live-trial-release-candidate`, `/automation-integration-release-candidate`.
- Unified live workflow trial 2: `/unified-live-workflow-trial-2`, `/unified-live-workflow-trial-2-result-review`, `/unified-live-workflow-trial-2-failure-recovery`, `/unified-live-workflow-trial-2-hardening-pass`.
- Beta operator daily workflow: `/beta-operator-daily-workflow-trial`, `/beta-operator-daily-workflow-review`, `/beta-operator-workflow-friction-patch`, `/beta-operator-workflow-release-candidate`.
- Beta 2 review and hardening: `/beta-workflow-release-regression-review`, `/beta-workflow-safety-signoff-review`, `/beta-workflow-documentation-review`, `/beta-workflow-onboarding-final-pass`, `/codexforge-beta-2-release-candidate`, `/beta-2-controlled-operator-trial`, `/beta-2-operator-feedback-review`, `/beta-2-hardening-pass`.
- Jarvisd and local boundaries: `/jarvisd-contract`, `/jarvisd-health`, `/jarvisd-capabilities`, `/jarvisd-permissions`, `/local-file-approval`, `/local-command-approval`, `/local-process-monitor`, `/workspace-trust-policy`.
- Brain, memory, and audit: `/brain`, `/memory`, `/memory-inbox`, `/runtime-journal`, `/runtime-replay`, `/brain-snapshots`, `/snapshot-restore`, `/brain-continuity`, `/brain-governance`, `/handoff`.
- Creative and artifact review: `/creative`, `/local-creative`, `/comfyui`, `/video-workflows`, `/video-jobs`, `/video-review`, `/creative-readiness`, `/artifacts/review`.
- Readiness and administration: `/capabilities`, `/activity`, `/readiness`, `/repo-hygiene`, `/quality-audit`, `/consolidation`, `/validation`, `/stabilization`, `/history`.

## Development And Validation Commands

Run checkpoint validation from `frontend`:

```powershell
npm run build
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-checkpoint-docs.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-all.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-command-ui-simplification.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-repo-hygiene.ps1
npm run smoke:codexforge:server
git diff --check
git status --short
git diff --stat
```

## Roadmap

- Current checkpoint: documentation and hygiene alignment through detected phase 2409.
- Next milestone: 2410-2441 - Provider Approval/Audit Enforcement Boundary Mega Batch v1. Keep the provider mock result harness synthetic and review-only and do not enable live provider execution, provider calls, model calls, prompt sending, streaming, credential storage, token storage, frontend persistence, browser storage writes, connector calls, queue dispatch, worker dispatch, service creation, API creation, hidden execution affordances, or performance guarantee claims.
- Do not claim live execution unless an approved local/backend/provider boundary exists.
- Do not claim CI passed unless actual CI or terminal logs prove it.

The latest simulated runtime execution dry-run review layer covers phases 1130-1145: boundary, intent packet, plan packet, process review, port review, environment review, dependency review, risk review, evidence preview, result preview, failure preview, recovery preview, operator review, execution hold state, First Simulated Runtime Candidate, and Controlled Simulated Runtime Release Candidate. These surfaces remain static, deterministic, preview-only, denied runtime execution by default, and require explicit operator approval before any runtime start, process spawn, port binding, endpoint call, local bridge call, health probe, evidence persistence, result persistence, recovery, queue persistence, dry-run execution, model call, provider call, backend adapter execution, or domain adapter execution can exist.


Phases 1162-1177 cover Real Guarded File Write Adapter Boundary, File Write Adapter Contract, File Write Path Guard, File Write Diff Builder, File Write Approval Ticket, File Write Preflight Review, File Write Apply Hold, File Write Evidence Capture Contract, File Write Result Capture Contract, File Write Rollback Contract, File Write Dry Run Harness, File Write Denied Mutation Review, File Write Operator Review Packet, File Write Cockpit Integration Contract, First Real Guarded File Write Candidate, Controlled Real Guarded File Write MVP Release Candidate. These surfaces start the real guarded file-write adapter spine as deterministic review/dev surfaces only: UI cannot write files, apply diffs, persist approvals, persist evidence, persist results, execute rollback, run dry-runs, call models, call providers, execute adapters, run commands, start runtimes, spawn processes, bind ports, or mutate paths. Future real file writes remain behind explicit operator approval, path guard, diff preview, preflight review, evidence capture, result capture, and rollback contract. Normal user UX should converge into one CodexForge cockpit showing goal, plan, diff, approval, execution state, evidence, result, and recovery in one place; phase pages are dev/test surfaces only.
