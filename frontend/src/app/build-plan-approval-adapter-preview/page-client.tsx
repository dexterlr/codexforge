"use client";

import { BuildPlanApprovalAdapterPreviewPanel } from "@/lib/codexforge/build-plan-approval-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanApprovalAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-approval-adapter-preview"
      workspaceLabel="Build Plan Approval Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanApprovalAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
