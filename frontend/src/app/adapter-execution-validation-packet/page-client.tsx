"use client";

import { AdapterExecutionValidationPacketPanel } from "@/lib/codexforge/adapter-execution-validation-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterExecutionValidationPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-execution-validation-packet"
      workspaceLabel="Adapter Execution Validation Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterExecutionValidationPacketPanel />
    </CodexForgeAppShell>
  );
}
