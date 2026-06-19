"use client";

import { AdapterExecutionSandboxPacketPanel } from "@/lib/codexforge/adapter-execution-sandbox-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterExecutionSandboxPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-execution-sandbox-packet"
      workspaceLabel="Adapter Execution Sandbox Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterExecutionSandboxPacketPanel />
    </CodexForgeAppShell>
  );
}
