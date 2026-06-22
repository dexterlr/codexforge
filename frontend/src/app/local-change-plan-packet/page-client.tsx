"use client";

import { FirstLocalChangeTrialRoutePanel } from "@/lib/codexforge/first-local-change-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalChangePlanPacketPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-change-plan-packet" workspaceLabel="Local Change Plan Packet" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstLocalChangeTrialRoutePanel routeSlug="local-change-plan-packet" />
    </CodexForgeAppShell>
  );
}
