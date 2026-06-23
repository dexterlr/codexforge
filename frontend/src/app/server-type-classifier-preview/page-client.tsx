"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ServerTypeClassifierPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/server-type-classifier-preview"
      workspaceLabel="Server Type Classifier Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="server-type-classifier-preview" />
    </CodexForgeAppShell>
  );
}
