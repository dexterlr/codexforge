"use client";

import { ProviderApprovalGateRoutePanel } from "@/lib/codexforge/provider-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstProviderApprovalGateCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-provider-approval-gate-candidate"
      workspaceLabel="First Provider Approval Gate Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderApprovalGateRoutePanel routeSlug="first-provider-approval-gate-candidate" />
    </CodexForgeAppShell>
  );
}
