"use client";

import { ProjectBuilderMvpIntegrationBoundaryPanel } from "@/lib/codexforge/project-builder-mvp-integration-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectBuilderMvpIntegrationBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-builder-mvp-integration-boundary"
      workspaceLabel="Project Builder MVP Integration Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectBuilderMvpIntegrationBoundaryPanel />
    </CodexForgeAppShell>
  );
}
