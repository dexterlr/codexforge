"use client";

import { FirstLocalChangeTrialRoutePanel } from "@/lib/codexforge/first-local-change-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstApprovedLocalChangeCandidatePageClient() {
  return (
    <CodexForgeAppShell activePath="/first-approved-local-change-candidate" workspaceLabel="First Approved Local Change Candidate" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstLocalChangeTrialRoutePanel routeSlug="first-approved-local-change-candidate" />
    </CodexForgeAppShell>
  );
}
