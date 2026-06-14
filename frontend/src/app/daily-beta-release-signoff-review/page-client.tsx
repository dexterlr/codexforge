"use client";

import { DailyBetaReleaseSignoffReviewPanel } from "@/lib/codexforge/daily-beta-release-signoff-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaReleaseSignoffReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-release-signoff-review"
      workspaceLabel="Daily Beta Signoff"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaReleaseSignoffReviewPanel />
    </CodexForgeAppShell>
  );
}
