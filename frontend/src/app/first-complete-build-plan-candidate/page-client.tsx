"use client";

import { FirstCompleteBuildPlanCandidatePanel } from "@/lib/codexforge/first-complete-build-plan-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstCompleteBuildPlanCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-complete-build-plan-candidate"
      workspaceLabel="First Complete Build Plan Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstCompleteBuildPlanCandidatePanel />
    </CodexForgeAppShell>
  );
}
