"use client";

import { DailyBetaReleaseCandidateSummaryPanel } from "@/lib/codexforge/daily-beta-release-candidate-summary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaReleaseCandidateSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-release-candidate-summary"
      workspaceLabel="Release Candidate Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaReleaseCandidateSummaryPanel />
    </CodexForgeAppShell>
  );
}
