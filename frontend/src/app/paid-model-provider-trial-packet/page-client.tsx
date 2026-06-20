"use client";

import { PaidModelProviderTrialPacketPanel } from "@/lib/codexforge/paid-model-provider-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PaidModelProviderTrialPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/paid-model-provider-trial-packet"
      workspaceLabel="Paid Model Provider Trial Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PaidModelProviderTrialPacketPanel />
    </CodexForgeAppShell>
  );
}
