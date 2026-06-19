"use client";

import { RealFileWriteAdapterWiringPlanPanel } from "@/lib/codexforge/real-file-write-adapter-wiring-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealFileWriteAdapterWiringPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-file-write-adapter-wiring-plan"
      workspaceLabel="Real File Write Adapter Wiring Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealFileWriteAdapterWiringPlanPanel />
    </CodexForgeAppShell>
  );
}
