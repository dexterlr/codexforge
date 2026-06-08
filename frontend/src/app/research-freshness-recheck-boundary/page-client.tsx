"use client";

import { ResearchFreshnessRecheckBoundaryPanel } from "@/lib/codexforge/research-freshness-recheck-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchFreshnessRecheckBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-freshness-recheck-boundary"
      workspaceLabel="Research Freshness Recheck Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchFreshnessRecheckBoundaryPanel />
    </CodexForgeAppShell>
  );
}
