"use client";

import { ProviderApprovalGateRoutePanel } from "@/lib/codexforge/provider-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CostClassApprovalPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cost-class-approval-preview"
      workspaceLabel="Cost Class Approval Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderApprovalGateRoutePanel routeSlug="cost-class-approval-preview" />
    </CodexForgeAppShell>
  );
}
