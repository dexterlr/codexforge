"use client";

import { ProjectPlanModelRoutingPreviewPanel } from "@/lib/codexforge/project-plan-model-routing-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectPlanModelRoutingPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-plan-model-routing-preview"
      workspaceLabel="Project Plan Model-Routing Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectPlanModelRoutingPreviewPanel />
    </CodexForgeAppShell>
  );
}
