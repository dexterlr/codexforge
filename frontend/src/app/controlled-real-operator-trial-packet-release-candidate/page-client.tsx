"use client";

import { RealControlledOperatorTrialPacketRoutePanel } from "@/lib/codexforge/real-controlled-operator-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledRealOperatorTrialPacketReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell activePath="/controlled-real-operator-trial-packet-release-candidate" workspaceLabel="Controlled Real Operator Trial Packet Release Candidate" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealControlledOperatorTrialPacketRoutePanel routeSlug="controlled-real-operator-trial-packet-release-candidate" />
    </CodexForgeAppShell>
  );
}
