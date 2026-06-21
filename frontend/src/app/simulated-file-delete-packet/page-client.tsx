"use client";

import { SimulatedFileDeletePacketPanel } from "@/lib/codexforge/simulated-file-delete-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedFileDeletePacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-file-delete-packet"
      workspaceLabel="Simulated File Delete Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedFileDeletePacketPanel />
    </CodexForgeAppShell>
  );
}
