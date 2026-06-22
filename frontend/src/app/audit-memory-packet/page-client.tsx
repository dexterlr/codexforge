"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AuditMemoryPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/audit-memory-packet"
      workspaceLabel="Audit Memory Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="audit-memory-packet" />
    </CodexForgeAppShell>
  );
}
