"use client";

import { BuildPlanApprovalRiskGatePanel } from "@/lib/codexforge/build-plan-approval-risk-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanApprovalRiskGatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-approval-risk-gate"
      workspaceLabel="Build Plan Approval Risk Gate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanApprovalRiskGatePanel />
    </CodexForgeAppShell>
  );
}
