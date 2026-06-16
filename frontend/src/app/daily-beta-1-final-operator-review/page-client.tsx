"use client";

import { DailyBetaOneFinalOperatorReviewPanel } from "@/lib/codexforge/daily-beta-1-final-operator-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneFinalOperatorReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-final-operator-review"
      workspaceLabel="Final Operator Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneFinalOperatorReviewPanel />
    </CodexForgeAppShell>
  );
}
