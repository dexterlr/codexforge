"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalFallbackRoutePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-fallback-route-preview"
      workspaceLabel="Local Fallback Route Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="local-fallback-route-preview" />
    </CodexForgeAppShell>
  );
}
