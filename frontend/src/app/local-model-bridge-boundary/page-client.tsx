"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelBridgeBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-bridge-boundary"
      workspaceLabel="Local Model Bridge Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="local-model-bridge-boundary" />
    </CodexForgeAppShell>
  );
}
