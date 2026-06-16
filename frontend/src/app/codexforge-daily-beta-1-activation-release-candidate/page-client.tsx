"use client";

import { CodexForgeDailyBetaOneActivationReleaseCandidatePanel } from "@/lib/codexforge/codexforge-daily-beta-1-activation-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeDailyBetaOneActivationReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-daily-beta-1-activation-release-candidate"
      workspaceLabel="Daily Beta 1 Activation Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeDailyBetaOneActivationReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
