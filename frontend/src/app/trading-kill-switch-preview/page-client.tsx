"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingKillSwitchPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-kill-switch-preview"
      workspaceLabel="Trading Kill Switch Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="trading-kill-switch-preview" />
    </CodexForgeAppShell>
  );
}
