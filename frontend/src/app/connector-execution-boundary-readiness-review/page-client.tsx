"use client";

import { ConnectorExecutionBoundaryReadinessReviewPanel } from "@/lib/codexforge/connector-execution-boundary-readiness-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorExecutionBoundaryReadinessReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-execution-boundary-readiness-review"
      workspaceLabel="Connector Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorExecutionBoundaryReadinessReviewPanel />
    </CodexForgeAppShell>
  );
}
