"use client";

import { GuidedBuildGoalReviewPanel } from "@/lib/codexforge/guided-build-goal-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedBuildGoalReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guided-build-goal-review"
      workspaceLabel="Guided Build Goal Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuidedBuildGoalReviewPanel />
    </CodexForgeAppShell>
  );
}

