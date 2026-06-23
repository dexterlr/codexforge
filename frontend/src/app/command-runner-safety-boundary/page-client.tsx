"use client";

import { CommandRunnerSafetyV2RoutePanel } from "@/lib/codexforge/command-runner-safety-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandRunnerSafetyBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-runner-safety-boundary"
      workspaceLabel="Command Runner Safety Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerSafetyV2RoutePanel routeSlug="command-runner-safety-boundary" />
    </CodexForgeAppShell>
  );
}
