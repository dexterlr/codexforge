"use client";

import { EndToEndControlledRolloutReviewPanel } from "@/lib/codexforge/end-to-end-controlled-rollout-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EndToEndControlledRolloutReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/end-to-end-controlled-rollout-review"
      workspaceLabel="E2E Rollout Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EndToEndControlledRolloutReviewPanel />
    </CodexForgeAppShell>
  );
}
