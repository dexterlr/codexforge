"use client";

import { LocalModelBridgeContextPacketPanel } from "@/lib/codexforge/local-model-bridge-context-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelBridgeContextPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-bridge-context-packet"
      workspaceLabel="Local Model Bridge Context Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeContextPacketPanel />
    </CodexForgeAppShell>
  );
}
