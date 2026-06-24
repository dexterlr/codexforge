"use client";

import { TradingResearchDomainRoutePanel } from "@/lib/codexforge/trading-research-domain-pack/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingProfitLockboxPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-profit-lockbox-preview"
      workspaceLabel="Trading Profit Lockbox Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingResearchDomainRoutePanel routeSlug="trading-profit-lockbox-preview" />
    </CodexForgeAppShell>
  );
}
