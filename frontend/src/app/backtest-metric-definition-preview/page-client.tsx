"use client";

import { BacktestPaperTradingEngineRoutePanel } from "@/lib/codexforge/backtest-paper-trading-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BacktestMetricDefinitionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backtest-metric-definition-preview"
      workspaceLabel="Backtest Metric Definition Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BacktestPaperTradingEngineRoutePanel routeSlug="backtest-metric-definition-preview" />
    </CodexForgeAppShell>
  );
}
