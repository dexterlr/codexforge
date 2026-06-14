"use client";

import { DailyBetaFeedbackReviewPanel } from "@/lib/codexforge/daily-beta-feedback-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaFeedbackReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-feedback-review"
      workspaceLabel="Daily Beta Feedback"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaFeedbackReviewPanel />
    </CodexForgeAppShell>
  );
}
