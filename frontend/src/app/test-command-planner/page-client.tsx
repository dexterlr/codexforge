"use client";

import { TestCommandPlannerPanel } from "@/lib/codexforge/test-command-planner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TestCommandPlannerPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/test-command-planner"
      workspaceLabel="Test Planner"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TestCommandPlannerPanel />
    </CodexForgeAppShell>
  );
}
