"use client";

import { RealControlledOperatorTrialPacketRoutePanel } from "@/lib/codexforge/real-controlled-operator-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealTrialDeniedPathChecklistPageClient() {
  return (
    <CodexForgeAppShell activePath="/real-trial-denied-path-checklist" workspaceLabel="Real Trial Denied Path Checklist" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealControlledOperatorTrialPacketRoutePanel routeSlug="real-trial-denied-path-checklist" />
    </CodexForgeAppShell>
  );
}
