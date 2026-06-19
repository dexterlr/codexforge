"use client";

import { EvidenceStoreBackendDryRunPacketPanel } from "@/lib/codexforge/evidence-store-backend-dry-run-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceStoreBackendDryRunPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-store-backend-dry-run-packet"
      workspaceLabel="Evidence Store Backend Dry-Run Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceStoreBackendDryRunPacketPanel />
    </CodexForgeAppShell>
  );
}
