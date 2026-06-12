"use client";

import { ProviderIntegrationHardeningPassPanel } from "@/lib/codexforge/provider-integration-hardening-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderIntegrationHardeningPassPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-integration-hardening-pass"
      workspaceLabel="Provider Hardening"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderIntegrationHardeningPassPanel />
    </CodexForgeAppShell>
  );
}
