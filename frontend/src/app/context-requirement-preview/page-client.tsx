"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ContextRequirementPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/context-requirement-preview"
      workspaceLabel="Context Requirement Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="context-requirement-preview" />
    </CodexForgeAppShell>
  );
}
