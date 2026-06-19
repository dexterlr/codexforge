"use client";

import { PackagingBackendDryRunPacketPanel } from "@/lib/codexforge/packaging-backend-dry-run-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PackagingBackendDryRunPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/packaging-backend-dry-run-packet"
      workspaceLabel="Packaging Backend Dry-Run Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PackagingBackendDryRunPacketPanel />
    </CodexForgeAppShell>
  );
}
