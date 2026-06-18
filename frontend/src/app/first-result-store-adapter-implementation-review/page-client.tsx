"use client";

import { FirstResultStoreAdapterImplementationReviewPanel } from "@/lib/codexforge/first-result-store-adapter-implementation-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstResultStoreAdapterImplementationReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-result-store-adapter-implementation-review"
      workspaceLabel="First Result Store Adapter Implementation Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstResultStoreAdapterImplementationReviewPanel />
    </CodexForgeAppShell>
  );
}
