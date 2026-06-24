"use client";

import { TradingResearchDomainRoutePanel } from "@/lib/codexforge/trading-research-domain-pack/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingCatalystTrackerPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-catalyst-tracker-preview"
      workspaceLabel="Trading Catalyst Tracker Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingResearchDomainRoutePanel routeSlug="trading-catalyst-tracker-preview" />
    </CodexForgeAppShell>
  );
}
