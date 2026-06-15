"use client";

import { FirstApprovedProviderExecutionTrialPanel } from "@/lib/codexforge/first-approved-provider-execution-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstApprovedProviderExecutionTrialPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-approved-provider-execution-trial"
      workspaceLabel="Provider Execution Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstApprovedProviderExecutionTrialPanel />
    </CodexForgeAppShell>
  );
}
