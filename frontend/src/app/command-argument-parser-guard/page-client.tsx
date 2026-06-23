"use client";

import { CommandRunnerSafetyV2RoutePanel } from "@/lib/codexforge/command-runner-safety-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandArgumentParserGuardPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-argument-parser-guard"
      workspaceLabel="Command Argument Parser Guard"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerSafetyV2RoutePanel routeSlug="command-argument-parser-guard" />
    </CodexForgeAppShell>
  );
}
