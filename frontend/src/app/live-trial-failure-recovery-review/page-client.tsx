"use client";

import { LiveTrialFailureRecoveryReviewPanel } from "@/lib/codexforge/live-trial-failure-recovery-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LiveTrialFailureRecoveryReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/live-trial-failure-recovery-review"
      workspaceLabel="Live Trial Recovery"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LiveTrialFailureRecoveryReviewPanel />
    </CodexForgeAppShell>
  );
}
