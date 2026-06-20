"use client";

import { BuildPlanApprovalRuntimePreviewPanel } from "@/lib/codexforge/build-plan-approval-runtime-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanApprovalRuntimePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-approval-runtime-preview"
      workspaceLabel="Build Plan Approval Runtime Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanApprovalRuntimePreviewPanel />
    </CodexForgeAppShell>
  );
}
