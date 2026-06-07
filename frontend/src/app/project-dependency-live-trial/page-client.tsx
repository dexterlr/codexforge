"use client";

import { ProjectDependencyMapLiveTrialPanel } from "@/lib/codexforge/project-dependency-map-live-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectDependencyLiveTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-dependency-live-trial"
      workspaceLabel="Dependency Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectDependencyMapLiveTrialPanel />
    </CodexForgeAppShell>
  );
}
