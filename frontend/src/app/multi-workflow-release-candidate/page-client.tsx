"use client";

import { MultiWorkflowReleaseCandidatePanel } from "@/lib/codexforge/multi-workflow-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function MultiWorkflowReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/multi-workflow-release-candidate"
      workspaceLabel="Multi-Workflow RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <MultiWorkflowReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
