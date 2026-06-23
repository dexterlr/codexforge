"use client";

import { ModelRouterV2RoutePanel } from "@/lib/codexforge/model-router-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelDenialRoutePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-denial-route-preview"
      workspaceLabel="Model Denial Route Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterV2RoutePanel routeSlug="model-denial-route-preview" />
    </CodexForgeAppShell>
  );
}
