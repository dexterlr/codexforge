"use client";

import { EndToEndBuildFixWorkflowRoutePanel } from "@/lib/codexforge/end-to-end-build-fix-workflow/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildFixResultDecisionPacketPageClient() {
  return (
    <CodexForgeAppShell activePath="/build-fix-result-decision-packet" workspaceLabel="Build Fix Result Decision Packet" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <EndToEndBuildFixWorkflowRoutePanel routeSlug="build-fix-result-decision-packet" />
    </CodexForgeAppShell>
  );
}
