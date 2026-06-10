"use client";

import { ConnectorLoopRealWorldTrialReviewPanel } from "@/lib/codexforge/connector-loop-real-world-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorLoopRealWorldTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-loop-real-world-trial-review"
      workspaceLabel="Connector Real Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorLoopRealWorldTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
