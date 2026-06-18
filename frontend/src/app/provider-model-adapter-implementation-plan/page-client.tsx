"use client";

import { ProviderModelAdapterImplementationPlanPanel } from "@/lib/codexforge/provider-model-adapter-implementation-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderModelAdapterImplementationPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-model-adapter-implementation-plan"
      workspaceLabel="Provider / Model Adapter Implementation Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderModelAdapterImplementationPlanPanel />
    </CodexForgeAppShell>
  );
}
