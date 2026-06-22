"use client";

import { RealTrialHardeningRoutePanel } from "@/lib/codexforge/real-trial-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApprovalExpiryFailureHandlingPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/approval-expiry-failure-handling"
      workspaceLabel="Approval Expiry Failure Handling"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealTrialHardeningRoutePanel routeSlug="approval-expiry-failure-handling" />
    </CodexForgeAppShell>
  );
}
