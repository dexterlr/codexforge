"use client";

import { ResearchLoopRealWorldTrialReviewPanel } from "@/lib/codexforge/research-loop-real-world-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchLoopRealWorldTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-loop-real-world-trial-review"
      workspaceLabel="Research Real Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchLoopRealWorldTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
