"use client";

import { EndToEndBuildFixWorkflowRoutePanel } from "@/lib/codexforge/end-to-end-build-fix-workflow/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EndToEndBuildFixWorkflowBoundaryPageClient() {
  return (
    <CodexForgeAppShell activePath="/end-to-end-build-fix-workflow-boundary" workspaceLabel="End to End Build Fix Workflow Boundary" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <EndToEndBuildFixWorkflowRoutePanel routeSlug="end-to-end-build-fix-workflow-boundary" />
    </CodexForgeAppShell>
  );
}
