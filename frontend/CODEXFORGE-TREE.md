# CodexForge Tree

Branch: `codexforge-foundation`

## App Routes

- `src/app/page.tsx`
- `src/app/ai/page.tsx`
- `src/app/brain/page.tsx`
- `src/app/brain/page-client.tsx`
- `src/app/files/page.tsx`
- `src/app/files/page-client.tsx`
- `src/app/runs/page.tsx`
- `src/app/runs/page-client.tsx`
- `src/app/memory/page.tsx`
- `src/app/memory/page-client.tsx`
- `src/app/tasks/page.tsx`
- `src/app/tasks/page-client.tsx`
- `src/app/capabilities/page.tsx`
- `src/app/capabilities/page-client.tsx`
- `src/app/creative/page.tsx`
- `src/app/creative/page-client.tsx`
- `src/app/history/page.tsx`
- `src/app/mission/page.tsx`
- `src/app/mission/page-client.tsx`
- `src/app/artifacts/page.tsx`
- `src/app/artifacts/page-client.tsx`
- `src/app/production/page.tsx`
- `src/app/production/page-client.tsx`
- `src/app/bridge/page.tsx`
- `src/app/bridge/page-client.tsx`
- `src/app/entry/page.tsx`
- `src/app/clawd/page.tsx`

## API Routes

- `src/app/api/codexforge/chat/route.ts`
- `src/app/api/codexforge/files/route.ts`
- `src/app/api/codexforge/models/route.ts`
- `src/app/api/codexforge/run/route.ts`
- `src/app/api/codexforge/tools/capabilities/route.ts`
- `src/app/api/codexforge/tools/execute/route.ts`
- `src/app/api/codexforge/tools/self-upgrade/route.ts`
- `src/app/api/codexforge/tools/web-research/route.ts`
- `src/app/api/codexforge/artifacts/export/route.ts`
- `src/app/api/codexforge/artifacts/list/route.ts`
- `src/app/api/codexforge/artifacts/preview/route.ts`
- `src/app/api/codexforge/memory/events/append/route.ts`
- `src/app/api/codexforge/memory/events/list/route.ts`
- `src/app/api/operator/apply/route.ts`
- `src/app/api/operator/checkpoint/list/route.ts`
- `src/app/api/operator/checkpoint/restore/route.ts`
- `src/app/api/operator/diff/route.ts`
- `src/app/api/operator/plan/route.ts`
- `src/app/api/operator/read/route.ts`
- `src/app/api/operator/run/get/route.ts`
- `src/app/api/operator/run/list/route.ts`
- `src/app/api/operator/run/start/route.ts`
- `src/app/api/operator/run/update/route.ts`
- `src/app/api/operator/snapshot/route.ts`
- `src/app/api/operator/test/route.ts`

## Major Domains

- `src/lib/codexforge/brain`
- `src/lib/codexforge/brain-recall`
- `src/lib/codexforge/chat-recall`
- `src/lib/codexforge/memory-review`
- `src/lib/codexforge/memory-persistence`
- `src/lib/codexforge/evidence-memory`
- `src/lib/codexforge/evidence-grounded-chat`
- `src/lib/codexforge/approved-brain-merge`
- `src/lib/codexforge/brain-merge`
- `src/lib/codexforge/files`
- `src/lib/codexforge/patch-preview`
- `src/lib/codexforge/patch-preview-queue`
- `src/lib/codexforge/preview-diff-composer`
- `src/lib/codexforge/patch-application-gate`
- `src/lib/codexforge/apply-evidence-pack`
- `src/lib/codexforge/apply-diff-dry-run`
- `src/lib/codexforge/task-autopilot`
- `src/lib/codexforge/task-activation`
- `src/lib/codexforge/execution-readiness`
- `src/lib/codexforge/step-runner-preview`
- `src/lib/codexforge/read-only-step-execution`
- `src/lib/codexforge/operator-run`
- `src/lib/codexforge/capabilities`
- `src/lib/codexforge/local-bridge`
- `src/lib/codexforge/creative`
- `src/lib/codexforge/artifact-executor`
- `src/lib/codexforge/artifact-workspace`
- `src/lib/codexforge/artifact-export-flow`
- `src/lib/codexforge/artifact-ingestion`
- `src/lib/codexforge/production-pack`
- `src/lib/codexforge/mission-control`
- `src/lib/codexforge/navigation`
- `src/lib/codexforge/tools`
- `src/lib/codexforge/chat`
- `src/lib/codexforge/ui`

## Grouped Smoke Scripts

- `scripts/smoke-codexforge-all.ps1`
- `scripts/smoke-codexforge-core.ps1`
- `scripts/smoke-codexforge-ui.ps1`
- `scripts/smoke-codexforge-brain-suite.ps1`
- `scripts/smoke-codexforge-memory-suite.ps1`
- `scripts/smoke-codexforge-files-suite.ps1`
- `scripts/smoke-codexforge-execution-suite.ps1`
- `scripts/smoke-codexforge-artifacts-suite.ps1`
- `scripts/smoke-codexforge-creative-suite.ps1`
- `scripts/smoke-codexforge-smoke-groups.ps1`
