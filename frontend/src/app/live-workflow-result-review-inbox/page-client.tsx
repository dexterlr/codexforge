"use client";

import { LiveWorkflowResultReviewInboxPanel } from "@/lib/codexforge/live-workflow-result-review-inbox/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/live-workflow-result-review-inbox"
      workspaceLabel="Live Result Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LiveWorkflowResultReviewInboxPanel />
    </CodexForgeAppShell>
  );
}
