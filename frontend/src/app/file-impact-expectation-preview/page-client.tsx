"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileImpactExpectationPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-impact-expectation-preview"
      workspaceLabel="File Impact Expectation Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="file-impact-expectation-preview" />
    </CodexForgeAppShell>
  );
}
