"use client";

import { ResultStoreAdapterContractReviewPanel } from "@/lib/codexforge/result-store-adapter-contract-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultStoreAdapterContractReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/result-store-adapter-contract-review"
      workspaceLabel="Result Store Adapter Contract Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResultStoreAdapterContractReviewPanel />
    </CodexForgeAppShell>
  );
}
