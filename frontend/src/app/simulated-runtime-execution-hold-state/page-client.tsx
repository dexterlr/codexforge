"use client";

import { SimulatedRuntimeExecutionHoldStatePanel } from "@/lib/codexforge/simulated-runtime-execution-hold-state/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedRuntimeExecutionHoldStatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-runtime-execution-hold-state"
      workspaceLabel="Simulated Runtime Execution Hold State"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedRuntimeExecutionHoldStatePanel />
    </CodexForgeAppShell>
  );
}
