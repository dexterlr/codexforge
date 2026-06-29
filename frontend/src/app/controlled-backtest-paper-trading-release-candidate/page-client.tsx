"use client";

import { BacktestPaperTradingEngineRoutePanel } from "@/lib/codexforge/backtest-paper-trading-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledBacktestPaperTradingReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-backtest-paper-trading-release-candidate"
      workspaceLabel="Controlled Backtest Paper Trading Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BacktestPaperTradingEngineRoutePanel routeSlug="controlled-backtest-paper-trading-release-candidate" />
    </CodexForgeAppShell>
  );
}
