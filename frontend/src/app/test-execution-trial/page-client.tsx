"use client";

import { TestExecutionTrialGatePanel } from "@/lib/codexforge/test-execution-trial-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TestExecutionTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/test-execution-trial"
      workspaceLabel="Test Execution Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TestExecutionTrialGatePanel />
    </CodexForgeAppShell>
  );
}
