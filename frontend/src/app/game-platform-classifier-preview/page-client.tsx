"use client";

import { GamePlatformClassifierPreviewPanel } from "@/lib/codexforge/game-platform-classifier-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GamePlatformClassifierPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-platform-classifier-preview"
      workspaceLabel="Game Platform Classifier Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GamePlatformClassifierPreviewPanel />
    </CodexForgeAppShell>
  );
}