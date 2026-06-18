"use client";

import { FirstGameServerAdapterMvpDesignPanel } from "@/lib/codexforge/first-game-server-adapter-mvp-design/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstGameServerAdapterMvpDesignPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-game-server-adapter-mvp-design"
      workspaceLabel="First Game Server Adapter MVP Design"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstGameServerAdapterMvpDesignPanel />
    </CodexForgeAppShell>
  );
}
