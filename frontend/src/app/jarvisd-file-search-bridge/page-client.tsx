"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdSafeFileSearchBridgePanel } from "@/lib/codexforge/jarvisd-safe-file-search-bridge/components";

export default function JarvisdFileSearchBridgePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-file-search-bridge"
      workspaceLabel="Jarvisd File Search"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdSafeFileSearchBridgePanel />
    </CodexForgeAppShell>
  );
}
