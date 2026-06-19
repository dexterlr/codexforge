"use client";

import { FirstControlledModelUseTrialPacketPanel } from "@/lib/codexforge/first-controlled-model-use-trial-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstControlledModelUseTrialPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-controlled-model-use-trial-packet"
      workspaceLabel="First Controlled Model-Use Trial Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstControlledModelUseTrialPacketPanel />
    </CodexForgeAppShell>
  );
}
