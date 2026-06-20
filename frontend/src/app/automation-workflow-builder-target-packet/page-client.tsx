"use client";

import { AutomationWorkflowBuilderTargetPacketPanel } from "@/lib/codexforge/automation-workflow-builder-target-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationWorkflowBuilderTargetPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-workflow-builder-target-packet"
      workspaceLabel="Automation Workflow Builder Target Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationWorkflowBuilderTargetPacketPanel />
    </CodexForgeAppShell>
  );
}
