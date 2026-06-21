"use client";

import { DryRunExecutionOperatorReviewPanel } from "@/lib/codexforge/dry-run-execution-operator-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunExecutionOperatorReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-execution-operator-review"
      workspaceLabel="Dry-Run Execution Operator Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DryRunExecutionOperatorReviewPanel />
    </CodexForgeAppShell>
  );
}
