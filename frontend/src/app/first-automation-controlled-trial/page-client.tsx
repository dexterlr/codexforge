"use client";

import { FirstAutomationControlledTrialPanel } from "@/lib/codexforge/first-automation-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstAutomationControlledTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-automation-controlled-trial"
      workspaceLabel="First Automation Controlled Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstAutomationControlledTrialPanel />
    </CodexForgeAppShell>
  );
}
