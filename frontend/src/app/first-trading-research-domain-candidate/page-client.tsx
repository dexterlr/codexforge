"use client";

import { TradingResearchDomainRoutePanel } from "@/lib/codexforge/trading-research-domain-pack/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstTradingResearchDomainCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-trading-research-domain-candidate"
      workspaceLabel="First Trading Research Domain Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingResearchDomainRoutePanel routeSlug="first-trading-research-domain-candidate" />
    </CodexForgeAppShell>
  );
}
