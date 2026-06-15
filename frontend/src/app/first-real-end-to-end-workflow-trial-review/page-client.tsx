"use client";

import { FirstRealEndToEndWorkflowTrialReviewPanel } from "@/lib/codexforge/first-real-end-to-end-workflow-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstRealEndToEndWorkflowTrialReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-real-end-to-end-workflow-trial-review"
      workspaceLabel="End-to-End Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstRealEndToEndWorkflowTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
