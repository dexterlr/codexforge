"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultMemoryPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/result-memory-packet"
      workspaceLabel="Result Memory Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="result-memory-packet" />
    </CodexForgeAppShell>
  );
}
