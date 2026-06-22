"use client";

import { EndToEndBuildFixWorkflowRoutePanel } from "@/lib/codexforge/end-to-end-build-fix-workflow/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildFixRiskReviewPacketPageClient() {
  return (
    <CodexForgeAppShell activePath="/build-fix-risk-review-packet" workspaceLabel="Build Fix Risk Review Packet" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <EndToEndBuildFixWorkflowRoutePanel routeSlug="build-fix-risk-review-packet" />
    </CodexForgeAppShell>
  );
}
