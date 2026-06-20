"use client";

import { GameTargetIntakePacketPanel } from "@/lib/codexforge/game-target-intake-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameTargetIntakePacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-target-intake-packet"
      workspaceLabel="Game Target Intake Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameTargetIntakePacketPanel />
    </CodexForgeAppShell>
  );
}