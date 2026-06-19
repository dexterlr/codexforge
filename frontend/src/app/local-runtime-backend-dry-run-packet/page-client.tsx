"use client";

import { LocalRuntimeBackendDryRunPacketPanel } from "@/lib/codexforge/local-runtime-backend-dry-run-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalRuntimeBackendDryRunPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-runtime-backend-dry-run-packet"
      workspaceLabel="Local Runtime Backend Dry-Run Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalRuntimeBackendDryRunPacketPanel />
    </CodexForgeAppShell>
  );
}
