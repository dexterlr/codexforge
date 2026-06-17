"use client";

import { AutomationControlledTrialPlanPanel } from "@/lib/codexforge/automation-controlled-trial-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationControlledTrialPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-controlled-trial-plan"
      workspaceLabel="Automation Controlled Trial Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationControlledTrialPlanPanel />
    </CodexForgeAppShell>
  );
}
