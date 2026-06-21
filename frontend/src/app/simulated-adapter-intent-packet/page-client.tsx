"use client";

import { SimulatedAdapterIntentPacketPanel } from "@/lib/codexforge/simulated-adapter-intent-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedAdapterIntentPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-adapter-intent-packet"
      workspaceLabel="Simulated Adapter Intent Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedAdapterIntentPacketPanel />
    </CodexForgeAppShell>
  );
}
