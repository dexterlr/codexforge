"use client";

import { CreativeWorkflowBuilderTargetPacketPanel } from "@/lib/codexforge/creative-workflow-builder-target-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CreativeWorkflowBuilderTargetPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/creative-workflow-builder-target-packet"
      workspaceLabel="Creative Workflow Builder Target Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CreativeWorkflowBuilderTargetPacketPanel />
    </CodexForgeAppShell>
  );
}
