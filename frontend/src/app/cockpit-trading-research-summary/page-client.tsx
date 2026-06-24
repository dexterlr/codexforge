"use client";

import { TradingResearchDomainRoutePanel } from "@/lib/codexforge/trading-research-domain-pack/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitTradingResearchSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-trading-research-summary"
      workspaceLabel="Cockpit Trading Research Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingResearchDomainRoutePanel routeSlug="cockpit-trading-research-summary" />
    </CodexForgeAppShell>
  );
}
