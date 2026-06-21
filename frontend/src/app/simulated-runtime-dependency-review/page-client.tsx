"use client";

import { SimulatedRuntimeDependencyReviewPanel } from "@/lib/codexforge/simulated-runtime-dependency-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedRuntimeDependencyReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-runtime-dependency-review"
      workspaceLabel="Simulated Runtime Dependency Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedRuntimeDependencyReviewPanel />
    </CodexForgeAppShell>
  );
}
