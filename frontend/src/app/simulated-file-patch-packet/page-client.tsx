"use client";

import { SimulatedFilePatchPacketPanel } from "@/lib/codexforge/simulated-file-patch-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedFilePatchPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-file-patch-packet"
      workspaceLabel="Simulated File Patch Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedFilePatchPacketPanel />
    </CodexForgeAppShell>
  );
}
