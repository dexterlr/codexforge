"use client";

import { EvidenceStoreAdapterImplementationPlanPanel } from "@/lib/codexforge/evidence-store-adapter-implementation-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceStoreAdapterImplementationPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-store-adapter-implementation-plan"
      workspaceLabel="Evidence Store Adapter Implementation Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceStoreAdapterImplementationPlanPanel />
    </CodexForgeAppShell>
  );
}
