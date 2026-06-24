"use client";

import { TradingResearchDomainRoutePanel } from "@/lib/codexforge/trading-research-domain-pack/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingPaperTradeReadinessPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-paper-trade-readiness-preview"
      workspaceLabel="Trading Paper Trade Readiness Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingResearchDomainRoutePanel routeSlug="trading-paper-trade-readiness-preview" />
    </CodexForgeAppShell>
  );
}
