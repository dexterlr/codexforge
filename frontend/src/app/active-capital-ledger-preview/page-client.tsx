"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ActiveCapitalLedgerPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/active-capital-ledger-preview"
      workspaceLabel="Active Capital Ledger Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="active-capital-ledger-preview" />
    </CodexForgeAppShell>
  );
}
