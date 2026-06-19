"use client";

import { FileWriteBackendDryRunPacketPanel } from "@/lib/codexforge/file-write-backend-dry-run-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteBackendDryRunPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-backend-dry-run-packet"
      workspaceLabel="File Write Backend Dry-Run Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteBackendDryRunPacketPanel />
    </CodexForgeAppShell>
  );
}
