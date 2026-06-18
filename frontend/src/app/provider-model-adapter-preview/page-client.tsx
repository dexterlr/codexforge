"use client";

import { ProviderModelAdapterPreviewPanel } from "@/lib/codexforge/provider-model-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderModelAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-model-adapter-preview"
      workspaceLabel="Provider Model Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderModelAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
