"use client";

import { BuildAnythingGoalComposerPanel } from "@/lib/codexforge/build-anything-goal-composer/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildAnythingGoalComposerPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-anything-goal-composer"
      workspaceLabel="Build Anything Goal Composer"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildAnythingGoalComposerPanel />
    </CodexForgeAppShell>
  );
}
