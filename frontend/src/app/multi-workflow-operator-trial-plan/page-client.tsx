"use client";

import { MultiWorkflowOperatorTrialPlanPanel } from "@/lib/codexforge/multi-workflow-operator-trial-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function MultiWorkflowOperatorTrialPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/multi-workflow-operator-trial-plan"
      workspaceLabel="Multi-Workflow Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <MultiWorkflowOperatorTrialPlanPanel />
    </CodexForgeAppShell>
  );
}
