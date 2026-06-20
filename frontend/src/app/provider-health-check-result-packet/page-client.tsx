"use client";

import { ProviderHealthCheckResultPacketPanel } from "@/lib/codexforge/provider-health-check-result-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderHealthCheckResultPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-health-check-result-packet"
      workspaceLabel="Provider Health Check Result Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderHealthCheckResultPacketPanel />
    </CodexForgeAppShell>
  );
}
