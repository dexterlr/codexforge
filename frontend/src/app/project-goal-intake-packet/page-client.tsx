"use client";

import { ProjectGoalIntakePacketPanel } from "@/lib/codexforge/project-goal-intake-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectGoalIntakePacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-goal-intake-packet"
      workspaceLabel="Project Goal Intake Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectGoalIntakePacketPanel />
    </CodexForgeAppShell>
  );
}
