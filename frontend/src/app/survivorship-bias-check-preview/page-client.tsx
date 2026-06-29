"use client";

import { BacktestPaperTradingEngineRoutePanel } from "@/lib/codexforge/backtest-paper-trading-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SurvivorshipBiasCheckPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/survivorship-bias-check-preview"
      workspaceLabel="Survivorship Bias Check Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BacktestPaperTradingEngineRoutePanel routeSlug="survivorship-bias-check-preview" />
    </CodexForgeAppShell>
  );
}
