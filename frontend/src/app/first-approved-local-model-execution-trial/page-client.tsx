"use client";

import { FirstApprovedLocalModelExecutionTrialPanel } from "@/lib/codexforge/first-approved-local-model-execution-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstApprovedLocalModelExecutionTrialPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-approved-local-model-execution-trial"
      workspaceLabel="Local Model Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstApprovedLocalModelExecutionTrialPanel />
    </CodexForgeAppShell>
  );
}
