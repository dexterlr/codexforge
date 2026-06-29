"use client";

import { BacktestPaperTradingEngineRoutePanel } from "@/lib/codexforge/backtest-paper-trading-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SamplePeriodDefinitionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/sample-period-definition-preview"
      workspaceLabel="Sample Period Definition Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BacktestPaperTradingEngineRoutePanel routeSlug="sample-period-definition-preview" />
    </CodexForgeAppShell>
  );
}
