"use client";

import { ModelRouterV2RoutePanel } from "@/lib/codexforge/model-router-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistModelDomainFitPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-model-domain-fit-preview"
      workspaceLabel="Specialist Model Domain Fit Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterV2RoutePanel routeSlug="specialist-model-domain-fit-preview" />
    </CodexForgeAppShell>
  );
}
