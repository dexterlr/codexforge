"use client";

import { CodexForgeDailyBetaOneGoNoGoCandidatePanel } from "@/lib/codexforge/codexforge-daily-beta-1-go-no-go-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeDailyBetaOneGoNoGoCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-daily-beta-1-go-no-go-candidate"
      workspaceLabel="CodexForge Daily Beta 1 Go/No-Go Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeDailyBetaOneGoNoGoCandidatePanel />
    </CodexForgeAppShell>
  );
}
