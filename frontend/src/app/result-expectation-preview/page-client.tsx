"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultExpectationPreviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/result-expectation-preview" workspaceLabel="Result Expectation Preview" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="result-expectation-preview" />
    </CodexForgeAppShell>
  );
}
