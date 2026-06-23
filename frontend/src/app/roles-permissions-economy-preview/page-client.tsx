"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RolesPermissionsEconomyPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/roles-permissions-economy-preview"
      workspaceLabel="Roles Permissions Economy Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="roles-permissions-economy-preview" />
    </CodexForgeAppShell>
  );
}
