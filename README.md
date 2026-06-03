# CodexForge

## What CodexForge Is

CodexForge is a local-first AI developer/operator workspace. It provides frontend control surfaces for planning, reviewing, and validating AI-assisted coding and operator workflows while keeping real file mutation, command execution, patch apply, provider calls, local daemon action, and test execution behind explicit approval gates or future approved local-boundary work.

## Current State

CodexForge currently includes deterministic frontend surfaces for:

- Operator home, guided onboarding, assisted coding, validation capture, review inbox, recovery, run history, readiness, and repo hygiene.
- Brain and memory review, runtime journal/replay, snapshots, continuity, mutation governance, and memory promotion gates.
- Provider governance, setup, health, budget, privacy, live-test approval gates, result capture, and failure recovery.
- Jarvisd/local-daemon contract, health, capability, permission, local file approval, local command approval, local process preview, and workspace trust boundaries.
- Project intelligence, including safe project indexer, project file search preview, dependency map, and risk/secrets scanner.
- Codebase patch planning through change plans, patch preview workbench, patch apply approval boundary, and patch result capture.
- Test planning surfaces for test command planning, test execution approval, test result summarization, and test failure triage.

These are frontend review and approval surfaces. CodexForge does not claim real backend execution for file mutation, shell execution, provider calls, Jarvisd action, patch apply, or test execution unless a specific approved local boundary implements it.

## Safety Model

- No silent mutation.
- No arbitrary local file browsing from UI.
- No command or test execution from arbitrary UI.
- No patch application from UI.
- No provider calls, live-test sends, or token-spending routes without explicit approval gates.
- Secrets are redacted and never displayed, exported, or stored in `localStorage`.
- Jarvisd permissions and local daemon actions are not granted or executed automatically.
- Brain graph mutation, `appendEvent`, `saveBrainGraph`, memory promotion, and runtime persistence are not called from UI review surfaces.
- `process.env` values are not printed in UI or logs.

## Main Route Families

- Start and safe coding: `/`, `/start`, `/onboarding`, `/first-task`, `/assist`, `/code-flow`.
- Validation and review: `/apply-validation`, `/validation-results`, `/review-inbox`, `/recovery`, `/workflow-results`, `/run-history`.
- Project and patch planning: `/safe-project-indexer`, `/project-file-search`, `/project-dependency-map`, `/project-risk-secrets-scan`, `/codebase-change-plan`, `/patch-preview-workbench`, `/patch-apply-approval`, `/patch-result-capture`.
- Test planning: `/test-command-planner`, `/test-execution-approval`, `/test-result-summary`, `/test-failure-triage`.
- Provider governance: `/ai-router`, `/ai-providers`, `/provider-adapters`, `/provider-health`, `/provider-live-test-gate`, `/provider-test-results`, `/provider-governance-release-audit`.
- Jarvisd and local boundaries: `/jarvisd-contract`, `/jarvisd-health`, `/jarvisd-capabilities`, `/jarvisd-permissions`, `/local-file-approval`, `/local-command-approval`, `/local-process-monitor`, `/workspace-trust-policy`.
- Brain, memory, and audit: `/brain`, `/memory`, `/memory-inbox`, `/runtime-journal`, `/runtime-replay`, `/brain-snapshots`, `/snapshot-restore`, `/brain-continuity`, `/brain-governance`, `/handoff`.
- Creative and artifact review: `/creative`, `/local-creative`, `/comfyui`, `/video-workflows`, `/video-jobs`, `/video-review`, `/creative-readiness`, `/artifacts/review`.
- Readiness and administration: `/capabilities`, `/activity`, `/readiness`, `/repo-hygiene`, `/quality-audit`, `/consolidation`, `/validation`, `/stabilization`, `/history`.

## Development And Validation Commands

Run from `frontend`:

```powershell
npm install
npm run dev
npm run build
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-test-command-planner.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-test-execution-approval-boundary.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-test-result-summarizer.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-test-failure-triage-router.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-command-ui-simplification.ps1
git diff --check
```

Optional broader checks:

```powershell
npm run smoke:codexforge:server
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-all.ps1
```

## Roadmap

- Phases 230-233 are now the test-planning batch: test command planner, test execution approval boundary, test result summarizer, and test failure triage router.
- Next: phases 234-237 for Git review and commit approval surfaces.
- Later: release, Jarvisd audit, and approved local-boundary hardening.
