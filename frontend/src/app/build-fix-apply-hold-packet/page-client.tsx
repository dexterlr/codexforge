"use client";

import { EndToEndBuildFixWorkflowRoutePanel } from "@/lib/codexforge/end-to-end-build-fix-workflow/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildFixApplyHoldPacketPageClient() {
  return (
    <CodexForgeAppShell activePath="/build-fix-apply-hold-packet" workspaceLabel="Build Fix Apply Hold Packet" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <EndToEndBuildFixWorkflowRoutePanel routeSlug="build-fix-apply-hold-packet" />
    </CodexForgeAppShell>
  );
}
