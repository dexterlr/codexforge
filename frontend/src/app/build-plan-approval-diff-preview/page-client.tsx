"use client";

import { BuildPlanApprovalDiffPreviewPanel } from "@/lib/codexforge/build-plan-approval-diff-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanApprovalDiffPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-approval-diff-preview"
      workspaceLabel="Build Plan Approval Diff Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanApprovalDiffPreviewPanel />
    </CodexForgeAppShell>
  );
}
