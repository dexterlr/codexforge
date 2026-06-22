"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TargetArtifactPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/target-artifact-preview"
      workspaceLabel="Target Artifact Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="target-artifact-preview" />
    </CodexForgeAppShell>
  );
}
