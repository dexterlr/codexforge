"use client";

import { BacktestPaperTradingEngineRoutePanel } from "@/lib/codexforge/backtest-paper-trading-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PaperTradeJournalPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/paper-trade-journal-preview"
      workspaceLabel="Paper Trade Journal Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BacktestPaperTradingEngineRoutePanel routeSlug="paper-trade-journal-preview" />
    </CodexForgeAppShell>
  );
}
