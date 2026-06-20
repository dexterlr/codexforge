"use client";

import { ProModelProviderTrialPacketPanel } from "@/lib/codexforge/pro-model-provider-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProModelProviderTrialPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/pro-model-provider-trial-packet"
      workspaceLabel="Pro Model Provider Trial Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProModelProviderTrialPacketPanel />
    </CodexForgeAppShell>
  );
}
