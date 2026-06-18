"use client";

import { FirstEvidenceStoreAdapterImplementationReviewPanel } from "@/lib/codexforge/first-evidence-store-adapter-implementation-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstEvidenceStoreAdapterImplementationReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-evidence-store-adapter-implementation-review"
      workspaceLabel="First Evidence Store Adapter Implementation Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstEvidenceStoreAdapterImplementationReviewPanel />
    </CodexForgeAppShell>
  );
}
