"use client";

import { TradingResearchDomainRoutePanel } from "@/lib/codexforge/trading-research-domain-pack/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingThesisBuilderPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-thesis-builder-preview"
      workspaceLabel="Trading Thesis Builder Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingResearchDomainRoutePanel routeSlug="trading-thesis-builder-preview" />
    </CodexForgeAppShell>
  );
}
