"use client";

import { RealControlledOperatorTrialPacketRoutePanel } from "@/lib/codexforge/real-controlled-operator-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealControlledOperatorTrialPacketBoundaryPageClient() {
  return (
    <CodexForgeAppShell activePath="/real-controlled-operator-trial-packet-boundary" workspaceLabel="Real Controlled Operator Trial Packet Boundary" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealControlledOperatorTrialPacketRoutePanel routeSlug="real-controlled-operator-trial-packet-boundary" />
    </CodexForgeAppShell>
  );
}
