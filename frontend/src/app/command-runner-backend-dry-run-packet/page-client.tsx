"use client";

import { CommandRunnerBackendDryRunPacketPanel } from "@/lib/codexforge/command-runner-backend-dry-run-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandRunnerBackendDryRunPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-runner-backend-dry-run-packet"
      workspaceLabel="Command Runner Backend Dry-Run Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerBackendDryRunPacketPanel />
    </CodexForgeAppShell>
  );
}
