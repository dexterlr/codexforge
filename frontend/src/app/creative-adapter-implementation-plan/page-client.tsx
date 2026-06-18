"use client";

import { CreativeAdapterImplementationPlanPanel } from "@/lib/codexforge/creative-adapter-implementation-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CreativeAdapterImplementationPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/creative-adapter-implementation-plan"
      workspaceLabel="Creative Adapter Implementation Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CreativeAdapterImplementationPlanPanel />
    </CodexForgeAppShell>
  );
}
