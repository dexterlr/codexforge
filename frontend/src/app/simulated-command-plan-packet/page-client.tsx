"use client";

import { SimulatedCommandPlanPacketPanel } from "@/lib/codexforge/simulated-command-plan-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedCommandPlanPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-command-plan-packet"
      workspaceLabel="Simulated Command Plan Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedCommandPlanPacketPanel />
    </CodexForgeAppShell>
  );
}
