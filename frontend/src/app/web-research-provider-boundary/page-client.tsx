"use client";

import { WebResearchProviderBoundaryPanel } from "@/lib/codexforge/web-research-provider-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function WebResearchProviderBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/web-research-provider-boundary"
      workspaceLabel="Web Research Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <WebResearchProviderBoundaryPanel />
    </CodexForgeAppShell>
  );
}
