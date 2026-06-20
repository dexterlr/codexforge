"use client";

import { FreeModelProviderTrialPacketPanel } from "@/lib/codexforge/free-model-provider-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FreeModelProviderTrialPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/free-model-provider-trial-packet"
      workspaceLabel="Free Model Provider Trial Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FreeModelProviderTrialPacketPanel />
    </CodexForgeAppShell>
  );
}
