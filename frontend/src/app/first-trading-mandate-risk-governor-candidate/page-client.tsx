"use client";

import { TradingMandateRiskGovernorRoutePanel } from "@/lib/codexforge/trading-mandate-risk-governor/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstTradingMandateRiskGovernorCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-trading-mandate-risk-governor-candidate"
      workspaceLabel="First Trading Mandate Risk Governor Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingMandateRiskGovernorRoutePanel routeSlug="first-trading-mandate-risk-governor-candidate" />
    </CodexForgeAppShell>
  );
}
