"use client";

import { ProviderExecutionBoundaryReadinessReviewPanel } from "@/lib/codexforge/provider-execution-boundary-readiness-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderExecutionBoundaryReadinessReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-execution-boundary-readiness-review"
      workspaceLabel="Provider Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderExecutionBoundaryReadinessReviewPanel />
    </CodexForgeAppShell>
  );
}
