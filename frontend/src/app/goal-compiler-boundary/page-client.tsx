"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GoalCompilerBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/goal-compiler-boundary"
      workspaceLabel="Goal Compiler Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="goal-compiler-boundary" />
    </CodexForgeAppShell>
  );
}
