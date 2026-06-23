"use client";

import { CockpitDomainWorkspaceRoutePanel } from "@/lib/codexforge/cockpit-domain-workspace/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingAutomationDomainTeaserPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-automation-domain-teaser-preview"
      workspaceLabel="Trading Automation Domain Teaser Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitDomainWorkspaceRoutePanel routeSlug="trading-automation-domain-teaser-preview" />
    </CodexForgeAppShell>
  );
}
