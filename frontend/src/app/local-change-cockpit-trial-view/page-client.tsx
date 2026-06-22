"use client";

import { FirstLocalChangeTrialRoutePanel } from "@/lib/codexforge/first-local-change-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalChangeCockpitTrialViewPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-change-cockpit-trial-view" workspaceLabel="Local Change Cockpit Trial View" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstLocalChangeTrialRoutePanel routeSlug="local-change-cockpit-trial-view" />
    </CodexForgeAppShell>
  );
}
