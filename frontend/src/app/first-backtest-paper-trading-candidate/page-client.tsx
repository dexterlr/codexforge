"use client";

import { BacktestPaperTradingEngineRoutePanel } from "@/lib/codexforge/backtest-paper-trading-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstBacktestPaperTradingCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-backtest-paper-trading-candidate"
      workspaceLabel="First Backtest Paper Trading Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BacktestPaperTradingEngineRoutePanel routeSlug="first-backtest-paper-trading-candidate" />
    </CodexForgeAppShell>
  );
}
