"use client";

import { AiRouterCockpit } from "@/lib/codexforge/ai-router/components/AiRouterCockpit";
import {
  MAIN_PAGES_PROVIDER_LINKS,
  MainPagesGodTierUxHandoffRail,
  MainPagesGodTierUxStatusRail,
} from "@/lib/codexforge/main-pages-god-tier-ux";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AiRouterPageClient() {
  return (
    <CodexForgeAppShell activePath="/ai-router" workspaceLabel="AI Router" nextActionContext={{ wantsOperatorOverview: false }}>
      <MainPagesGodTierUxHandoffRail
        eyebrow="premium command center"
        title="AI routing control room"
        summary="The router presents deterministic preview policy, provider metadata, and fallback posture without sending prompts or creating model calls."
        links={MAIN_PAGES_PROVIDER_LINKS}
        tone="provider"
      />
      <MainPagesGodTierUxStatusRail title="Router execution boundary" tone="provider" />
      <AiRouterCockpit />
    </CodexForgeAppShell>
  );
}
