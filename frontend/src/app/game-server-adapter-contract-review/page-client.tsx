"use client";

import { GameServerAdapterContractReviewPanel } from "@/lib/codexforge/game-server-adapter-contract-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameServerAdapterContractReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-server-adapter-contract-review"
      workspaceLabel="Game Server Adapter Contract Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerAdapterContractReviewPanel />
    </CodexForgeAppShell>
  );
}
