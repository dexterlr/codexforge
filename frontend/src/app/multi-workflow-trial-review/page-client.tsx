"use client";

import { MultiWorkflowTrialReviewPanel } from "@/lib/codexforge/multi-workflow-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function MultiWorkflowTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/multi-workflow-trial-review"
      workspaceLabel="Multi-Workflow Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <MultiWorkflowTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
