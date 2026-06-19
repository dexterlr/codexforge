"use client";

import { PaidModelRoutingPolicyPreviewPanel } from "@/lib/codexforge/paid-model-routing-policy-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PaidModelRoutingPolicyPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/paid-model-routing-policy-preview"
      workspaceLabel="Paid Model Routing Policy Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PaidModelRoutingPolicyPreviewPanel />
    </CodexForgeAppShell>
  );
}
