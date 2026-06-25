"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApprovedStrategyClassPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/approved-strategy-class-preview"
      workspaceLabel="Approved Strategy Class Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="approved-strategy-class-preview" />
    </CodexForgeAppShell>
  );
}
