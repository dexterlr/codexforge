"use client";

import { SimulatedCommandExecutionBoundaryPanel } from "@/lib/codexforge/simulated-command-execution-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedCommandExecutionBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-command-execution-boundary"
      workspaceLabel="Simulated Command Execution Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedCommandExecutionBoundaryPanel />
    </CodexForgeAppShell>
  );
}
