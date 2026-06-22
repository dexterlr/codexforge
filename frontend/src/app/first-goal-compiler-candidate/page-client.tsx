"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstGoalCompilerCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-goal-compiler-candidate"
      workspaceLabel="First Goal Compiler Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="first-goal-compiler-candidate" />
    </CodexForgeAppShell>
  );
}
