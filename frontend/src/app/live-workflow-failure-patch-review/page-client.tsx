"use client";

import { LiveWorkflowFailurePatchReviewPanel } from "@/lib/codexforge/live-workflow-failure-patch-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/live-workflow-failure-patch-review"
      workspaceLabel="Live Failure Patch"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LiveWorkflowFailurePatchReviewPanel />
    </CodexForgeAppShell>
  );
}
