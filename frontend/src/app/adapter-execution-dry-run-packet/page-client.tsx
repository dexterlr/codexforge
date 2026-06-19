"use client";

import { AdapterExecutionDryRunPacketPanel } from "@/lib/codexforge/adapter-execution-dry-run-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterExecutionDryRunPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-execution-dry-run-packet"
      workspaceLabel="Adapter Execution Dry-Run Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterExecutionDryRunPacketPanel />
    </CodexForgeAppShell>
  );
}
