"use client";

import { SimulatedFileMovePacketPanel } from "@/lib/codexforge/simulated-file-move-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedFileMovePacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-file-move-packet"
      workspaceLabel="Simulated File Move Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedFileMovePacketPanel />
    </CodexForgeAppShell>
  );
}
