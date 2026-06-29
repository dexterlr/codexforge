"use client";

import { BacktestPaperTradingEngineRoutePanel } from "@/lib/codexforge/backtest-paper-trading-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BacktestRunPacketPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backtest-run-packet-preview"
      workspaceLabel="Backtest Run Packet Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BacktestPaperTradingEngineRoutePanel routeSlug="backtest-run-packet-preview" />
    </CodexForgeAppShell>
  );
}
