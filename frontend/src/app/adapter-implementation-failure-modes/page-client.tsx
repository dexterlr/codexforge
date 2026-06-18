"use client";

import { AdapterImplementationFailureModesPanel } from "@/lib/codexforge/adapter-implementation-failure-modes/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterImplementationFailureModesPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-implementation-failure-modes"
      workspaceLabel="Adapter Implementation Failure Modes"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterImplementationFailureModesPanel />
    </CodexForgeAppShell>
  );
}
