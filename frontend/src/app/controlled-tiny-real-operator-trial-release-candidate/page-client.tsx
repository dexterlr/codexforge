"use client";

import { TinyRealControlledTrialRoutePanel } from "@/lib/codexforge/tiny-real-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledTinyRealOperatorTrialReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-tiny-real-operator-trial-release-candidate"
      workspaceLabel="Controlled Tiny Real Operator Trial Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TinyRealControlledTrialRoutePanel routeSlug="controlled-tiny-real-operator-trial-release-candidate" />
    </CodexForgeAppShell>
  );
}
