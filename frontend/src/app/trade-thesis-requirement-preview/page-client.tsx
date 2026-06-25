"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradeThesisRequirementPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trade-thesis-requirement-preview"
      workspaceLabel="Trade Thesis Requirement Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="trade-thesis-requirement-preview" />
    </CodexForgeAppShell>
  );
}
