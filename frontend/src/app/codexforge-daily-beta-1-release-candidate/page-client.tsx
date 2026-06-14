"use client";

import { CodexForgeDailyBetaOneReleaseCandidatePanel } from "@/lib/codexforge/codexforge-daily-beta-1-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeDailyBetaOneReleaseCandidatePanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-daily-beta-1-release-candidate"
      workspaceLabel="Daily Beta 1 RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeDailyBetaOneReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
