"use client";

import { LiveWorkflowRegressionMatrixPanel } from "@/lib/codexforge/live-workflow-regression-matrix/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/live-workflow-regression-matrix"
      workspaceLabel="Live Regression Matrix"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LiveWorkflowRegressionMatrixPanel />
    </CodexForgeAppShell>
  );
}
