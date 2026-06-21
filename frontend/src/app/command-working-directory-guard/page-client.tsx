"use client";

import { CommandWorkingDirectoryGuardPanel } from "@/lib/codexforge/command-working-directory-guard/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandWorkingDirectoryGuardPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-working-directory-guard"
      workspaceLabel="Command Working Directory Guard"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandWorkingDirectoryGuardPanel />
    </CodexForgeAppShell>
  );
}
