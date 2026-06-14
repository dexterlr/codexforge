"use client";

import { DailyBetaOneFeedbackTriageReviewPanel } from "@/lib/codexforge/daily-beta-1-feedback-triage-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneFeedbackTriageReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-feedback-triage-review"
      workspaceLabel="Daily Beta 1 Triage"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneFeedbackTriageReviewPanel />
    </CodexForgeAppShell>
  );
}
