"use client";

import { EndToEndBuildFixWorkflowRoutePanel } from "@/lib/codexforge/end-to-end-build-fix-workflow/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstEndToEndBuildFixCandidatePageClient() {
  return (
    <CodexForgeAppShell activePath="/first-end-to-end-build-fix-candidate" workspaceLabel="First End to End Build Fix Candidate" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <EndToEndBuildFixWorkflowRoutePanel routeSlug="first-end-to-end-build-fix-candidate" />
    </CodexForgeAppShell>
  );
}
