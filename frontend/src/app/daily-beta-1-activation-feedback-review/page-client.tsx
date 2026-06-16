"use client";

import { DailyBetaOneActivationFeedbackReviewPanel } from "@/lib/codexforge/daily-beta-1-activation-feedback-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneActivationFeedbackReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-activation-feedback-review"
      workspaceLabel="Daily Beta 1 Activation Feedback Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneActivationFeedbackReviewPanel />
    </CodexForgeAppShell>
  );
}
