"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function MinecraftServerProfilePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/minecraft-server-profile-preview"
      workspaceLabel="Minecraft Server Profile Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="minecraft-server-profile-preview" />
    </CodexForgeAppShell>
  );
}
