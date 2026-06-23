"use client";

import { ProviderApprovalGateRoutePanel } from "@/lib/codexforge/provider-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderEvidenceCapturePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-evidence-capture-preview"
      workspaceLabel="Provider Evidence Capture Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderApprovalGateRoutePanel routeSlug="provider-evidence-capture-preview" />
    </CodexForgeAppShell>
  );
}
