"use client";

import { FirstRealEndToEndWorkflowTrialPlanPanel } from "@/lib/codexforge/first-real-end-to-end-workflow-trial-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstRealEndToEndWorkflowTrialPlanPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-real-end-to-end-workflow-trial-plan"
      workspaceLabel="End-to-End Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstRealEndToEndWorkflowTrialPlanPanel />
    </CodexForgeAppShell>
  );
}
