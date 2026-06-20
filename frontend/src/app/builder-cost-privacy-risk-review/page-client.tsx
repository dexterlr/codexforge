"use client";

import { BuilderCostPrivacyRiskReviewPanel } from "@/lib/codexforge/builder-cost-privacy-risk-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuilderCostPrivacyRiskReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/builder-cost-privacy-risk-review"
      workspaceLabel="Builder Cost Privacy Risk Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuilderCostPrivacyRiskReviewPanel />
    </CodexForgeAppShell>
  );
}
