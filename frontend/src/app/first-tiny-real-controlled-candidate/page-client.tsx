"use client";

import { TinyRealControlledTrialRoutePanel } from "@/lib/codexforge/tiny-real-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstTinyRealControlledCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-tiny-real-controlled-candidate"
      workspaceLabel="First Tiny Real Controlled Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TinyRealControlledTrialRoutePanel routeSlug="first-tiny-real-controlled-candidate" />
    </CodexForgeAppShell>
  );
}
