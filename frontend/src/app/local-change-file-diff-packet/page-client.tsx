"use client";

import { FirstLocalChangeTrialRoutePanel } from "@/lib/codexforge/first-local-change-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalChangeFileDiffPacketPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-change-file-diff-packet" workspaceLabel="Local Change File Diff Packet" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstLocalChangeTrialRoutePanel routeSlug="local-change-file-diff-packet" />
    </CodexForgeAppShell>
  );
}
