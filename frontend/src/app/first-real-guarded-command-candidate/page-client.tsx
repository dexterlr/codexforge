"use client";

import { FirstRealGuardedCommandCandidatePanel } from "@/lib/codexforge/first-real-guarded-command-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstRealGuardedCommandCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-real-guarded-command-candidate"
      workspaceLabel="First Real Guarded Command Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstRealGuardedCommandCandidatePanel />
    </CodexForgeAppShell>
  );
}
