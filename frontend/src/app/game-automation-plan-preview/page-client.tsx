"use client";

import { GameAutomationPlanPreviewPanel } from "@/lib/codexforge/game-automation-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameAutomationPlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-automation-plan-preview"
      workspaceLabel="Game Automation Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameAutomationPlanPreviewPanel />
    </CodexForgeAppShell>
  );
}