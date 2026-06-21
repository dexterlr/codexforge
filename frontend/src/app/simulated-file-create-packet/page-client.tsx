"use client";

import { SimulatedFileCreatePacketPanel } from "@/lib/codexforge/simulated-file-create-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedFileCreatePacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-file-create-packet"
      workspaceLabel="Simulated File Create Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedFileCreatePacketPanel />
    </CodexForgeAppShell>
  );
}
