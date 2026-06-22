"use client";

import { EvidenceMemoryRoutePanel } from "@/lib/codexforge/evidence-memory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitEvidenceMemorySummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-evidence-memory-summary"
      workspaceLabel="Cockpit Evidence Memory Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceMemoryRoutePanel routeSlug="cockpit-evidence-memory-summary" />
    </CodexForgeAppShell>
  );
}
