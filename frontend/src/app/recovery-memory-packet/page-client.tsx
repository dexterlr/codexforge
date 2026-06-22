"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RecoveryMemoryPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/recovery-memory-packet"
      workspaceLabel="Recovery Memory Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="recovery-memory-packet" />
    </CodexForgeAppShell>
  );
}
