"use client";

import { ProviderSafetyRegressionReviewPanel } from "@/lib/codexforge/provider-safety-regression-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderSafetyRegressionReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-safety-regression-review"
      workspaceLabel="Safety Regression"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderSafetyRegressionReviewPanel />
    </CodexForgeAppShell>
  );
}
