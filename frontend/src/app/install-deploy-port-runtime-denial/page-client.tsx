"use client";

import { CommandRunnerSafetyV2RoutePanel } from "@/lib/codexforge/command-runner-safety-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function InstallDeployPortRuntimeDenialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/install-deploy-port-runtime-denial"
      workspaceLabel="Install Deploy Port Runtime Denial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerSafetyV2RoutePanel routeSlug="install-deploy-port-runtime-denial" />
    </CodexForgeAppShell>
  );
}
