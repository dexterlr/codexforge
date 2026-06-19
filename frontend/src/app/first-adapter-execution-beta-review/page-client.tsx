"use client";

import { FirstAdapterExecutionBetaReviewPanel } from "@/lib/codexforge/first-adapter-execution-beta-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstAdapterExecutionBetaReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-adapter-execution-beta-review"
      workspaceLabel="First Adapter Execution Beta Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstAdapterExecutionBetaReviewPanel />
    </CodexForgeAppShell>
  );
}
