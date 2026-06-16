"use client";

import { DailyBetaOneLaunchEvidenceReviewPanel } from "@/lib/codexforge/daily-beta-1-launch-evidence-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneLaunchEvidenceReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-launch-evidence-review"
      workspaceLabel="Daily Beta 1 Launch Evidence Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneLaunchEvidenceReviewPanel />
    </CodexForgeAppShell>
  );
}
