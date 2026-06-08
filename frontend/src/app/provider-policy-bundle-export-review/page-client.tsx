"use client";

import { ProviderPolicyBundleExportReviewPanel } from "@/lib/codexforge/provider-policy-bundle-export-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderPolicyBundleExportReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-policy-bundle-export-review"
      workspaceLabel="Policy Export Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderPolicyBundleExportReviewPanel />
    </CodexForgeAppShell>
  );
}
