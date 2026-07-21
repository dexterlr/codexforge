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
        summary="Capability matrix preview, registry-only provider slots, blocked provider selection posture, server-only model adapter contracts, adapter envelope preview, server-only adapter gates, the fixture-only manual gated model adapter dry-run harness, the model adapter dry-run result review and recovery previews, the backend-owned synthetic dry-run runner skeleton previews, the backend-owned synthetic dry-run result capture contract previews, the backend-owned synthetic dry-run result capture review and recovery previews, the backend-owned synthetic dry-run audit and approval join contract previews, the backend-owned synthetic dry-run audit and approval join review and recovery previews, the backend-owned synthetic dry-run end-to-end packet contract previews, the backend-owned synthetic dry-run end-to-end packet review and recovery previews, the backend-owned synthetic dry-run manual approval handoff contract previews, the backend-owned synthetic dry-run manual approval handoff review and recovery previews, the backend-owned synthetic dry-run manual approval decision contract previews, the backend-owned synthetic dry-run manual approval decision review and recovery previews, the backend-owned minimal manual-gated synthetic dry-run execution review and recovery previews, the backend-owned minimal synthetic result capture review previews, the backend-owned minimal synthetic audit and approval join review previews, the backend-owned minimal manual-gated synthetic dry-run end-to-end packet MVP previews, the backend-owned minimal manual-gated synthetic dry-run end-to-end packet review and recovery previews, the backend-owned minimal manual-gated text model adapter MVP previews, the backend-owned minimal manual-gated text model adapter result capture MVP previews, and the backend-owned minimal manual-gated text model adapter audit and approval join MVP previews now sit in one operator-grade provider hub. Backend-owned minimal text adapter result capture review. Text adapter result capture output review. Text adapter result capture gate failure review. Text adapter result capture recovery plan. Text adapter result capture recovery readiness. Text adapter result capture review audit summary. Text adapter result capture acceptance posture. minimal text adapter result capture review is preview-only. server-only text adapter result capture helper exists. text adapter fixture response is captured in memory only. text adapter result capture is not persistent. text adapter audit and approval join MVP comes next. Backend-owned minimal manual-gated text model adapter audit and approval join MVP. Text adapter audit and approval join input. Text adapter audit join output. Text adapter approval join output. Text adapter audit and approval join envelope. Text adapter audit and approval join gates. Text adapter audit and approval join readiness matrix. minimal text adapter audit and approval join MVP is backend-only. text adapter audit and approval join is produced in memory only. no provider execution. no model calls. no persistence. text adapter audit and approval join review and recovery preview comes next. Backend-owned minimal synthetic end-to-end packet review. Synthetic end-to-end packet output review. Synthetic end-to-end packet gate failure review. Synthetic end-to-end packet recovery plan. Synthetic end-to-end packet recovery readiness. Synthetic end-to-end packet acceptance posture. minimal synthetic end-to-end packet review is preview-only. server-only synthetic end-to-end packet helper exists. synthetic end-to-end packet is produced in memory only. No model calls yet. No prompt sending. No provider SDKs imported. Frontend provider calls are blocked. Opaque credential references only."
        links={MAIN_PAGES_PROVIDER_LINKS}
        tone="provider"
      />
      <MainPagesGodTierUxStatusRail title="Provider safety posture" tone="provider" />
      <AiProviderRegistryPanel />
    </CodexForgeAppShell>
  );
}
