"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledTradingMandateRiskGovernorReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-trading-mandate-risk-governor-release-candidate"
      workspaceLabel="Controlled Trading Mandate Risk Governor Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="controlled-trading-mandate-risk-governor-release-candidate" />
    </CodexForgeAppShell>
  );
}
