"use client";

import { ProjectPackagingPlanPreviewPanel } from "@/lib/codexforge/project-packaging-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectPackagingPlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-packaging-plan-preview"
      workspaceLabel="Project Packaging Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectPackagingPlanPreviewPanel />
    </CodexForgeAppShell>
  );
}
