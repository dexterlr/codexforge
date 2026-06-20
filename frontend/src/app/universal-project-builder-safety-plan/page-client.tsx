"use client";

import { UniversalProjectBuilderSafetyPlanPanel } from "@/lib/codexforge/universal-project-builder-safety-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UniversalProjectBuilderSafetyPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/universal-project-builder-safety-plan"
      workspaceLabel="Universal Project Builder Safety Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UniversalProjectBuilderSafetyPlanPanel />
    </CodexForgeAppShell>
  );
}
