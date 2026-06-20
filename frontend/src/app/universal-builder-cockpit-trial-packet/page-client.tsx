"use client";

import { UniversalBuilderCockpitTrialPacketPanel } from "@/lib/codexforge/universal-builder-cockpit-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UniversalBuilderCockpitTrialPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/universal-builder-cockpit-trial-packet"
      workspaceLabel="Universal Builder Cockpit Trial Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UniversalBuilderCockpitTrialPacketPanel />
    </CodexForgeAppShell>
  );
}
