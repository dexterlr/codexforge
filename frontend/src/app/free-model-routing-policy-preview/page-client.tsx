"use client";

import { FreeModelRoutingPolicyPreviewPanel } from "@/lib/codexforge/free-model-routing-policy-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FreeModelRoutingPolicyPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/free-model-routing-policy-preview"
      workspaceLabel="Free Model Routing Policy Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FreeModelRoutingPolicyPreviewPanel />
    </CodexForgeAppShell>
  );
}
