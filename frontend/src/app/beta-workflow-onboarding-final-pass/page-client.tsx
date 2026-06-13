"use client";

import { BetaWorkflowOnboardingFinalPassPanel } from "@/lib/codexforge/beta-workflow-onboarding-final-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaWorkflowOnboardingFinalPassPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-workflow-onboarding-final-pass"
      workspaceLabel="Beta Onboarding Final Pass"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaWorkflowOnboardingFinalPassPanel />
    </CodexForgeAppShell>
  );
}
