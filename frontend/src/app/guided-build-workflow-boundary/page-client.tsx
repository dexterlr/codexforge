"use client";

import { GuidedBuildWorkflowBoundaryPanel } from "@/lib/codexforge/guided-build-workflow-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedBuildWorkflowBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guided-build-workflow-boundary"
      workspaceLabel="Guided Build Workflow Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuidedBuildWorkflowBoundaryPanel />
    </CodexForgeAppShell>
  );
}

