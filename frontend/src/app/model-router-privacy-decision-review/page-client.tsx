"use client";

import { ModelRouterPrivacyDecisionReviewPanel } from "@/lib/codexforge/model-router-privacy-decision-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRouterPrivacyDecisionReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-router-privacy-decision-review"
      workspaceLabel="Model Router Privacy Decision Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterPrivacyDecisionReviewPanel />
    </CodexForgeAppShell>
  );
}
