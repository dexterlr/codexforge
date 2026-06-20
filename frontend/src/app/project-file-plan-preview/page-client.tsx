"use client";

import { ProjectFilePlanPreviewPanel } from "@/lib/codexforge/project-file-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectFilePlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-file-plan-preview"
      workspaceLabel="Project File Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectFilePlanPreviewPanel />
    </CodexForgeAppShell>
  );
}
