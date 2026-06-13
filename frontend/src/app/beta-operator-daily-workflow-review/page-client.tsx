"use client";

import { BetaOperatorDailyWorkflowReviewPanel } from "@/lib/codexforge/beta-operator-daily-workflow-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaOperatorDailyWorkflowReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-operator-daily-workflow-review"
      workspaceLabel="Beta Workflow Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaOperatorDailyWorkflowReviewPanel />
    </CodexForgeAppShell>
  );
}
