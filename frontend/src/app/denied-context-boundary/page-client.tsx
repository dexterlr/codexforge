"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DeniedContextBoundaryPageClient() {
  return (
    <CodexForgeAppShell activePath="/denied-context-boundary" workspaceLabel="Denied Context Boundary" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="denied-context-boundary" />
    </CodexForgeAppShell>
  );
}
