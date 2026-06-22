"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledGoalCompilerReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-goal-compiler-release-candidate"
      workspaceLabel="Controlled Goal Compiler Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="controlled-goal-compiler-release-candidate" />
    </CodexForgeAppShell>
  );
}
