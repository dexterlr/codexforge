"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CapitalAllocationRulesPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/capital-allocation-rules-preview"
      workspaceLabel="Capital Allocation Rules Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="capital-allocation-rules-preview" />
    </CodexForgeAppShell>
  );
}
