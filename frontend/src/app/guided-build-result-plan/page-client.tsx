"use client";

import { GuidedBuildResultPlanPanel } from "@/lib/codexforge/guided-build-result-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedBuildResultPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guided-build-result-plan"
      workspaceLabel="Guided Build Result Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuidedBuildResultPlanPanel />
    </CodexForgeAppShell>
  );
}

