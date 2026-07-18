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
        summary="Capability matrix preview, registry-only provider slots, blocked provider selection posture, server-only model adapter contracts, adapter envelope preview, server-only adapter gates, the fixture-only manual gated model adapter dry-run harness, the model adapter dry-run result review and recovery previews, the backend-owned synthetic dry-run runner skeleton previews, the backend-owned synthetic dry-run result capture contract previews, the backend-owned synthetic dry-run result capture review and recovery previews, the backend-owned synthetic dry-run audit and approval join contract previews, the backend-owned synthetic dry-run audit and approval join review and recovery previews, the backend-owned synthetic dry-run end-to-end packet contract previews, the backend-owned synthetic dry-run end-to-end packet review and recovery previews, the backend-owned synthetic dry-run manual approval handoff contract previews, the backend-owned synthetic dry-run manual approval handoff review and recovery previews, the backend-owned synthetic dry-run manual approval decision contract previews, the backend-owned synthetic dry-run manual approval decision review and recovery previews, the backend-owned minimal manual-gated synthetic dry-run execution review and recovery previews, the backend-owned minimal synthetic result capture review previews, and the backend-owned minimal manual-gated synthetic dry-run audit and approval join MVP previews now sit in one operator-grade provider hub. Backend-owned minimal manual-gated synthetic dry-run audit and approval join MVP. Backend-owned minimal synthetic audit and approval join review. Synthetic audit and approval join output review. Synthetic audit and approval join gate failure review. Synthetic audit and approval join recovery plan. Synthetic audit and approval join recovery readiness. Synthetic audit and approval join acceptance posture. minimal synthetic audit and approval join review is preview-only. server-only synthetic audit and approval join helper exists. synthetic audit and approval join is produced in memory only. no provider execution. no model calls. no persistence. end-to-end packet MVP comes next. No model calls yet. No prompt sending. No provider SDKs imported. Frontend provider calls are blocked. Opaque credential references only."
        links={MAIN_PAGES_PROVIDER_LINKS}
        tone="provider"
      />
      <MainPagesGodTierUxStatusRail title="Provider safety posture" tone="provider" />
      <AiProviderRegistryPanel />
    </CodexForgeAppShell>
  );
}
