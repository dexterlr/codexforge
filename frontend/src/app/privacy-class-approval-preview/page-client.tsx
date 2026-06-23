"use client";

import { ProviderApprovalGateRoutePanel } from "@/lib/codexforge/provider-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PrivacyClassApprovalPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/privacy-class-approval-preview"
      workspaceLabel="Privacy Class Approval Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderApprovalGateRoutePanel routeSlug="privacy-class-approval-preview" />
    </CodexForgeAppShell>
  );
}
