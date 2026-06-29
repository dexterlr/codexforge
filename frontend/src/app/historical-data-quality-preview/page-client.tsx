"use client";

import { BacktestPaperTradingEngineRoutePanel } from "@/lib/codexforge/backtest-paper-trading-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function HistoricalDataQualityPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/historical-data-quality-preview"
      workspaceLabel="Historical Data Quality Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BacktestPaperTradingEngineRoutePanel routeSlug="historical-data-quality-preview" />
    </CodexForgeAppShell>
  );
}
