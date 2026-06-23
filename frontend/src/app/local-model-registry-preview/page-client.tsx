"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelRegistryPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-registry-preview"
      workspaceLabel="Local Model Registry Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="local-model-registry-preview" />
    </CodexForgeAppShell>
  );
}
