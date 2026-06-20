"use client";

import { ApprovedProviderTestPacketPanel } from "@/lib/codexforge/approved-provider-test-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApprovedProviderTestPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/approved-provider-test-packet"
      workspaceLabel="Approved Provider Test Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApprovedProviderTestPacketPanel />
    </CodexForgeAppShell>
  );
}
