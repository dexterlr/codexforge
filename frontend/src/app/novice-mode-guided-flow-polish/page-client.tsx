"use client";

import { NoviceModeGuidedFlowPolishPanel } from "@/lib/codexforge/novice-mode-guided-flow-polish/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function NoviceModeGuidedFlowPolishPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/novice-mode-guided-flow-polish"
      workspaceLabel="Novice Mode"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <NoviceModeGuidedFlowPolishPanel />
    </CodexForgeAppShell>
  );
}
