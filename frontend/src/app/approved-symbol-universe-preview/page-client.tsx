"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApprovedSymbolUniversePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/approved-symbol-universe-preview"
      workspaceLabel="Approved Symbol Universe Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="approved-symbol-universe-preview" />
    </CodexForgeAppShell>
  );
}
