"use client";

import { BoundedAdapterImplementationReadinessPanel } from "@/lib/codexforge/bounded-adapter-implementation-readiness/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BoundedAdapterImplementationReadinessPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/bounded-adapter-implementation-readiness"
      workspaceLabel="Bounded Adapter Implementation Readiness"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BoundedAdapterImplementationReadinessPanel />
    </CodexForgeAppShell>
  );
}
