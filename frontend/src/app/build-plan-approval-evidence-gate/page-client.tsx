"use client";

import { BuildPlanApprovalEvidenceGatePanel } from "@/lib/codexforge/build-plan-approval-evidence-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanApprovalEvidenceGatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-approval-evidence-gate"
      workspaceLabel="Build Plan Approval Evidence Gate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanApprovalEvidenceGatePanel />
    </CodexForgeAppShell>
  );
}
