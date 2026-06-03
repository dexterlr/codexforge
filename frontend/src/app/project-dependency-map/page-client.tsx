"use client";

import { ProjectDependencyMapPanel } from "@/lib/codexforge/project-dependency-map/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectDependencyMapPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-dependency-map"
      workspaceLabel="Dependency Map"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectDependencyMapPanel />
    </CodexForgeAppShell>
  );
}
