"use client";

import { CreativeAdapterContractReviewPanel } from "@/lib/codexforge/creative-adapter-contract-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CreativeAdapterContractReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/creative-adapter-contract-review"
      workspaceLabel="Creative Adapter Contract Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CreativeAdapterContractReviewPanel />
    </CodexForgeAppShell>
  );
}
