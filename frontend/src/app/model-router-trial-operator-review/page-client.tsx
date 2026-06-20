"use client";

import { ModelRouterTrialOperatorReviewPanel } from "@/lib/codexforge/model-router-trial-operator-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRouterTrialOperatorReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-router-trial-operator-review"
      workspaceLabel="Model Router Trial Operator Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterTrialOperatorReviewPanel />
    </CodexForgeAppShell>
  );
}
