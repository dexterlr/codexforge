"use client";

import { DocumentationPackBuilderTargetPacketPanel } from "@/lib/codexforge/documentation-pack-builder-target-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DocumentationPackBuilderTargetPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/documentation-pack-builder-target-packet"
      workspaceLabel="Documentation Pack Builder Target Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DocumentationPackBuilderTargetPacketPanel />
    </CodexForgeAppShell>
  );
}
