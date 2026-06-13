"use client";

import { BetaWorkflowReleaseRegressionReviewPanel } from "@/lib/codexforge/beta-workflow-release-regression-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaWorkflowReleaseRegressionReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-workflow-release-regression-review"
      workspaceLabel="Beta Regression Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaWorkflowReleaseRegressionReviewPanel />
    </CodexForgeAppShell>
  );
}
