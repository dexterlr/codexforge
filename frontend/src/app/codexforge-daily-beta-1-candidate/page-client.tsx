"use client";

import { CodexForgeDailyBetaOneCandidatePanel } from "@/lib/codexforge/codexforge-daily-beta-1-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeDailyBetaOneCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-daily-beta-1-candidate"
      workspaceLabel="Daily Beta 1 Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeDailyBetaOneCandidatePanel />
    </CodexForgeAppShell>
  );
}
