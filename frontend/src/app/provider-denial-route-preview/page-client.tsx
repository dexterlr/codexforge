"use client";

import { ProviderApprovalGateRoutePanel } from "@/lib/codexforge/provider-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderDenialRoutePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-denial-route-preview"
      workspaceLabel="Provider Denial Route Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderApprovalGateRoutePanel routeSlug="provider-denial-route-preview" />
    </CodexForgeAppShell>
  );
}
