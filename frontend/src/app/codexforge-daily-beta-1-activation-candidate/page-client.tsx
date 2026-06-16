"use client";

import { CodexForgeDailyBetaOneActivationCandidatePanel } from "@/lib/codexforge/codexforge-daily-beta-1-activation-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeDailyBetaOneActivationCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-daily-beta-1-activation-candidate"
      workspaceLabel="Daily Beta 1 Activation Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeDailyBetaOneActivationCandidatePanel />
    </CodexForgeAppShell>
  );
}
