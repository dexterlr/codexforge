"use client";

import { ControlledBuildPlanApprovalReleaseCandidatePanel } from "@/lib/codexforge/controlled-build-plan-approval-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledBuildPlanApprovalReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-build-plan-approval-release-candidate"
      workspaceLabel="Controlled Build Plan Approval Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledBuildPlanApprovalReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
