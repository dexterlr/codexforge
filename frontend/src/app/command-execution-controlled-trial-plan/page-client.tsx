"use client";

import { CommandExecutionControlledTrialPlanPanel } from "@/lib/codexforge/command-execution-controlled-trial-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandExecutionControlledTrialPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-execution-controlled-trial-plan"
      workspaceLabel="Command Execution Controlled Trial Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandExecutionControlledTrialPlanPanel />
    </CodexForgeAppShell>
  );
}
