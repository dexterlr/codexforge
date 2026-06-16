"use client";

import { CodexForgeDailyBetaActivationCandidatePanel } from "@/lib/codexforge/codexforge-daily-beta-activation-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeDailyBetaActivationCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-daily-beta-activation-candidate"
      workspaceLabel="Activation Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeDailyBetaActivationCandidatePanel />
    </CodexForgeAppShell>
  );
}
