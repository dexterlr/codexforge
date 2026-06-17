"use client";

import { ResearchWorkflowProfilePanel } from "@/lib/codexforge/research-workflow-profile/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchWorkflowProfilePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-workflow-profile"
      workspaceLabel="Research Workflow Profile"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchWorkflowProfilePanel />
    </CodexForgeAppShell>
  );
}
