"use client";

import { FirstRealDailyWorkflowCandidatePanel } from "@/lib/codexforge/first-real-daily-workflow-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-real-daily-workflow-candidate"
      workspaceLabel="Daily Workflow"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstRealDailyWorkflowCandidatePanel />
    </CodexForgeAppShell>
  );
}
