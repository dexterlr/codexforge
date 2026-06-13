"use client";

import { BetaOperatorDailyWorkflowTrialPanel } from "@/lib/codexforge/beta-operator-daily-workflow-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaOperatorDailyWorkflowTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-operator-daily-workflow-trial"
      workspaceLabel="Beta Daily Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaOperatorDailyWorkflowTrialPanel />
    </CodexForgeAppShell>
  );
}
