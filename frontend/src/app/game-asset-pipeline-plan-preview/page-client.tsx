"use client";

import { GameAssetPipelinePlanPreviewPanel } from "@/lib/codexforge/game-asset-pipeline-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameAssetPipelinePlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-asset-pipeline-plan-preview"
      workspaceLabel="Game Asset Pipeline Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameAssetPipelinePlanPreviewPanel />
    </CodexForgeAppShell>
  );
}