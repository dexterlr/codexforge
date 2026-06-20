"use client";

import { GameEvidenceCapturePlanPanel } from "@/lib/codexforge/game-evidence-capture-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameEvidenceCapturePlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-evidence-capture-plan"
      workspaceLabel="Game Evidence Capture Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameEvidenceCapturePlanPanel />
    </CodexForgeAppShell>
  );
}