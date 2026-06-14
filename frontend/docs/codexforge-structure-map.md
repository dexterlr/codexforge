# CodexForge Structure Map

CodexForge is a local-first developer workspace checkpointed through detected phase 513 in the local all-smoke registry. This map is for orientation only. It does not rename existing route folders or feature domains.

## Main route groups

- Start and novice onboarding: `/start`, `/onboarding`, `/first-task`, `/assist`, `/safety-coach`, `/help-empty-states`, `/assisted-quality`.
- Assisted coding and fix flow: `/code-flow`, `/apply-guard-review`, `/guarded-apply-candidate`, `/guarded-apply-mvp`, `/apply-evidence`, `/apply-validation`, `/validation-results`, `/review-inbox`, `/recovery`, `/workflow-results`, `/run-history`.
- Provider and readiness: `/ai-router`, `/ai-providers`, `/provider-adapters`, `/provider-health`, `/env-readiness`, `/local-provider-probes`, `/provider-tests`, `/provider-live-test-gate`, `/provider-test-results`, `/prompt-privacy-classifier`, `/provider-policy-bundle`, `/provider-governance-release-audit`, `/model-capabilities`, `/task-router`, `/credentials`, `/provider-setup`, `/token-router`.
- Provider live trial review: `/provider-live-call-guard-review`, `/first-provider-live-call-trial-review`, `/provider-live-response-capture-review`, `/provider-live-trial-release-candidate`.
- Local model live trial review: `/local-model-runtime-boundary-review`, `/local-model-output-review-inbox`, `/local-model-live-call-guard-review`, `/first-local-model-live-trial-review`, `/local-model-live-output-capture-review`, `/local-model-live-trial-release-candidate`, `/local-model-integration-release-candidate`.
- Connector live trial review: `/connector-live-permission-trial-review`, `/connector-live-access-guard-review`, `/first-connector-live-access-trial-review`, `/connector-live-evidence-capture-review`, `/connector-live-trial-release-candidate`, `/connector-integration-release-candidate`.
- Automation live trial review: `/automation-dry-run-trial-review`, `/automation-approval-queue-review`, `/automation-live-execution-guard-review`, `/first-automation-live-dry-run-replay`, `/first-automation-live-approval-trial`, `/automation-live-trial-release-candidate`, `/automation-integration-release-candidate`.
- Unified live workflow trial 2: `/unified-live-workflow-trial-2`, `/unified-live-workflow-trial-2-result-review`, `/unified-live-workflow-trial-2-failure-recovery`, `/unified-live-workflow-trial-2-hardening-pass`.
- Beta operator daily workflow: `/beta-operator-daily-workflow-trial`, `/beta-operator-daily-workflow-review`, `/beta-operator-workflow-friction-patch`, `/beta-operator-workflow-release-candidate`.
- Beta workflow release review: `/beta-workflow-release-regression-review`, `/beta-workflow-safety-signoff-review`, `/beta-workflow-documentation-review`, `/beta-workflow-onboarding-final-pass`.
- Beta 2 review and hardening: `/codexforge-beta-2-release-candidate`, `/beta-2-controlled-operator-trial`, `/beta-2-operator-feedback-review`, `/beta-2-hardening-pass`.
- Unified operator cohesion and final policy polish: `/provider-local-connector-automation-cohesion-review`, `/unified-approval-policy-final-review`, `/unified-evidence-policy-final-review`, `/unified-result-policy-final-review`, `/unified-recovery-policy-final-review`, `/unified-settings-preferences-review`, `/daily-operator-cockpit-final-polish`, `/global-command-palette-final-polish`.
- Jarvisd and local boundaries: `/jarvisd-contract`, `/jarvisd-health`, `/jarvisd-capabilities`, `/jarvisd-permissions`, `/local-file-approval`, `/local-command-approval`, `/local-process-monitor`, `/workspace-trust-policy`.
- Project intelligence and patch planning: `/safe-project-indexer`, `/project-file-search`, `/project-dependency-map`, `/project-risk-secrets-scan`, `/codebase-change-plan`, `/patch-preview-workbench`, `/patch-apply-approval`, `/patch-result-capture`.
- Brain and memory: `/brain`, `/memory`, `/memory-inbox`, `/brain-snapshots`, `/snapshot-restore`, `/brain-continuity`, `/brain-governance`, `/runtime-journal`, `/runtime-replay`, `/handoff`.
- Creative and video: `/creative`, `/local-creative`, `/comfyui-health`, `/video-workflows`, `/video-jobs`, `/video-prompt`, `/storyboard`, `/keyframes`, `/local-draft-review`, `/comfyui-workflows/*`, `/video-review`, `/video-recovery`, `/video-compare`, `/video-finishing`, `/video-render`, `/creative-executor`, `/creative-sandbox`, `/blender`, `/unreal`, `/comfyui`.
- Artifacts and runtime: `/artifacts`, `/artifacts/review`, `/activity`, `/capabilities`, `/local-bridge-health`, `/creative-bridge`, `/history`.
- Audit and admin readiness: `/readiness`, `/quality-audit`, `/consolidation`, `/validation`, `/stabilization`, `/repo-hygiene`.

## Provider and AI folders

Provider/router domains live under `src/lib/codexforge/ai-router`, `ai-provider-registry`, `provider-adapters`, `provider-health`, `provider-setup`, `provider-connection-test-ux`, `safe-env-key-detection`, `local-provider-probe-preview`, `provider-live-test-gate`, `prompt-privacy-classifier`, `provider-policy-bundle`, `provider-governance-release-audit`, and related local machine/provider readiness folders.

These areas are metadata, readiness, and review-only surfaces unless a future explicit server-side adapter is approved. They must not store browser secrets, store live outputs, or call live provider APIs from review UI.

## Jarvisd and local boundary folders

Jarvisd and local operation domains include `jarvisd-local-daemon-contract`, `jarvisd-health-version-probe`, `jarvisd-capability-registry`, `jarvisd-permission-boundary`, `local-file-operation-approval-gate`, `local-command-execution-approval-gate`, `local-process-monitor-preview`, and `local-workspace-trust-policy`.

These areas define reviewed boundaries for a future approved local daemon/service. They must not grant permissions automatically, run commands, browse arbitrary local files, mutate files, print environment values, call local services, call local models, call connectors, or run automations from arbitrary UI.

## Coding MVP folders

Coding workflow domains include `workflow-wizard`, `assisted-coding-mode`, `guarded-apply-mvp`, `apply-validation-hardening`, `validation-runner`, `workflow-result-persistence`, `run-history`, `review-inbox`, `guided-recovery-flow`, `safe-local-project-indexer`, `project-file-search-preview`, `project-dependency-map`, `project-risk-secrets-scanner`, `codebase-change-plan-builder`, `patch-preview-workbench`, `patch-apply-approval-boundary`, `patch-result-capture`, and related `code-flow` route folders.

These surfaces should keep patch planning, validation capture, and result review separate from actual mutation.

## Creative and video folders

Creative/video planning domains include `creative`, `local-creative-provider-registry`, `comfyui-local-health-check`, `local-video-workflow-catalog`, `video-job-queue-preview`, `video-prompt-builder`, `storyboard-planner`, `keyframe-plan-builder`, `local-draft-render-review`, `video-finishing-pipeline`, `video-render-job-preview`, and creative adapter previews.

Most creative surfaces are preview-only. They must not call ComfyUI, Blender, Unreal, local render queues, or provider APIs from the frontend.

## Brain and memory folders

Brain and memory domains include `brain`, `brain-recall`, `brain-continuity`, `brain-governance`, `brain-snapshot-manager`, `memory-review`, `memory-persistence`, `memory-promotion-gate`, `operator-memory-inbox`, `runtime-event-journal`, and `runtime-event-replay`.

Brain graph mutation and memory promotion are safety-critical. UI panels should not call `appendEvent`, `saveBrainGraph`, or direct graph mutation paths.

## Artifact and runtime folders

Artifact/runtime domains include `artifact-executor`, `artifact-workspace`, `artifact-export-flow`, `artifact-ingestion`, `workflow-result-persistence`, `runtime-event-executor`, `runtime-event-journal`, and `runtime-event-replay`.

Artifact review may show planned records, previews, and handoffs. Local generated files and runtime state are not source work.

## Preview-only, real runtime, and safety-critical

Preview-only and approval-gated areas include most creative adapters, ComfyUI workflow planning, local provider probes, provider live-test gates, provider live trial review, local model live trial review, connector live trial review, automation live trial review, unified live workflow trial 2 review, beta operator workflow review, Beta 2 review and hardening, unified operator cohesion and final policy polish, Jarvisd readiness, local operation boundaries, project intelligence, video render job previews, and guarded apply planning.

Real runtime areas include deterministic local domain builders, route rendering, command palette routing/copy actions, smoke scripts, and Next.js build/typecheck validation.

Safety-critical areas include secrets/env handling, apply-diff/write-file/run-command boundaries, Brain graph mutation, memory promotion, provider calls, local creative execution, and generated file hygiene.

## Naming conventions for future folders

- Use route folders that match public route intent, such as `repo-hygiene` for `/repo-hygiene`.
- Keep domain builders under `src/lib/codexforge/<domain>/`.
- Keep UI panels under `src/lib/codexforge/<domain>/components/`.
- Use `*-types.ts`, focused builder files, `*-summary.ts`, and `index.ts` exports.
- Name preview-only domains explicitly when execution is not available.
- Keep smoke scripts named `scripts/smoke-codexforge-<domain>.ps1`.
- Do not introduce generated folder names that look like source domains.
