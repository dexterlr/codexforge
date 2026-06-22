"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstProjectContextBrainCandidatePageClient() {
  return (
    <CodexForgeAppShell activePath="/first-project-context-brain-candidate" workspaceLabel="First Project Context Brain Candidate" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="first-project-context-brain-candidate" />
    </CodexForgeAppShell>
  );
}
