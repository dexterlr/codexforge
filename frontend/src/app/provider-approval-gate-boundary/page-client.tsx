"use client";

import { ProviderApprovalGateRoutePanel } from "@/lib/codexforge/provider-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderApprovalGateBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-approval-gate-boundary"
      workspaceLabel="Provider Approval Gate Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderApprovalGateRoutePanel routeSlug="provider-approval-gate-boundary" />
    </CodexForgeAppShell>
  );
}
