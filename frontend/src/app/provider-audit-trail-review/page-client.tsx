"use client";

import { ProviderAuditTrailReviewPanel } from "@/lib/codexforge/provider-audit-trail-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderAuditTrailReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-audit-trail-review"
      workspaceLabel="Provider Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderAuditTrailReviewPanel />
    </CodexForgeAppShell>
  );
}
