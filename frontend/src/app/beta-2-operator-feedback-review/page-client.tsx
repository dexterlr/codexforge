"use client";

import { BetaTwoOperatorFeedbackReviewPanel } from "@/lib/codexforge/beta-2-operator-feedback-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaTwoOperatorFeedbackReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-2-operator-feedback-review"
      workspaceLabel="Beta 2 Feedback Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaTwoOperatorFeedbackReviewPanel />
    </CodexForgeAppShell>
  );
}
