"use client";

import { CodexForgeDailyBetaActivationReleaseCandidatePanel } from "@/lib/codexforge/codexforge-daily-beta-activation-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeDailyBetaActivationReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-daily-beta-activation-release-candidate"
      workspaceLabel="Activation RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeDailyBetaActivationReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
