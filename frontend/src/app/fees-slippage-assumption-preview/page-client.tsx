"use client";

import { BacktestPaperTradingEngineRoutePanel } from "@/lib/codexforge/backtest-paper-trading-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FeesSlippageAssumptionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/fees-slippage-assumption-preview"
      workspaceLabel="Fees Slippage Assumption Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BacktestPaperTradingEngineRoutePanel routeSlug="fees-slippage-assumption-preview" />
    </CodexForgeAppShell>
  );
}
