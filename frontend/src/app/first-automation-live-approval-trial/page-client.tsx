"use client";

import { FirstAutomationLiveApprovalTrialPanel } from "@/lib/codexforge/first-automation-live-approval-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstAutomationLiveApprovalTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-automation-live-approval-trial"
      workspaceLabel="Automation Live Approval"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstAutomationLiveApprovalTrialPanel />
    </CodexForgeAppShell>
  );
}
