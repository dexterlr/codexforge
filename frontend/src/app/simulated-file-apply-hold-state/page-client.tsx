"use client";

import { SimulatedFileApplyHoldStatePanel } from "@/lib/codexforge/simulated-file-apply-hold-state/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedFileApplyHoldStatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-file-apply-hold-state"
      workspaceLabel="Simulated File Apply Hold State"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedFileApplyHoldStatePanel />
    </CodexForgeAppShell>
  );
}
