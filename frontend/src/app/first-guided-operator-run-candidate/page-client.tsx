"use client";

import { GuidedOperatorRunRoutePanel } from "@/lib/codexforge/guided-operator-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstGuidedOperatorRunCandidatePageClient() {
  return (
    <CodexForgeAppShell activePath="/first-guided-operator-run-candidate" workspaceLabel="First Guided Operator Run Candidate" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <GuidedOperatorRunRoutePanel routeSlug="first-guided-operator-run-candidate" />
    </CodexForgeAppShell>
  );
}
