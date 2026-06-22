"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledProjectContextBrainReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell activePath="/controlled-project-context-brain-release-candidate" workspaceLabel="Controlled Project Context Brain Release Candidate" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="controlled-project-context-brain-release-candidate" />
    </CodexForgeAppShell>
  );
}
