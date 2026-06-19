"use client";

import { BackendAdapterDryRunPacketInventoryPanel } from "@/lib/codexforge/backend-adapter-dry-run-packet-inventory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendAdapterDryRunPacketInventoryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-adapter-dry-run-packet-inventory"
      workspaceLabel="Backend Adapter Dry-Run Packet Inventory"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendAdapterDryRunPacketInventoryPanel />
    </CodexForgeAppShell>
  );
}
