"use client";

import { ModelProviderRegistryPreviewPanel } from "@/lib/codexforge/model-provider-registry-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelProviderRegistryPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-provider-registry-preview"
      workspaceLabel="Model Provider Registry Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelProviderRegistryPreviewPanel />
    </CodexForgeAppShell>
  );
}
