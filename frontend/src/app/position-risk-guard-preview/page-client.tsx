"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PositionRiskGuardPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/position-risk-guard-preview"
      workspaceLabel="Position Risk Guard Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="position-risk-guard-preview" />
    </CodexForgeAppShell>
  );
}
