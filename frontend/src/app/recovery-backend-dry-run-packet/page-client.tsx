"use client";

import { RecoveryBackendDryRunPacketPanel } from "@/lib/codexforge/recovery-backend-dry-run-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RecoveryBackendDryRunPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/recovery-backend-dry-run-packet"
      workspaceLabel="Recovery Backend Dry-Run Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RecoveryBackendDryRunPacketPanel />
    </CodexForgeAppShell>
  );
}
