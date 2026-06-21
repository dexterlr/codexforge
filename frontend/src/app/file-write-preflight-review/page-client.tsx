"use client";

import { FileWritePreflightReviewPanel } from "@/lib/codexforge/file-write-preflight-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWritePreflightReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-preflight-review"
      workspaceLabel="File Write Preflight Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWritePreflightReviewPanel />
    </CodexForgeAppShell>
  );
}
