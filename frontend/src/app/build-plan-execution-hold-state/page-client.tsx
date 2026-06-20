"use client";

import { BuildPlanExecutionHoldStatePanel } from "@/lib/codexforge/build-plan-execution-hold-state/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanExecutionHoldStatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-execution-hold-state"
      workspaceLabel="Build Plan Execution Hold State"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanExecutionHoldStatePanel />
    </CodexForgeAppShell>
  );
}
