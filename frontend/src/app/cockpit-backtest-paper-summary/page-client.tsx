"use client";

import { BacktestPaperTradingEngineRoutePanel } from "@/lib/codexforge/backtest-paper-trading-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitBacktestPaperSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-backtest-paper-summary"
      workspaceLabel="Cockpit Backtest Paper Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BacktestPaperTradingEngineRoutePanel routeSlug="cockpit-backtest-paper-summary" />
    </CodexForgeAppShell>
  );
}
