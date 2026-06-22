"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandCandidatePreviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/command-candidate-preview" workspaceLabel="Command Candidate Preview" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="command-candidate-preview" />
    </CodexForgeAppShell>
  );
}
