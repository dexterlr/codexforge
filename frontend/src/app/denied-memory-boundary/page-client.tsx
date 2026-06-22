"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DeniedMemoryBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/denied-memory-boundary"
      workspaceLabel="Denied Memory Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="denied-memory-boundary" />
    </CodexForgeAppShell>
  );
}
