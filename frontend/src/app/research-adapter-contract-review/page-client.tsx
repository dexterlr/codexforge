"use client";

import { ResearchAdapterContractReviewPanel } from "@/lib/codexforge/research-adapter-contract-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchAdapterContractReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-adapter-contract-review"
      workspaceLabel="Research Adapter Contract Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchAdapterContractReviewPanel />
    </CodexForgeAppShell>
  );
}
