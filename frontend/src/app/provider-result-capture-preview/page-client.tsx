"use client";

import { ProviderApprovalGateRoutePanel } from "@/lib/codexforge/provider-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderResultCapturePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-result-capture-preview"
      workspaceLabel="Provider Result Capture Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderApprovalGateRoutePanel routeSlug="provider-result-capture-preview" />
    </CodexForgeAppShell>
  );
}
