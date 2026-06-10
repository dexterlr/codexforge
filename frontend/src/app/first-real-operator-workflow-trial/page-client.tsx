"use client";

import { FirstRealOperatorWorkflowTrialPanel } from "@/lib/codexforge/first-real-operator-workflow-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstRealOperatorWorkflowTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-real-operator-workflow-trial"
      workspaceLabel="Real Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstRealOperatorWorkflowTrialPanel />
    </CodexForgeAppShell>
  );
}
