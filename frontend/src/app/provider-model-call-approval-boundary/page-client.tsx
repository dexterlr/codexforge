"use client";

import { ProviderModelCallApprovalBoundaryPanel } from "@/lib/codexforge/provider-model-call-approval-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderModelCallApprovalBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-model-call-approval-boundary"
      workspaceLabel="Provider Model Call Approval Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderModelCallApprovalBoundaryPanel />
    </CodexForgeAppShell>
  );
}
