"use client";

import { BuildPlanApprovalRecoveryGatePanel } from "@/lib/codexforge/build-plan-approval-recovery-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanApprovalRecoveryGatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-approval-recovery-gate"
      workspaceLabel="Build Plan Approval Recovery Gate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanApprovalRecoveryGatePanel />
    </CodexForgeAppShell>
  );
}
