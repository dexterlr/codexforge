"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectContextBrainBoundaryPageClient() {
  return (
    <CodexForgeAppShell activePath="/project-context-brain-boundary" workspaceLabel="Project Context Brain Boundary" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="project-context-brain-boundary" />
    </CodexForgeAppShell>
  );
}
