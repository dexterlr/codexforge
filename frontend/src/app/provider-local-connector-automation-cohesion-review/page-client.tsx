"use client";

import { ProviderLocalConnectorAutomationCohesionReviewPanel } from "@/lib/codexforge/provider-local-connector-automation-cohesion-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-local-connector-automation-cohesion-review"
      workspaceLabel="Cohesion Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderLocalConnectorAutomationCohesionReviewPanel />
    </CodexForgeAppShell>
  );
}
