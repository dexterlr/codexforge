"use client";

import { LaunchMonitoringPlanReviewPanel } from "@/lib/codexforge/launch-monitoring-plan-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LaunchMonitoringPlanReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/launch-monitoring-plan-review"
      workspaceLabel="Launch Monitoring Plan Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LaunchMonitoringPlanReviewPanel />
    </CodexForgeAppShell>
  );
}
