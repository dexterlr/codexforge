"use client";

import { FirstApprovedBuildPlanCandidatePanel } from "@/lib/codexforge/first-approved-build-plan-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstApprovedBuildPlanCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-approved-build-plan-candidate"
      workspaceLabel="First Approved Build Plan Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstApprovedBuildPlanCandidatePanel />
    </CodexForgeAppShell>
  );
}
