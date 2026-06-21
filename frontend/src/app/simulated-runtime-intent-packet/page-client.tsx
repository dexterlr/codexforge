"use client";

import { SimulatedRuntimeIntentPacketPanel } from "@/lib/codexforge/simulated-runtime-intent-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedRuntimeIntentPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-runtime-intent-packet"
      workspaceLabel="Simulated Runtime Intent Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedRuntimeIntentPacketPanel />
    </CodexForgeAppShell>
  );
}
