"use client";

import { ProjectIndexerLiveTrialPanel } from "@/lib/codexforge/project-indexer-live-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectIndexerLiveTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-indexer-live-trial"
      workspaceLabel="Indexer Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectIndexerLiveTrialPanel />
    </CodexForgeAppShell>
  );
}
