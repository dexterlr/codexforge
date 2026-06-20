"use client";

import { ProjectRuntimePlanPreviewPanel } from "@/lib/codexforge/project-runtime-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectRuntimePlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-runtime-plan-preview"
      workspaceLabel="Project Runtime Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectRuntimePlanPreviewPanel />
    </CodexForgeAppShell>
  );
}
