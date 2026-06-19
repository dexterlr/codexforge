"use client";

import { ModelFallbackChainPreviewPanel } from "@/lib/codexforge/model-fallback-chain-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelFallbackChainPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-fallback-chain-preview"
      workspaceLabel="Model Fallback Chain Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelFallbackChainPreviewPanel />
    </CodexForgeAppShell>
  );
}
