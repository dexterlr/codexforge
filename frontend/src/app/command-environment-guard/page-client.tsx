"use client";

import { CommandEnvironmentGuardPanel } from "@/lib/codexforge/command-environment-guard/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandEnvironmentGuardPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-environment-guard"
      workspaceLabel="Command Environment Guard"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandEnvironmentGuardPanel />
    </CodexForgeAppShell>
  );
}
