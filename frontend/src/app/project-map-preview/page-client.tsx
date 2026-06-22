"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectMapPreviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/project-map-preview" workspaceLabel="Project Map Preview" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="project-map-preview" />
    </CodexForgeAppShell>
  );
}
