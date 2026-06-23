"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstGameServerBuilderCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-game-server-builder-candidate"
      workspaceLabel="First Game Server Builder Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="first-game-server-builder-candidate" />
    </CodexForgeAppShell>
  );
}
