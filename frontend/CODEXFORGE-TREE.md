# CodexForge Tree

Date: 2026-05-06 17:53:25
Branch: codexforge-foundation
HEAD before docs commit: b00d30c

## Repo root

C:\ai-lab\projects\openclaw-workspace\repos\health-tracker\frontend

## Core app routes

- src/app/ai/page.tsx
- src/app/brain/page.tsx
- src/app/brain/page-client.tsx
- src/app/clawd/page.tsx
- src/app/history/page.tsx
- src/app/entry/page.tsx

## CodexForge API routes

- src/app/api/codexforge/chat/route.ts
- src/app/api/codexforge/run/route.ts
- src/app/api/codexforge/tools/execute/route.ts

## CodexForge chat core

- src/lib/codexforge/chat/use-codexforge-chat.ts
- src/lib/codexforge/chat/contracts.ts
- src/lib/codexforge/chat/engine.ts
- src/lib/codexforge/chat/engine-analysis.ts
- src/lib/codexforge/chat/engine-domain-config.ts
- src/lib/codexforge/chat/engine-graph.ts
- src/lib/codexforge/chat/engine-grounded-render.ts
- src/lib/codexforge/chat/engine-grounding.ts
- src/lib/codexforge/chat/engine-render.ts
- src/lib/codexforge/chat/engine-render-diff-preview.ts
- src/lib/codexforge/chat/engine-render-sections.ts
- src/lib/codexforge/chat/engine-render-state.ts
- src/lib/codexforge/chat/engine-render-text.ts
- src/lib/codexforge/chat/engine-safe-tools.ts
- src/lib/codexforge/chat/engine-shared.ts
- src/lib/codexforge/chat/fallback.ts
- src/lib/codexforge/chat/page-config.ts

## Agent and runtime policy

- src/lib/codexforge/agents/index.ts
- src/lib/codexforge/agents/registry.ts
- src/lib/codexforge/agents/types.ts
- src/lib/codexforge/chat/agent-team-engine-influence.ts
- src/lib/codexforge/chat/agent-team-runtime-policy.ts

## Tool policy

- src/lib/codexforge/tools/tool-policy-guard.ts
- src/lib/codexforge/tools/tool-policy-visibility.ts
- src/lib/codexforge/chat/components/tool-policy-decision-panel.tsx
- src/app/api/codexforge/tools/execute/route.ts

## Workspace UI components

- src/lib/codexforge/chat/components/chat-composer.tsx
- src/lib/codexforge/chat/components/chat-message.tsx
- src/lib/codexforge/chat/components/codexforge-product-surface.tsx
- src/lib/codexforge/chat/components/composer-dock.tsx
- src/lib/codexforge/chat/components/empty-chat-state.tsx
- src/lib/codexforge/chat/components/empty-state.tsx
- src/lib/codexforge/chat/components/engine-state-card.tsx
- src/lib/codexforge/chat/components/execution-panel.tsx
- src/lib/codexforge/chat/components/latest-reply-card.tsx
- src/lib/codexforge/chat/components/memory-panel.tsx
- src/lib/codexforge/chat/components/top-bar.tsx
- src/lib/codexforge/chat/components/toolbar-status.tsx
- src/lib/codexforge/chat/components/tool-policy-decision-panel.tsx
- src/lib/codexforge/chat/components/workspace-command-center.tsx
- src/lib/codexforge/chat/components/workspace-hero.tsx
- src/lib/codexforge/chat/components/workspace-insights-panel.tsx
- src/lib/codexforge/chat/components/workspace-overview-card.tsx
- src/lib/codexforge/chat/components/workspace-section-stack.tsx
- src/lib/codexforge/chat/components/workspace-sidebar.tsx
- src/lib/codexforge/chat/components/workspace-slider.tsx
- src/lib/codexforge/chat/components/workspace-state-card.tsx

## Smoke and validation

- scripts/smoke-codexforge-all.ps1
- scripts/smoke-codexforge-with-server.ps1
- scripts/smoke-codexforge-product-surface-ui.ps1
- scripts/smoke-codexforge-product-surface-planning.ps1
- scripts/smoke-codexforge-capability-routing.ps1
- scripts/smoke-codexforge-latest-message-authority.ps1
- scripts/smoke-codexforge-route-override-visible-meta.ps1
- package.json
