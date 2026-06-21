"use client";

import { SimulatedRuntimePlanPacketPanel } from "@/lib/codexforge/simulated-runtime-plan-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedRuntimePlanPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-runtime-plan-packet"
      workspaceLabel="Simulated Runtime Plan Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedRuntimePlanPacketPanel />
    </CodexForgeAppShell>
  );
}
