"use client";

import { EndToEndControlledRolloutPlanPanel } from "@/lib/codexforge/end-to-end-controlled-rollout-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EndToEndControlledRolloutPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/end-to-end-controlled-rollout-plan"
      workspaceLabel="E2E Rollout Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EndToEndControlledRolloutPlanPanel />
    </CodexForgeAppShell>
  );
}
