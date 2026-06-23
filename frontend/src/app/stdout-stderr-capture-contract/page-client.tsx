"use client";

import { CommandRunnerSafetyV2RoutePanel } from "@/lib/codexforge/command-runner-safety-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function StdoutStderrCaptureContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/stdout-stderr-capture-contract"
      workspaceLabel="Stdout Stderr Capture Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerSafetyV2RoutePanel routeSlug="stdout-stderr-capture-contract" />
    </CodexForgeAppShell>
  );
}
