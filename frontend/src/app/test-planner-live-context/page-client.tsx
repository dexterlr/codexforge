"use client";

import { TestPlannerLiveContextIntegrationPanel } from "@/lib/codexforge/test-planner-live-context-integration/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TestPlannerLiveContextPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/test-planner-live-context"
      workspaceLabel="Test Context"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TestPlannerLiveContextIntegrationPanel />
    </CodexForgeAppShell>
  );
}
