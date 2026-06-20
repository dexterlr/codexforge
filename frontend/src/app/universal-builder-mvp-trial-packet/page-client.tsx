"use client";

import { UniversalBuilderMvpTrialPacketPanel } from "@/lib/codexforge/universal-builder-mvp-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UniversalBuilderMvpTrialPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/universal-builder-mvp-trial-packet"
      workspaceLabel="Universal Builder MVP Trial Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UniversalBuilderMvpTrialPacketPanel />
    </CodexForgeAppShell>
  );
}
