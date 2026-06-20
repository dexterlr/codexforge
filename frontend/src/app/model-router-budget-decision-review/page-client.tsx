"use client";

import { ModelRouterBudgetDecisionReviewPanel } from "@/lib/codexforge/model-router-budget-decision-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRouterBudgetDecisionReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-router-budget-decision-review"
      workspaceLabel="Model Router Budget Decision Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterBudgetDecisionReviewPanel />
    </CodexForgeAppShell>
  );
}
