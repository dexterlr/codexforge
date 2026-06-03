"use client";

import { LocalFileOperationApprovalGatePanel } from "@/lib/codexforge/local-file-operation-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalFileApprovalPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-file-approval"
      workspaceLabel="File Approval"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalFileOperationApprovalGatePanel />
    </CodexForgeAppShell>
  );
}
