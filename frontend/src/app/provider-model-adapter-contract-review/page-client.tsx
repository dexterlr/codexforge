"use client";

import { ProviderModelAdapterContractReviewPanel } from "@/lib/codexforge/provider-model-adapter-contract-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderModelAdapterContractReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-model-adapter-contract-review"
      workspaceLabel="Provider Model Adapter Contract Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderModelAdapterContractReviewPanel />
    </CodexForgeAppShell>
  );
}
