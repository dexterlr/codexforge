"use client";

import { TradingResearchDomainRoutePanel } from "@/lib/codexforge/trading-research-domain-pack/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingWatchlistPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-watchlist-preview"
      workspaceLabel="Trading Watchlist Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingResearchDomainRoutePanel routeSlug="trading-watchlist-preview" />
    </CodexForgeAppShell>
  );
}
