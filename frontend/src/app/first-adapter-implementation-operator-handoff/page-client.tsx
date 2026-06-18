"use client";

import { FirstAdapterImplementationOperatorHandoffPanel } from "@/lib/codexforge/first-adapter-implementation-operator-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstAdapterImplementationOperatorHandoffPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-adapter-implementation-operator-handoff"
      workspaceLabel="First Adapter Implementation Operator Handoff"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstAdapterImplementationOperatorHandoffPanel />
    </CodexForgeAppShell>
  );
}
