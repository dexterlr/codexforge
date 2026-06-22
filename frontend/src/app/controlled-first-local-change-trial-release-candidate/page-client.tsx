"use client";

import { FirstLocalChangeTrialRoutePanel } from "@/lib/codexforge/first-local-change-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledFirstLocalChangeTrialReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell activePath="/controlled-first-local-change-trial-release-candidate" workspaceLabel="Controlled First Local Change Trial Release Candidate" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstLocalChangeTrialRoutePanel routeSlug="controlled-first-local-change-trial-release-candidate" />
    </CodexForgeAppShell>
  );
}
