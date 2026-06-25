"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingMandateBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-mandate-boundary"
      workspaceLabel="Trading Mandate Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="trading-mandate-boundary" />
    </CodexForgeAppShell>
  );
}
