"use client";

import { BacktestPaperTradingEngineRoutePanel } from "@/lib/codexforge/backtest-paper-trading-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BacktestPaperTradingBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backtest-paper-trading-boundary"
      workspaceLabel="Backtest Paper Trading Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BacktestPaperTradingEngineRoutePanel routeSlug="backtest-paper-trading-boundary" />
    </CodexForgeAppShell>
  );
}
