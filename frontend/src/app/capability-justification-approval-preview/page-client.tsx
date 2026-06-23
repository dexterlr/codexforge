"use client";

import { ProviderApprovalGateRoutePanel } from "@/lib/codexforge/provider-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CapabilityJustificationApprovalPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/capability-justification-approval-preview"
      workspaceLabel="Capability Justification Approval Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderApprovalGateRoutePanel routeSlug="capability-justification-approval-preview" />
    </CodexForgeAppShell>
  );
}
