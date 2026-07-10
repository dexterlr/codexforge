"use client";

import { AiProviderRegistryPanel } from "@/lib/codexforge/ai-provider-registry/components";
import {
  MAIN_PAGES_PROVIDER_LINKS,
  MainPagesGodTierUxHandoffRail,
  MainPagesGodTierUxStatusRail,
} from "@/lib/codexforge/main-pages-god-tier-ux";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AiProvidersPageClient() {
  return (
    <CodexForgeAppShell activePath="/ai-providers" workspaceLabel="AI model provider registry" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <MainPagesGodTierUxHandoffRail
        eyebrow="provider hub"
        title="AI model provider registry"
        summary="Capability matrix preview, registry-only provider slots, and blocked provider selection posture now sit in one operator-grade provider hub. Provider slots are registry-only. No model calls yet. Server-only adapters required. Credential isolation required. Operator approval required. Audit required."
        links={MAIN_PAGES_PROVIDER_LINKS}
        tone="provider"
      />
      <MainPagesGodTierUxStatusRail title="Provider safety posture" tone="provider" />
      <AiProviderRegistryPanel />
    </CodexForgeAppShell>
  );
}
