"use client";

import { RealDailyWorkflowResultReviewPanel } from "@/lib/codexforge/real-daily-workflow-result-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-daily-workflow-result-review"
      workspaceLabel="Result Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealDailyWorkflowResultReviewPanel />
    </CodexForgeAppShell>
  );
}
