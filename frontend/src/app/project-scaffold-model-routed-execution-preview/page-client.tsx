"use client";

import { ProjectScaffoldModelRoutedExecutionPreviewPanel } from "@/lib/codexforge/project-scaffold-model-routed-execution-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectScaffoldModelRoutedExecutionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-scaffold-model-routed-execution-preview"
      workspaceLabel="Project Scaffold Model-Routed Execution Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectScaffoldModelRoutedExecutionPreviewPanel />
    </CodexForgeAppShell>
  );
}
