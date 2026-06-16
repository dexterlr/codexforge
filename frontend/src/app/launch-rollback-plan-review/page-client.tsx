"use client";

import { LaunchRollbackPlanReviewPanel } from "@/lib/codexforge/launch-rollback-plan-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LaunchRollbackPlanReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/launch-rollback-plan-review"
      workspaceLabel="Launch Rollback Plan Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LaunchRollbackPlanReviewPanel />
    </CodexForgeAppShell>
  );
}
