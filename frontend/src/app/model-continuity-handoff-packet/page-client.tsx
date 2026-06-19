"use client";

import { ModelContinuityHandoffPacketPanel } from "@/lib/codexforge/model-continuity-handoff-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelContinuityHandoffPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-continuity-handoff-packet"
      workspaceLabel="Model Continuity Handoff Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelContinuityHandoffPacketPanel />
    </CodexForgeAppShell>
  );
}
