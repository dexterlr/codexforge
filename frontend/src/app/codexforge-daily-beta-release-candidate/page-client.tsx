"use client";

import { CodexForgeDailyBetaReleaseCandidatePanel } from "@/lib/codexforge/codexforge-daily-beta-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeDailyBetaReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-daily-beta-release-candidate"
      workspaceLabel="Daily Beta RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeDailyBetaReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
