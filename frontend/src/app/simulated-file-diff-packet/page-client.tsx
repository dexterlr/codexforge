"use client";

import { SimulatedFileDiffPacketPanel } from "@/lib/codexforge/simulated-file-diff-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedFileDiffPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-file-diff-packet"
      workspaceLabel="Simulated File Diff Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedFileDiffPacketPanel />
    </CodexForgeAppShell>
  );
}
