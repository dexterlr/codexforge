"use client";

import { ScheduledResearchCheckBoundaryPanel } from "@/lib/codexforge/scheduled-research-check-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ScheduledResearchCheckBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/scheduled-research-check-boundary"
      workspaceLabel="Scheduled Research Check Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ScheduledResearchCheckBoundaryPanel />
    </CodexForgeAppShell>
  );
}
