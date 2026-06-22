"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceMemoryBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-memory-boundary"
      workspaceLabel="Evidence Memory Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="evidence-memory-boundary" />
    </CodexForgeAppShell>
  );
}
