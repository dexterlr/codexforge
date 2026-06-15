"use client";

import { FirstApprovedTestExecutionTrialPanel } from "@/lib/codexforge/first-approved-test-execution-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstApprovedTestExecutionTrialPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-approved-test-execution-trial"
      workspaceLabel="Test Execution Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstApprovedTestExecutionTrialPanel />
    </CodexForgeAppShell>
  );
}
