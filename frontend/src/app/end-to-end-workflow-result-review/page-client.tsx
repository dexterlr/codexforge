"use client";

import { EndToEndWorkflowResultReviewPanel } from "@/lib/codexforge/end-to-end-workflow-result-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EndToEndWorkflowResultReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/end-to-end-workflow-result-review"
      workspaceLabel="End-to-End Result"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EndToEndWorkflowResultReviewPanel />
    </CodexForgeAppShell>
  );
}
