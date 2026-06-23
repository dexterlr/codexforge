"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledGameServerBuilderReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-game-server-builder-release-candidate"
      workspaceLabel="Controlled Game Server Builder Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="controlled-game-server-builder-release-candidate" />
    </CodexForgeAppShell>
  );
}
