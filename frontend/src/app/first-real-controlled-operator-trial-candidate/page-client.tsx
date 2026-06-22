"use client";

import { RealControlledOperatorTrialPacketRoutePanel } from "@/lib/codexforge/real-controlled-operator-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstRealControlledOperatorTrialCandidatePageClient() {
  return (
    <CodexForgeAppShell activePath="/first-real-controlled-operator-trial-candidate" workspaceLabel="First Real Controlled Operator Trial Candidate" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealControlledOperatorTrialPacketRoutePanel routeSlug="first-real-controlled-operator-trial-candidate" />
    </CodexForgeAppShell>
  );
}
