"use client";

import { CommandRunnerSafetyV2RoutePanel } from "@/lib/codexforge/command-runner-safety-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitCommandSafetySummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-command-safety-summary"
      workspaceLabel="Cockpit Command Safety Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerSafetyV2RoutePanel routeSlug="cockpit-command-safety-summary" />
    </CodexForgeAppShell>
  );
}
