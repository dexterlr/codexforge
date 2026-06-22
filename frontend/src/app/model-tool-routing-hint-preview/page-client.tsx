"use client";

import { GoalCompilerRoutePanel } from "@/lib/codexforge/goal-compiler/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelToolRoutingHintPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-tool-routing-hint-preview"
      workspaceLabel="Model Tool Routing Hint Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GoalCompilerRoutePanel routeSlug="model-tool-routing-hint-preview" />
    </CodexForgeAppShell>
  );
}
