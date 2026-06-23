"use client";

import { CommandRunnerSafetyV2RoutePanel } from "@/lib/codexforge/command-runner-safety-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ShellEscalationDenialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/shell-escalation-denial"
      workspaceLabel="Shell Escalation Denial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerSafetyV2RoutePanel routeSlug="shell-escalation-denial" />
    </CodexForgeAppShell>
  );
}
