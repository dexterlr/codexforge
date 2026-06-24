"use client";

import { TradingResearchDomainRoutePanel } from "@/lib/codexforge/trading-research-domain-pack/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingResearchGoalIntakePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-research-goal-intake-preview"
      workspaceLabel="Trading Research Goal Intake Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingResearchDomainRoutePanel routeSlug="trading-research-goal-intake-preview" />
    </CodexForgeAppShell>
  );
}
