"use client";

import { DailyBetaOneFinalRecoveryReviewPanel } from "@/lib/codexforge/daily-beta-1-final-recovery-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneFinalRecoveryReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-final-recovery-review"
      workspaceLabel="Final Recovery Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneFinalRecoveryReviewPanel />
    </CodexForgeAppShell>
  );
}
