"use client";

import { BacktestPaperTradingEngineRoutePanel } from "@/lib/codexforge/backtest-paper-trading-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PaperTradingMetricsPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/paper-trading-metrics-preview"
      workspaceLabel="Paper Trading Metrics Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BacktestPaperTradingEngineRoutePanel routeSlug="paper-trading-metrics-preview" />
    </CodexForgeAppShell>
  );
}
