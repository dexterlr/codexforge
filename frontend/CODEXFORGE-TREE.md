# CodexForge Tree

Branch: `codexforge-foundation`

## App Routes

- `src/app/page.tsx`
- `src/app/ai/page.tsx`
- `src/app/brain/page.tsx`
- `src/app/brain/page-client.tsx`
- `src/app/files/page.tsx`
- `src/app/files/page-client.tsx`
- `src/app/history/page.tsx`
- `src/app/capabilities/page.tsx`
- `src/app/capabilities/page-client.tsx`
- `src/app/creative/page.tsx`
- `src/app/creative/page-client.tsx`
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
- `src/lib/codexforge/files`
- `src/lib/codexforge/patch-preview`
- `src/lib/codexforge/capabilities`
- `src/lib/codexforge/creative`
- `src/lib/codexforge/tools`
- `src/lib/codexforge/chat`
- `src/lib/codexforge/agents`
- `src/lib/codexforge/ui`

## Smoke Scripts

- `scripts/smoke-codexforge-all.ps1`
- `scripts/smoke-codexforge-with-server.ps1`
- `scripts/smoke-codexforge-brain-runtime.ps1`
- `scripts/smoke-codexforge-brain-graph-ui.ps1`
- `scripts/smoke-codexforge-brain-memory-ingestion.ps1`
- `scripts/smoke-codexforge-files-command-center.ps1`
- `scripts/smoke-codexforge-file-workflow.ps1`
- `scripts/smoke-codexforge-file-brain-chat-workflow.ps1`
- `scripts/smoke-codexforge-capability-cockpit.ps1`
- `scripts/smoke-codexforge-patch-preview.ps1`
- `scripts/smoke-codexforge-creative-production-studio.ps1`
- `scripts/smoke-codexforge-brand-clean.ps1`
