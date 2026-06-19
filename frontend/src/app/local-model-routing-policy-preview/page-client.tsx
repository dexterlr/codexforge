"use client";

import { LocalModelRoutingPolicyPreviewPanel } from "@/lib/codexforge/local-model-routing-policy-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelRoutingPolicyPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-routing-policy-preview"
      workspaceLabel="Local Model Routing Policy Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelRoutingPolicyPreviewPanel />
    </CodexForgeAppShell>
  );
}
