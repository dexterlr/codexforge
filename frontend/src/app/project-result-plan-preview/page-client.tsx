"use client";

import { ProjectResultPlanPreviewPanel } from "@/lib/codexforge/project-result-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectResultPlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-result-plan-preview"
      workspaceLabel="Project Result Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectResultPlanPreviewPanel />
    </CodexForgeAppShell>
  );
}
