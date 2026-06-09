"use client";

import { CrossLoopResultHandoffReviewPanel } from "@/lib/codexforge/cross-loop-result-handoff-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CrossLoopResultHandoffReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cross-loop-result-handoff-review"
      workspaceLabel="Loop Handoff"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CrossLoopResultHandoffReviewPanel />
    </CodexForgeAppShell>
  );
}
