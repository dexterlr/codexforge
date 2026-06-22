"use client";

import { RealControlledOperatorTrialPacketRoutePanel } from "@/lib/codexforge/real-controlled-operator-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealTrialProjectContextPacketPageClient() {
  return (
    <CodexForgeAppShell activePath="/real-trial-project-context-packet" workspaceLabel="Real Trial Project Context Packet" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealControlledOperatorTrialPacketRoutePanel routeSlug="real-trial-project-context-packet" />
    </CodexForgeAppShell>
  );
}
