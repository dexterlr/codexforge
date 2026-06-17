"use client";

import { EvidenceStoreAdapterContractReviewPanel } from "@/lib/codexforge/evidence-store-adapter-contract-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceStoreAdapterContractReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-store-adapter-contract-review"
      workspaceLabel="Evidence Store Adapter Contract Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceStoreAdapterContractReviewPanel />
    </CodexForgeAppShell>
  );
}
