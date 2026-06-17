"use client";

import { FirstCommandExecutionControlledTrialPanel } from "@/lib/codexforge/first-command-execution-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstCommandExecutionControlledTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-command-execution-controlled-trial"
      workspaceLabel="First Command Execution Controlled Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstCommandExecutionControlledTrialPanel />
    </CodexForgeAppShell>
  );
}
