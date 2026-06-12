"use client";

import { FirstControlledLiveWorkflowTrialPanel } from "@/lib/codexforge/first-controlled-live-workflow-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstControlledLiveWorkflowTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-controlled-live-workflow-trial"
      workspaceLabel="Controlled Live Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstControlledLiveWorkflowTrialPanel />
    </CodexForgeAppShell>
  );
}
