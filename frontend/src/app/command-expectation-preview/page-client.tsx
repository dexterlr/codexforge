"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandExpectationPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-expectation-preview"
      workspaceLabel="Command Expectation Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="command-expectation-preview" />
    </CodexForgeAppShell>
  );
}
