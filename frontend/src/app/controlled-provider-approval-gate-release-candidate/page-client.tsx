"use client";

import { ProviderApprovalGateRoutePanel } from "@/lib/codexforge/provider-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledProviderApprovalGateReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-provider-approval-gate-release-candidate"
      workspaceLabel="Controlled Provider Approval Gate Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderApprovalGateRoutePanel routeSlug="controlled-provider-approval-gate-release-candidate" />
    </CodexForgeAppShell>
  );
}
