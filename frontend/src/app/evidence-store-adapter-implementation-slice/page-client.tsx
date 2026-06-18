"use client";

import { EvidenceStoreAdapterImplementationSlicePanel } from "@/lib/codexforge/evidence-store-adapter-implementation-slice/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceStoreAdapterImplementationSlicePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-store-adapter-implementation-slice"
      workspaceLabel="Evidence Store Adapter Implementation Slice"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceStoreAdapterImplementationSlicePanel />
    </CodexForgeAppShell>
  );
}
