"use client";

import { BuildPlanApprovalCommandPreviewPanel } from "@/lib/codexforge/build-plan-approval-command-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanApprovalCommandPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-approval-command-preview"
      workspaceLabel="Build Plan Approval Command Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanApprovalCommandPreviewPanel />
    </CodexForgeAppShell>
  );
}
