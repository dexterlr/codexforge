"use client";

import { ProviderApprovalGateRoutePanel } from "@/lib/codexforge/provider-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitProviderApprovalSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-provider-approval-summary"
      workspaceLabel="Cockpit Provider Approval Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderApprovalGateRoutePanel routeSlug="cockpit-provider-approval-summary" />
    </CodexForgeAppShell>
  );
}
