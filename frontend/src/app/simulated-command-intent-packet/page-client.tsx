"use client";

import { SimulatedCommandIntentPacketPanel } from "@/lib/codexforge/simulated-command-intent-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedCommandIntentPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-command-intent-packet"
      workspaceLabel="Simulated Command Intent Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedCommandIntentPacketPanel />
    </CodexForgeAppShell>
  );
}
