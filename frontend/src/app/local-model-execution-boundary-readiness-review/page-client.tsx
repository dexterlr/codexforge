"use client";

import { LocalModelExecutionBoundaryReadinessReviewPanel } from "@/lib/codexforge/local-model-execution-boundary-readiness-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelExecutionBoundaryReadinessReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-execution-boundary-readiness-review"
      workspaceLabel="Local Model Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelExecutionBoundaryReadinessReviewPanel />
    </CodexForgeAppShell>
  );
}
