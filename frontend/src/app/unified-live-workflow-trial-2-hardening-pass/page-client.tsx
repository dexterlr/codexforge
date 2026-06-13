"use client";

import { UnifiedLiveWorkflowTrialTwoHardeningPassPanel } from "@/lib/codexforge/unified-live-workflow-trial-2-hardening-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UnifiedLiveWorkflowTrialTwoHardeningPassPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/unified-live-workflow-trial-2-hardening-pass"
      workspaceLabel="Trial 2 Hardening"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UnifiedLiveWorkflowTrialTwoHardeningPassPanel />
    </CodexForgeAppShell>
  );
}
