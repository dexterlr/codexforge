"use client";

import { DailyBetaOneLaunchResultReviewPanel } from "@/lib/codexforge/daily-beta-1-launch-result-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneLaunchResultReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-launch-result-review"
      workspaceLabel="Daily Beta 1 Launch Result Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneLaunchResultReviewPanel />
    </CodexForgeAppShell>
  );
}
