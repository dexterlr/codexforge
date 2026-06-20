"use client";

import { ProjectCommandPlanPreviewPanel } from "@/lib/codexforge/project-command-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectCommandPlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-command-plan-preview"
      workspaceLabel="Project Command Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectCommandPlanPreviewPanel />
    </CodexForgeAppShell>
  );
}
