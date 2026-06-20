"use client";

import { LocalModelBridgeEvidencePacketPanel } from "@/lib/codexforge/local-model-bridge-evidence-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelBridgeEvidencePacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-bridge-evidence-packet"
      workspaceLabel="Local Model Bridge Evidence Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeEvidencePacketPanel />
    </CodexForgeAppShell>
  );
}
