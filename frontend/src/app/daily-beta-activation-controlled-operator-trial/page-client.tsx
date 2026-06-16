"use client";

import { DailyBetaActivationControlledOperatorTrialPanel } from "@/lib/codexforge/daily-beta-activation-controlled-operator-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaActivationControlledOperatorTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-activation-controlled-operator-trial"
      workspaceLabel="Activation Trial Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaActivationControlledOperatorTrialPanel />
    </CodexForgeAppShell>
  );
}
