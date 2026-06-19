"use client";

import { ModelContextSyncPacketPanel } from "@/lib/codexforge/model-context-sync-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelContextSyncPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-context-sync-packet"
      workspaceLabel="Model Context Sync Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelContextSyncPacketPanel />
    </CodexForgeAppShell>
  );
}
