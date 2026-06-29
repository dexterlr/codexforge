"use client";

import { BacktestPaperTradingEngineRoutePanel } from "@/lib/codexforge/backtest-paper-trading-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BacktestResultReviewPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backtest-result-review-preview"
      workspaceLabel="Backtest Result Review Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BacktestPaperTradingEngineRoutePanel routeSlug="backtest-result-review-preview" />
    </CodexForgeAppShell>
  );
}
