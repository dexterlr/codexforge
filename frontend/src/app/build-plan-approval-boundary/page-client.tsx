"use client";

import { BuildPlanApprovalBoundaryPanel } from "@/lib/codexforge/build-plan-approval-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanApprovalBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-approval-boundary"
      workspaceLabel="Build Plan Approval Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanApprovalBoundaryPanel />
    </CodexForgeAppShell>
  );
}
