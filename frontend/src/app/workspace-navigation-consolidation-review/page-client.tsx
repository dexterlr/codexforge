"use client";

import { WorkspaceNavigationConsolidationReviewPanel } from "@/lib/codexforge/workspace-navigation-consolidation-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function WorkspaceNavigationConsolidationReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/workspace-navigation-consolidation-review"
      workspaceLabel="Navigation Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <WorkspaceNavigationConsolidationReviewPanel />
    </CodexForgeAppShell>
  );
}
