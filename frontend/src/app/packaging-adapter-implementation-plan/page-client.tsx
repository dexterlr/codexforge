"use client";

import { PackagingAdapterImplementationPlanPanel } from "@/lib/codexforge/packaging-adapter-implementation-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PackagingAdapterImplementationPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/packaging-adapter-implementation-plan"
      workspaceLabel="Packaging Adapter Implementation Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PackagingAdapterImplementationPlanPanel />
    </CodexForgeAppShell>
  );
}
