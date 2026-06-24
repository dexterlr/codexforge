"use client";

import { TradingResearchDomainRoutePanel } from "@/lib/codexforge/trading-research-domain-pack/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledTradingResearchDomainReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-trading-research-domain-release-candidate"
      workspaceLabel="Controlled Trading Research Domain Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingResearchDomainRoutePanel routeSlug="controlled-trading-research-domain-release-candidate" />
    </CodexForgeAppShell>
  );
}
