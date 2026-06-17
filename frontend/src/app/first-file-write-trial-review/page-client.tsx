"use client";

import { FirstFileWriteTrialReviewPanel } from "@/lib/codexforge/first-file-write-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstFileWriteTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-file-write-trial-review"
      workspaceLabel="First File Write Trial Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstFileWriteTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
