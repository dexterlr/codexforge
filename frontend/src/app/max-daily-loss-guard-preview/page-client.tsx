"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function MaxDailyLossGuardPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/max-daily-loss-guard-preview"
      workspaceLabel="Max Daily Loss Guard Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="max-daily-loss-guard-preview" />
    </CodexForgeAppShell>
  );
}
