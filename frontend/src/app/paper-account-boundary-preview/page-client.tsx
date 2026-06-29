"use client";

import { BacktestPaperTradingEngineRoutePanel } from "@/lib/codexforge/backtest-paper-trading-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PaperAccountBoundaryPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/paper-account-boundary-preview"
      workspaceLabel="Paper Account Boundary Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BacktestPaperTradingEngineRoutePanel routeSlug="paper-account-boundary-preview" />
    </CodexForgeAppShell>
  );
}
