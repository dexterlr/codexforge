"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DoneCriteriaPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/done-criteria-preview"
      workspaceLabel="Done Criteria Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="done-criteria-preview" />
    </CodexForgeAppShell>
  );
}
