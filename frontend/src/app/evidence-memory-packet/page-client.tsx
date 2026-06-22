"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceMemoryPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-memory-packet"
      workspaceLabel="Evidence Memory Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="evidence-memory-packet" />
    </CodexForgeAppShell>
  );
}
