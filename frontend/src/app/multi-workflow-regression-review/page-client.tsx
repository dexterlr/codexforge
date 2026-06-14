"use client";

import { MultiWorkflowRegressionReviewPanel } from "@/lib/codexforge/multi-workflow-regression-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function MultiWorkflowRegressionReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/multi-workflow-regression-review"
      workspaceLabel="Multi-Workflow Regression"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <MultiWorkflowRegressionReviewPanel />
    </CodexForgeAppShell>
  );
}
