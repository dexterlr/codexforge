"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TaskTypeClassifierPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/task-type-classifier-preview"
      workspaceLabel="Task Type Classifier Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="task-type-classifier-preview" />
    </CodexForgeAppShell>
  );
}
