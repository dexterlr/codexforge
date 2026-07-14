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
        summary="Capability matrix preview, registry-only provider slots, blocked provider selection posture, server-only model adapter contracts, adapter envelope preview, server-only adapter gates, the fixture-only manual gated model adapter dry-run harness, the model adapter dry-run result review and recovery previews, the backend-owned synthetic dry-run runner skeleton previews, the backend-owned synthetic dry-run result capture contract previews, the backend-owned synthetic dry-run result capture review and recovery previews, the backend-owned synthetic dry-run audit and approval join contract previews, and the backend-owned synthetic dry-run audit and approval join review and recovery previews now sit in one operator-grade provider hub. Backend-owned synthetic dry-run audit and approval join review, audit and approval join decision review, audit and approval join gate failure review, audit and approval join recovery plan, audit and approval join recovery readiness, and audit and approval join acceptance posture are preview-only. Athena can now preview backend-owned synthetic dry-run audit and approval join reviews. audit and approval join review is preview-only. audit join state: not persisted. approval join state: not persisted. result reference state: not persisted. evidence packet state: preview-only. end-to-end packet contract comes next. No model calls yet. No prompt sending. No provider SDKs imported. Frontend provider calls are blocked. Opaque credential references only."
        links={MAIN_PAGES_PROVIDER_LINKS}
        tone="provider"
      />
      <MainPagesGodTierUxStatusRail title="Provider safety posture" tone="provider" />
      <AiProviderRegistryPanel />
    </CodexForgeAppShell>
  );
}
