"use client";

import { ModelCostQualityPolicyPreviewPanel } from "@/lib/codexforge/model-cost-quality-policy-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelCostQualityPolicyPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-cost-quality-policy-preview"
      workspaceLabel="Model Cost Quality Policy Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelCostQualityPolicyPreviewPanel />
    </CodexForgeAppShell>
  );
}
