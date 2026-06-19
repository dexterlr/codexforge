"use client";

import { ResultStoreBackendDryRunPacketPanel } from "@/lib/codexforge/result-store-backend-dry-run-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultStoreBackendDryRunPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/result-store-backend-dry-run-packet"
      workspaceLabel="Result Store Backend Dry-Run Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResultStoreBackendDryRunPacketPanel />
    </CodexForgeAppShell>
  );
}
