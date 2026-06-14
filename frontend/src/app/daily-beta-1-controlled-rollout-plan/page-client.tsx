"use client";

import { DailyBetaOneControlledRolloutPlanPanel } from "@/lib/codexforge/daily-beta-1-controlled-rollout-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneControlledRolloutPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-controlled-rollout-plan"
      workspaceLabel="Daily Beta 1 Rollout Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneControlledRolloutPlanPanel />
    </CodexForgeAppShell>
  );
}
