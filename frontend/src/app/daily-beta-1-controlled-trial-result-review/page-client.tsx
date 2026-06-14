"use client";

import { DailyBetaOneControlledTrialResultReviewPanel } from "@/lib/codexforge/daily-beta-1-controlled-trial-result-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneControlledTrialResultReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-controlled-trial-result-review"
      workspaceLabel="DB1 Trial Results"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneControlledTrialResultReviewPanel />
    </CodexForgeAppShell>
  );
}
