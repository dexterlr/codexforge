"use client";

import { CommandDryRunBridgePanel } from "@/lib/codexforge/command-dry-run-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandDryRunPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-dry-run"
      workspaceLabel="Command Dry Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandDryRunBridgePanel />
    </CodexForgeAppShell>
  );
}
