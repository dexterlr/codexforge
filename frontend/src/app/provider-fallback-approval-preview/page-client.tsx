"use client";

import { ProviderApprovalGateRoutePanel } from "@/lib/codexforge/provider-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderFallbackApprovalPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-fallback-approval-preview"
      workspaceLabel="Provider Fallback Approval Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderApprovalGateRoutePanel routeSlug="provider-fallback-approval-preview" />
    </CodexForgeAppShell>
  );
}
