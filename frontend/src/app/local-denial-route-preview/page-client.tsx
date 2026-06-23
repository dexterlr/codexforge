"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalDenialRoutePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-denial-route-preview"
      workspaceLabel="Local Denial Route Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="local-denial-route-preview" />
    </CodexForgeAppShell>
  );
}
