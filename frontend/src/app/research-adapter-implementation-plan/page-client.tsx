"use client";

import { ResearchAdapterImplementationPlanPanel } from "@/lib/codexforge/research-adapter-implementation-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchAdapterImplementationPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-adapter-implementation-plan"
      workspaceLabel="Research Adapter Implementation Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchAdapterImplementationPlanPanel />
    </CodexForgeAppShell>
  );
}
