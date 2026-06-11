"use client";

import { ProviderCostRateLimitReviewPanel } from "@/lib/codexforge/provider-cost-rate-limit-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderCostRateLimitReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-cost-rate-limit-review"
      workspaceLabel="Cost Limits"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderCostRateLimitReviewPanel />
    </CodexForgeAppShell>
  );
}
