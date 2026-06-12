"use client";

import { LiveWorkflowOperatorFeedbackReviewPanel } from "@/lib/codexforge/live-workflow-operator-feedback-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/live-workflow-operator-feedback-review"
      workspaceLabel="Live Feedback Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LiveWorkflowOperatorFeedbackReviewPanel />
    </CodexForgeAppShell>
  );
}
