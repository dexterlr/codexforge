"use client";

import { FirstLocalChangeTrialRoutePanel } from "@/lib/codexforge/first-local-change-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalChangeDeniedPathReviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-change-denied-path-review" workspaceLabel="Local Change Denied Path Review" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstLocalChangeTrialRoutePanel routeSlug="local-change-denied-path-review" />
    </CodexForgeAppShell>
  );
}
