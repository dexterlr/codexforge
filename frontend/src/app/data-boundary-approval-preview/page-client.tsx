"use client";

import { ProviderApprovalGateRoutePanel } from "@/lib/codexforge/provider-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DataBoundaryApprovalPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/data-boundary-approval-preview"
      workspaceLabel="Data Boundary Approval Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderApprovalGateRoutePanel routeSlug="data-boundary-approval-preview" />
    </CodexForgeAppShell>
  );
}
