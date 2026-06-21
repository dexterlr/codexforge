"use client";

import { CommandArgumentGuardPanel } from "@/lib/codexforge/command-argument-guard/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandArgumentGuardPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-argument-guard"
      workspaceLabel="Command Argument Guard"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandArgumentGuardPanel />
    </CodexForgeAppShell>
  );
}
