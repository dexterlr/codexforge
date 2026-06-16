"use client";

import { CodexForgeDailyBetaOneFinalCandidatePanel } from "@/lib/codexforge/codexforge-daily-beta-1-final-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeDailyBetaOneFinalCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-daily-beta-1-final-candidate"
      workspaceLabel="Daily Beta 1 Final Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeDailyBetaOneFinalCandidatePanel />
    </CodexForgeAppShell>
  );
}
