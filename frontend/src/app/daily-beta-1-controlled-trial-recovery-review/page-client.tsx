"use client";

import { DailyBetaOneControlledTrialRecoveryReviewPanel } from "@/lib/codexforge/daily-beta-1-controlled-trial-recovery-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneControlledTrialRecoveryReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-controlled-trial-recovery-review"
      workspaceLabel="DB1 Trial Recovery"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneControlledTrialRecoveryReviewPanel />
    </CodexForgeAppShell>
  );
}
