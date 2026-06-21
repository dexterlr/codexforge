"use client";

import { SimulatedRuntimeExecutionBoundaryPanel } from "@/lib/codexforge/simulated-runtime-execution-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedRuntimeExecutionBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-runtime-execution-boundary"
      workspaceLabel="Simulated Runtime Execution Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedRuntimeExecutionBoundaryPanel />
    </CodexForgeAppShell>
  );
}
