"use client";

import { BuilderOperatorDecisionPacketPanel } from "@/lib/codexforge/builder-operator-decision-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuilderOperatorDecisionPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/builder-operator-decision-packet"
      workspaceLabel="Builder Operator Decision Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuilderOperatorDecisionPacketPanel />
    </CodexForgeAppShell>
  );
}
