"use client";

import { SimulatedCommandExecutionHoldStatePanel } from "@/lib/codexforge/simulated-command-execution-hold-state/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedCommandExecutionHoldStatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-command-execution-hold-state"
      workspaceLabel="Simulated Command Execution Hold State"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedCommandExecutionHoldStatePanel />
    </CodexForgeAppShell>
  );
}
