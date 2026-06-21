"use client";

import { SimulatedAdapterExecutionHoldStatePanel } from "@/lib/codexforge/simulated-adapter-execution-hold-state/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedAdapterExecutionHoldStatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-adapter-execution-hold-state"
      workspaceLabel="Simulated Adapter Execution Hold State"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedAdapterExecutionHoldStatePanel />
    </CodexForgeAppShell>
  );
}
