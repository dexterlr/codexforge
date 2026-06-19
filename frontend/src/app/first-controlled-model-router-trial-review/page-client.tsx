"use client";

import { FirstControlledModelRouterTrialReviewPanel } from "@/lib/codexforge/first-controlled-model-router-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstControlledModelRouterTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-controlled-model-router-trial-review"
      workspaceLabel="First Controlled Model Router Trial Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstControlledModelRouterTrialReviewPanel />
    </CodexForgeAppShell>
  );
}

