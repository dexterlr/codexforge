"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApprovedMarketUniversePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/approved-market-universe-preview"
      workspaceLabel="Approved Market Universe Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="approved-market-universe-preview" />
    </CodexForgeAppShell>
  );
}
