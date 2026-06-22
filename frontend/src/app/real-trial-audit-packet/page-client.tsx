"use client";

import { RealControlledOperatorTrialPacketRoutePanel } from "@/lib/codexforge/real-controlled-operator-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealTrialAuditPacketPageClient() {
  return (
    <CodexForgeAppShell activePath="/real-trial-audit-packet" workspaceLabel="Real Trial Audit Packet" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealControlledOperatorTrialPacketRoutePanel routeSlug="real-trial-audit-packet" />
    </CodexForgeAppShell>
  );
}
