"use client";

import { ResultStoreAdapterImplementationPlanPanel } from "@/lib/codexforge/result-store-adapter-implementation-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultStoreAdapterImplementationPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/result-store-adapter-implementation-plan"
      workspaceLabel="Result Store Adapter Implementation Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResultStoreAdapterImplementationPlanPanel />
    </CodexForgeAppShell>
  );
}
