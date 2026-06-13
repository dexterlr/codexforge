"use client";

import { UnifiedLiveWorkflowTrialTwoResultReviewPanel } from "@/lib/codexforge/unified-live-workflow-trial-2-result-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UnifiedLiveWorkflowTrialTwoResultReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/unified-live-workflow-trial-2-result-review"
      workspaceLabel="Trial 2 Results"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UnifiedLiveWorkflowTrialTwoResultReviewPanel />
    </CodexForgeAppShell>
  );
}
