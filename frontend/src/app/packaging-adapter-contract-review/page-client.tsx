"use client";

import { PackagingAdapterContractReviewPanel } from "@/lib/codexforge/packaging-adapter-contract-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PackagingAdapterContractReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/packaging-adapter-contract-review"
      workspaceLabel="Packaging Adapter Contract Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PackagingAdapterContractReviewPanel />
    </CodexForgeAppShell>
  );
}
