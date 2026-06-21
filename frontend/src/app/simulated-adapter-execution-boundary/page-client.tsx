"use client";

import { SimulatedAdapterExecutionBoundaryPanel } from "@/lib/codexforge/simulated-adapter-execution-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedAdapterExecutionBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-adapter-execution-boundary"
      workspaceLabel="Simulated Adapter Execution Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedAdapterExecutionBoundaryPanel />
    </CodexForgeAppShell>
  );
}
