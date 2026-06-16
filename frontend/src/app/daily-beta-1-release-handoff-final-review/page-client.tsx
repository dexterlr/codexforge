"use client";

import { DailyBetaOneReleaseHandoffFinalReviewPanel } from "@/lib/codexforge/daily-beta-1-release-handoff-final-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneReleaseHandoffFinalReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-release-handoff-final-review"
      workspaceLabel="Daily Beta 1 Release Handoff Final Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneReleaseHandoffFinalReviewPanel />
    </CodexForgeAppShell>
  );
}
