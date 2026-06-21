"use client";

import { CommandExecutionHoldPanel } from "@/lib/codexforge/command-execution-hold/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandExecutionHoldPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-execution-hold"
      workspaceLabel="Command Execution Hold"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandExecutionHoldPanel />
    </CodexForgeAppShell>
  );
}
