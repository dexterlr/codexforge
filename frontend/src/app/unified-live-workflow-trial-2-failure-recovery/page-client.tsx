"use client";

import { UnifiedLiveWorkflowTrialTwoFailureRecoveryPanel } from "@/lib/codexforge/unified-live-workflow-trial-2-failure-recovery/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UnifiedLiveWorkflowTrialTwoFailureRecoveryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/unified-live-workflow-trial-2-failure-recovery"
      workspaceLabel="Trial 2 Recovery"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UnifiedLiveWorkflowTrialTwoFailureRecoveryPanel />
    </CodexForgeAppShell>
  );
}
