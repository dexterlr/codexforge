"use client";

import { CodexForgeDailyBetaOneLaunchCandidatePanel } from "@/lib/codexforge/codexforge-daily-beta-1-launch-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeDailyBetaOneLaunchCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-daily-beta-1-launch-candidate"
      workspaceLabel="CodexForge Daily Beta 1 Launch Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeDailyBetaOneLaunchCandidatePanel />
    </CodexForgeAppShell>
  );
}
