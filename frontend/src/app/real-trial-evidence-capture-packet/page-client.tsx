"use client";

import { RealControlledOperatorTrialPacketRoutePanel } from "@/lib/codexforge/real-controlled-operator-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealTrialEvidenceCapturePacketPageClient() {
  return (
    <CodexForgeAppShell activePath="/real-trial-evidence-capture-packet" workspaceLabel="Real Trial Evidence Capture Packet" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealControlledOperatorTrialPacketRoutePanel routeSlug="real-trial-evidence-capture-packet" />
    </CodexForgeAppShell>
  );
}
