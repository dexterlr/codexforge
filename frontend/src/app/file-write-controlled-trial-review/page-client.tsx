"use client";

import { FileWriteControlledTrialReviewPanel } from "@/lib/codexforge/file-write-controlled-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteControlledTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-controlled-trial-review"
      workspaceLabel="File Write Controlled Trial Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteControlledTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
