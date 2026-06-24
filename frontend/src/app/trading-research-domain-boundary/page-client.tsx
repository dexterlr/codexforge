"use client";

import { TradingResearchDomainRoutePanel } from "@/lib/codexforge/trading-research-domain-pack/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingResearchDomainBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-research-domain-boundary"
      workspaceLabel="Trading Research Domain Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingResearchDomainRoutePanel routeSlug="trading-research-domain-boundary" />
    </CodexForgeAppShell>
  );
}
