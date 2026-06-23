"use client";

import { ModelRouterV2RoutePanel } from "@/lib/codexforge/model-router-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelCapabilityRegistryPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-capability-registry-preview"
      workspaceLabel="Model Capability Registry Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterV2RoutePanel routeSlug="model-capability-registry-preview" />
    </CodexForgeAppShell>
  );
}
