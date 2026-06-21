"use client";

import { CommandDryRunHarnessPanel } from "@/lib/codexforge/command-dry-run-harness/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandDryRunHarnessPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-dry-run-harness"
      workspaceLabel="Command Dry Run Harness"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandDryRunHarnessPanel />
    </CodexForgeAppShell>
  );
}
