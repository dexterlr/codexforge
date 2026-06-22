"use client";

import { RealControlledOperatorTrialPacketRoutePanel } from "@/lib/codexforge/real-controlled-operator-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealTrialOperatorChecklistPageClient() {
  return (
    <CodexForgeAppShell activePath="/real-trial-operator-checklist" workspaceLabel="Real Trial Operator Checklist" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealControlledOperatorTrialPacketRoutePanel routeSlug="real-trial-operator-checklist" />
    </CodexForgeAppShell>
  );
}
