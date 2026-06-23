"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalEndpointBoundaryPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-endpoint-boundary-preview"
      workspaceLabel="Local Endpoint Boundary Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="local-endpoint-boundary-preview" />
    </CodexForgeAppShell>
  );
}
