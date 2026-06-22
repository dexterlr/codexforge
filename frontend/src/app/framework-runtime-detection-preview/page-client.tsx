"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FrameworkRuntimeDetectionPreviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/framework-runtime-detection-preview" workspaceLabel="Framework Runtime Detection Preview" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="framework-runtime-detection-preview" />
    </CodexForgeAppShell>
  );
}
