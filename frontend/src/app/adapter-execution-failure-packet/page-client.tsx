"use client";

import { AdapterExecutionFailurePacketPanel } from "@/lib/codexforge/adapter-execution-failure-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterExecutionFailurePacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-execution-failure-packet"
      workspaceLabel="Adapter Execution Failure Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterExecutionFailurePacketPanel />
    </CodexForgeAppShell>
  );
}
