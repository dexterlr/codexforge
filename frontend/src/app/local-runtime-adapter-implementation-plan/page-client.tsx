"use client";

import { LocalRuntimeAdapterImplementationPlanPanel } from "@/lib/codexforge/local-runtime-adapter-implementation-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalRuntimeAdapterImplementationPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-runtime-adapter-implementation-plan"
      workspaceLabel="Local Runtime Adapter Implementation Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalRuntimeAdapterImplementationPlanPanel />
    </CodexForgeAppShell>
  );
}
