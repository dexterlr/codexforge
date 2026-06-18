"use client";

import { GameServerAdapterPreviewPanel } from "@/lib/codexforge/game-server-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameServerAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-server-adapter-preview"
      workspaceLabel="Game Server Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
