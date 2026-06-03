"use client";

import { PatchApplyApprovalBoundaryPanel } from "@/lib/codexforge/patch-apply-approval-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PatchApplyApprovalPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/patch-apply-approval"
      workspaceLabel="Patch Approval"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PatchApplyApprovalBoundaryPanel />
    </CodexForgeAppShell>
  );
}
