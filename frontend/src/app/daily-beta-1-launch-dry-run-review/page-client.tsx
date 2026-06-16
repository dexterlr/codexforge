"use client";

import { DailyBetaOneLaunchDryRunReviewPanel } from "@/lib/codexforge/daily-beta-1-launch-dry-run-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneLaunchDryRunReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-launch-dry-run-review"
      workspaceLabel="Daily Beta 1 Launch Dry-Run Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneLaunchDryRunReviewPanel />
    </CodexForgeAppShell>
  );
}
