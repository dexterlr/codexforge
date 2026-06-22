"use client";

import { EndToEndBuildFixWorkflowRoutePanel } from "@/lib/codexforge/end-to-end-build-fix-workflow/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildFixProjectContextPacketPageClient() {
  return (
    <CodexForgeAppShell activePath="/build-fix-project-context-packet" workspaceLabel="Build Fix Project Context Packet" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <EndToEndBuildFixWorkflowRoutePanel routeSlug="build-fix-project-context-packet" />
    </CodexForgeAppShell>
  );
}
