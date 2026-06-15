"use client";

import { TestExecutionBoundaryReadinessReviewPanel } from "@/lib/codexforge/test-execution-boundary-readiness-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TestExecutionBoundaryReadinessReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/test-execution-boundary-readiness-review"
      workspaceLabel="Test Execution Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TestExecutionBoundaryReadinessReviewPanel />
    </CodexForgeAppShell>
  );
}
