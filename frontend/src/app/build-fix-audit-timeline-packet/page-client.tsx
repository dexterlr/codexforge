"use client";

import { EndToEndBuildFixWorkflowRoutePanel } from "@/lib/codexforge/end-to-end-build-fix-workflow/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildFixAuditTimelinePacketPageClient() {
  return (
    <CodexForgeAppShell activePath="/build-fix-audit-timeline-packet" workspaceLabel="Build Fix Audit Timeline Packet" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <EndToEndBuildFixWorkflowRoutePanel routeSlug="build-fix-audit-timeline-packet" />
    </CodexForgeAppShell>
  );
}
