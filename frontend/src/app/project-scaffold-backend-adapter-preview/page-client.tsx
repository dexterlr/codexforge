"use client";

import { ProjectScaffoldBackendAdapterPreviewPanel } from "@/lib/codexforge/project-scaffold-backend-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectScaffoldBackendAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-scaffold-backend-adapter-preview"
      workspaceLabel="Project Scaffold Backend Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectScaffoldBackendAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
