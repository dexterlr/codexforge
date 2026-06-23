"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ThemeLorePackPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/theme-lore-pack-preview"
      workspaceLabel="Theme Lore Pack Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="theme-lore-pack-preview" />
    </CodexForgeAppShell>
  );
}
