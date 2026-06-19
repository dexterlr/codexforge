"use client";

import { AdapterExecutionAuditPacketPanel } from "@/lib/codexforge/adapter-execution-audit-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterExecutionAuditPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-execution-audit-packet"
      workspaceLabel="Adapter Execution Audit Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterExecutionAuditPacketPanel />
    </CodexForgeAppShell>
  );
}
