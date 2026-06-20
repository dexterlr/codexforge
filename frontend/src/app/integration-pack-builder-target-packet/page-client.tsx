"use client";

import { IntegrationPackBuilderTargetPacketPanel } from "@/lib/codexforge/integration-pack-builder-target-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function IntegrationPackBuilderTargetPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/integration-pack-builder-target-packet"
      workspaceLabel="Integration Pack Builder Target Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <IntegrationPackBuilderTargetPacketPanel />
    </CodexForgeAppShell>
  );
}
