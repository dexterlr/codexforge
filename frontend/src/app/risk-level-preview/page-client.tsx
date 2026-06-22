"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RiskLevelPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/risk-level-preview"
      workspaceLabel="Risk Level Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="risk-level-preview" />
    </CodexForgeAppShell>
  );
}
