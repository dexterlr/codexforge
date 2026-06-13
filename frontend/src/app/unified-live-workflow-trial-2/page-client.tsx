"use client";

import { UnifiedLiveWorkflowTrialTwoPanel } from "@/lib/codexforge/unified-live-workflow-trial-2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UnifiedLiveWorkflowTrialTwoPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/unified-live-workflow-trial-2"
      workspaceLabel="Unified Trial 2"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UnifiedLiveWorkflowTrialTwoPanel />
    </CodexForgeAppShell>
  );
}
