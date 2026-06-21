"use client";

import { ControlledRealGuardedCommandMvpReleaseCandidatePanel } from "@/lib/codexforge/controlled-real-guarded-command-mvp-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledRealGuardedCommandMvpReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-real-guarded-command-mvp-release-candidate"
      workspaceLabel="Controlled Real Guarded Command MVP Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledRealGuardedCommandMvpReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
