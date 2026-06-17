"use client";

import { FileWriteApprovalBoundaryPanel } from "@/lib/codexforge/file-write-approval-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteApprovalBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-approval-boundary"
      workspaceLabel="File Write Approval Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteApprovalBoundaryPanel />
    </CodexForgeAppShell>
  );
}
