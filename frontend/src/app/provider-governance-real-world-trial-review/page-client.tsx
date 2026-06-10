"use client";

import { ProviderGovernanceRealWorldTrialReviewPanel } from "@/lib/codexforge/provider-governance-real-world-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderGovernanceRealWorldTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-governance-real-world-trial-review"
      workspaceLabel="Provider Real Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderGovernanceRealWorldTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
