"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ContextConfidenceReviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/context-confidence-review" workspaceLabel="Context Confidence Review" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="context-confidence-review" />
    </CodexForgeAppShell>
  );
}
