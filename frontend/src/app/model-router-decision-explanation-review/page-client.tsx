"use client";

import { ModelRouterDecisionExplanationReviewPanel } from "@/lib/codexforge/model-router-decision-explanation-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRouterDecisionExplanationReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-router-decision-explanation-review"
      workspaceLabel="Model Router Decision Explanation Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterDecisionExplanationReviewPanel />
    </CodexForgeAppShell>
  );
}

