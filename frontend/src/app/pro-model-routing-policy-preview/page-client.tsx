"use client";

import { ProModelRoutingPolicyPreviewPanel } from "@/lib/codexforge/pro-model-routing-policy-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProModelRoutingPolicyPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/pro-model-routing-policy-preview"
      workspaceLabel="Pro Model Routing Policy Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProModelRoutingPolicyPreviewPanel />
    </CodexForgeAppShell>
  );
}
