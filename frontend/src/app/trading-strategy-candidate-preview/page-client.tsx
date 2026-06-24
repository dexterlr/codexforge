"use client";

import { TradingResearchDomainRoutePanel } from "@/lib/codexforge/trading-research-domain-pack/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingStrategyCandidatePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-strategy-candidate-preview"
      workspaceLabel="Trading Strategy Candidate Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingResearchDomainRoutePanel routeSlug="trading-strategy-candidate-preview" />
    </CodexForgeAppShell>
  );
}
