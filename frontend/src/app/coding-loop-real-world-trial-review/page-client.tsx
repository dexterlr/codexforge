"use client";

import { CodingLoopRealWorldTrialReviewPanel } from "@/lib/codexforge/coding-loop-real-world-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodingLoopRealWorldTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/coding-loop-real-world-trial-review"
      workspaceLabel="Coding Real Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodingLoopRealWorldTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
