"use client";

import { FirstLocalChangeTrialRoutePanel } from "@/lib/codexforge/first-local-change-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstLocalChangeTrialBoundaryPageClient() {
  return (
    <CodexForgeAppShell activePath="/first-local-change-trial-boundary" workspaceLabel="First Local Change Trial Boundary" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstLocalChangeTrialRoutePanel routeSlug="first-local-change-trial-boundary" />
    </CodexForgeAppShell>
  );
}
