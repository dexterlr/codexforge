"use client";

import { ProjectSearchLiveTrialPanel } from "@/lib/codexforge/project-search-live-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectSearchLiveTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-search-live-trial"
      workspaceLabel="Search Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectSearchLiveTrialPanel />
    </CodexForgeAppShell>
  );
}
