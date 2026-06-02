# CodexForge Structure Map

CodexForge is a foundation-stage local-first developer workspace. This map is for orientation only. It does not rename existing route folders or feature domains.

## Main route groups

- Start and novice onboarding: `/start`, `/onboarding`, `/first-task`, `/assist`, `/safety-coach`, `/help-empty-states`, `/assisted-quality`.
- Assisted coding and fix flow: `/code-flow`, `/apply-guard-review`, `/guarded-apply-candidate`, `/guarded-apply-mvp`, `/apply-evidence`, `/apply-validation`, `/validation-results`, `/review-inbox`, `/recovery`, `/workflow-results`, `/run-history`.
- Provider and readiness: `/ai-router`, `/ai-providers`, `/provider-adapters`, `/provider-health`, `/env-readiness`, `/local-provider-probes`, `/provider-tests`, `/model-capabilities`, `/task-router`, `/credentials`, `/provider-setup`, `/token-router`.
- Brain and memory: `/brain`, `/memory`, `/memory-inbox`, `/brain-snapshots`, `/snapshot-restore`, `/brain-continuity`, `/brain-governance`, `/runtime-journal`, `/runtime-replay`, `/handoff`.
- Creative and video: `/creative`, `/local-creative`, `/comfyui-health`, `/video-workflows`, `/video-jobs`, `/video-prompt`, `/storyboard`, `/keyframes`, `/local-draft-review`, `/comfyui-workflows/*`, `/video-review`, `/video-recovery`, `/video-compare`, `/video-finishing`, `/video-render`, `/creative-executor`, `/creative-sandbox`, `/blender`, `/unreal`, `/comfyui`.
- Artifacts and runtime: `/artifacts`, `/artifacts/review`, `/activity`, `/capabilities`, `/local-bridge-health`, `/creative-bridge`, `/history`.
- Audit and admin readiness: `/readiness`, `/quality-audit`, `/consolidation`, `/validation`, `/stabilization`, `/repo-hygiene`.

## Provider and AI folders

Provider/router domains live under `src/lib/codexforge/ai-router`, `ai-provider-registry`, `provider-adapters`, `provider-health`, `provider-setup`, `provider-connection-test-ux`, `safe-env-key-detection`, `local-provider-probe-preview`, and related local machine/provider readiness folders.

These areas are metadata and readiness surfaces unless a future explicit server-side adapter is approved. They must not store browser secrets or call live provider APIs from review UI.

## Coding MVP folders

Coding workflow domains include `workflow-wizard`, `assisted-coding-mode`, `guarded-apply-mvp`, `apply-validation-hardening`, `validation-runner`, `workflow-result-persistence`, `run-history`, `review-inbox`, `guided-recovery-flow`, and related `code-flow` route folders.

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

Preview-only areas include most creative adapters, ComfyUI workflow planning, local provider probes, video render job previews, and guarded apply planning.

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
