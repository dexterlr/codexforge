"use client";

import { DailyBetaOneReleaseNotesReviewPanel } from "@/lib/codexforge/daily-beta-1-release-notes-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneReleaseNotesReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-release-notes-review"
      workspaceLabel="Daily Beta 1 Notes"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneReleaseNotesReviewPanel />
    </CodexForgeAppShell>
  );
}
