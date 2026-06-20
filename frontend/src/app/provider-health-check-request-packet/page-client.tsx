"use client";

import { ProviderHealthCheckRequestPacketPanel } from "@/lib/codexforge/provider-health-check-request-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderHealthCheckRequestPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-health-check-request-packet"
      workspaceLabel="Provider Health Check Request Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderHealthCheckRequestPacketPanel />
    </CodexForgeAppShell>
  );
}
