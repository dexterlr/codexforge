"use client";

import { ModelRoutedExecutionAuditPacketPanel } from "@/lib/codexforge/model-routed-execution-audit-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRoutedExecutionAuditPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-routed-execution-audit-packet"
      workspaceLabel="Model-Routed Execution Audit Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRoutedExecutionAuditPacketPanel />
    </CodexForgeAppShell>
  );
}
