"use client";

import { CommandRunnerSafetyV2RoutePanel } from "@/lib/codexforge/command-runner-safety-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DangerousCommandDenialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dangerous-command-denial"
      workspaceLabel="Dangerous Command Denial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerSafetyV2RoutePanel routeSlug="dangerous-command-denial" />
    </CodexForgeAppShell>
  );
}
