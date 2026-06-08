"use client";

import { ResearchSourceCollectorLiveTrialPanel } from "@/lib/codexforge/research-source-collector-live-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchSourceCollectorTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-source-collector-trial"
      workspaceLabel="Research Source Collector"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchSourceCollectorLiveTrialPanel />
    </CodexForgeAppShell>
  );
}
