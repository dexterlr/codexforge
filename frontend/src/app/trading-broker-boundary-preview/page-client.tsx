"use client";

import { TradingResearchDomainRoutePanel } from "@/lib/codexforge/trading-research-domain-pack/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingBrokerBoundaryPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-broker-boundary-preview"
      workspaceLabel="Trading Broker Boundary Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingResearchDomainRoutePanel routeSlug="trading-broker-boundary-preview" />
    </CodexForgeAppShell>
  );
}
