"use client";

import { CommandExecutionTrialGatePanel } from "@/lib/codexforge/command-execution-trial-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandExecutionTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-execution-trial"
      workspaceLabel="Command Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandExecutionTrialGatePanel />
    </CodexForgeAppShell>
  );
}
