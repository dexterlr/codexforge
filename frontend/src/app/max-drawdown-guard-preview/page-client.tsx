"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function MaxDrawdownGuardPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/max-drawdown-guard-preview"
      workspaceLabel="Max Drawdown Guard Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="max-drawdown-guard-preview" />
    </CodexForgeAppShell>
  );
}
