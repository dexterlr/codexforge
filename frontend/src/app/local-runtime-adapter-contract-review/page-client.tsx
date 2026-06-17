"use client";

import { LocalRuntimeAdapterContractReviewPanel } from "@/lib/codexforge/local-runtime-adapter-contract-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalRuntimeAdapterContractReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-runtime-adapter-contract-review"
      workspaceLabel="Local Runtime Adapter Contract Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalRuntimeAdapterContractReviewPanel />
    </CodexForgeAppShell>
  );
}
