"use client";

import { EndToEndBuildFixWorkflowRoutePanel } from "@/lib/codexforge/end-to-end-build-fix-workflow/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildFixCommandPreviewPacketPageClient() {
  return (
    <CodexForgeAppShell activePath="/build-fix-command-preview-packet" workspaceLabel="Build Fix Command Preview Packet" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <EndToEndBuildFixWorkflowRoutePanel routeSlug="build-fix-command-preview-packet" />
    </CodexForgeAppShell>
  );
}
