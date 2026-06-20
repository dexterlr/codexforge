"use client";

import { BuildPlanApprovalQueuePanel } from "@/lib/codexforge/build-plan-approval-queue/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanApprovalQueuePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-approval-queue"
      workspaceLabel="Build Plan Approval Queue"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanApprovalQueuePanel />
    </CodexForgeAppShell>
  );
}
