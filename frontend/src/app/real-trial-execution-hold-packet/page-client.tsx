"use client";

import { RealControlledOperatorTrialPacketRoutePanel } from "@/lib/codexforge/real-controlled-operator-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealTrialExecutionHoldPacketPageClient() {
  return (
    <CodexForgeAppShell activePath="/real-trial-execution-hold-packet" workspaceLabel="Real Trial Execution Hold Packet" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealControlledOperatorTrialPacketRoutePanel routeSlug="real-trial-execution-hold-packet" />
    </CodexForgeAppShell>
  );
}
