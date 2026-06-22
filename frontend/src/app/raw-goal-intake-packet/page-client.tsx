"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RawGoalIntakePacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/raw-goal-intake-packet"
      workspaceLabel="Raw Goal Intake Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="raw-goal-intake-packet" />
    </CodexForgeAppShell>
  );
}
