"use client";

import { FirstLocalChangeTrialRoutePanel } from "@/lib/codexforge/first-local-change-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalChangeCommandPreviewPacketPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-change-command-preview-packet" workspaceLabel="Local Change Command Preview Packet" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstLocalChangeTrialRoutePanel routeSlug="local-change-command-preview-packet" />
    </CodexForgeAppShell>
  );
}
