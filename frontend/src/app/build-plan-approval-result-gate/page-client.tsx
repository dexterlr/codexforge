"use client";

import { BuildPlanApprovalResultGatePanel } from "@/lib/codexforge/build-plan-approval-result-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanApprovalResultGatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-approval-result-gate"
      workspaceLabel="Build Plan Approval Result Gate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanApprovalResultGatePanel />
    </CodexForgeAppShell>
  );
}
