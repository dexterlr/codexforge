"use client";

import { ResearchPackBuilderTargetPacketPanel } from "@/lib/codexforge/research-pack-builder-target-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchPackBuilderTargetPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-pack-builder-target-packet"
      workspaceLabel="Research Pack Builder Target Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchPackBuilderTargetPacketPanel />
    </CodexForgeAppShell>
  );
}
