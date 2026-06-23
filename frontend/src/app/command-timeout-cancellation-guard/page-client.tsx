"use client";

import { CommandRunnerSafetyV2RoutePanel } from "@/lib/codexforge/command-runner-safety-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandTimeoutCancellationGuardPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-timeout-cancellation-guard"
      workspaceLabel="Command Timeout Cancellation Guard"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerSafetyV2RoutePanel routeSlug="command-timeout-cancellation-guard" />
    </CodexForgeAppShell>
  );
}
