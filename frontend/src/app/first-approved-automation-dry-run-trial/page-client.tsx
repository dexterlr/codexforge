"use client";

import { FirstApprovedAutomationDryRunTrialPanel } from "@/lib/codexforge/first-approved-automation-dry-run-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstApprovedAutomationDryRunTrialPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-approved-automation-dry-run-trial"
      workspaceLabel="Automation Dry-Run Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstApprovedAutomationDryRunTrialPanel />
    </CodexForgeAppShell>
  );
}
