"use client";

import { RealControlledOperatorTrialPacketRoutePanel } from "@/lib/codexforge/real-controlled-operator-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealTrialGoNoGoReviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/real-trial-go-no-go-review" workspaceLabel="Real Trial Go No Go Review" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealControlledOperatorTrialPacketRoutePanel routeSlug="real-trial-go-no-go-review" />
    </CodexForgeAppShell>
  );
}
