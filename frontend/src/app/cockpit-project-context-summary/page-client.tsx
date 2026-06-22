"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitProjectContextSummaryPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-project-context-summary" workspaceLabel="Cockpit Project Context Summary" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="cockpit-project-context-summary" />
    </CodexForgeAppShell>
  );
}
