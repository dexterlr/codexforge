"use client";

import { DailyBetaOneActivationRecoveryReviewPanel } from "@/lib/codexforge/daily-beta-1-activation-recovery-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneActivationRecoveryReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-activation-recovery-review"
      workspaceLabel="Daily Beta 1 Activation Recovery Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneActivationRecoveryReviewPanel />
    </CodexForgeAppShell>
  );
}
