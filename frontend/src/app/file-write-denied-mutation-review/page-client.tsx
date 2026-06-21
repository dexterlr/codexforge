"use client";

import { FileWriteDeniedMutationReviewPanel } from "@/lib/codexforge/file-write-denied-mutation-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteDeniedMutationReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-denied-mutation-review"
      workspaceLabel="File Write Denied Mutation Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteDeniedMutationReviewPanel />
    </CodexForgeAppShell>
  );
}
