"use client";

import { SimulatedFileUpdatePacketPanel } from "@/lib/codexforge/simulated-file-update-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedFileUpdatePacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-file-update-packet"
      workspaceLabel="Simulated File Update Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedFileUpdatePacketPanel />
    </CodexForgeAppShell>
  );
}
