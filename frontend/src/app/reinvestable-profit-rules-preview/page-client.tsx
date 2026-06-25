"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ReinvestableProfitRulesPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/reinvestable-profit-rules-preview"
      workspaceLabel="Reinvestable Profit Rules Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="reinvestable-profit-rules-preview" />
    </CodexForgeAppShell>
  );
}
