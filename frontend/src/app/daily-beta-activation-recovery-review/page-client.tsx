"use client";

import { DailyBetaActivationRecoveryReviewPanel } from "@/lib/codexforge/daily-beta-activation-recovery-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaActivationRecoveryReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-activation-recovery-review"
      workspaceLabel="Activation Recovery"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaActivationRecoveryReviewPanel />
    </CodexForgeAppShell>
  );
}
