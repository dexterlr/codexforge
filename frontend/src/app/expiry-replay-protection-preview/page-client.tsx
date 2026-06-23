"use client";

import { ProviderApprovalGateRoutePanel } from "@/lib/codexforge/provider-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExpiryReplayProtectionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/expiry-replay-protection-preview"
      workspaceLabel="Expiry Replay Protection Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderApprovalGateRoutePanel routeSlug="expiry-replay-protection-preview" />
    </CodexForgeAppShell>
  );
}
