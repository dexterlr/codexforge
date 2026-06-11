"use client";

import { ProviderFailoverPolicyReviewPanel } from "@/lib/codexforge/provider-failover-policy-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderFailoverPolicyReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-failover-policy-review"
      workspaceLabel="Failover Policy"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderFailoverPolicyReviewPanel />
    </CodexForgeAppShell>
  );
}
