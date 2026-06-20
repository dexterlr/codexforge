"use client";

import { SpecialistModelProviderTrialPacketPanel } from "@/lib/codexforge/specialist-model-provider-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistModelProviderTrialPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-model-provider-trial-packet"
      workspaceLabel="Specialist Model Provider Trial Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistModelProviderTrialPacketPanel />
    </CodexForgeAppShell>
  );
}
