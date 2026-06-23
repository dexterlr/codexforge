"use client";

import { ModelRouterV2RoutePanel } from "@/lib/codexforge/model-router-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalPrivateModelPreferencePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-private-model-preference-preview"
      workspaceLabel="Local Private Model Preference Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterV2RoutePanel routeSlug="local-private-model-preference-preview" />
    </CodexForgeAppShell>
  );
}
