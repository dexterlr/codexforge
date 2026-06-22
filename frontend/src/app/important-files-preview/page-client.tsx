"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ImportantFilesPreviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/important-files-preview" workspaceLabel="Important Files Preview" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="important-files-preview" />
    </CodexForgeAppShell>
  );
}
