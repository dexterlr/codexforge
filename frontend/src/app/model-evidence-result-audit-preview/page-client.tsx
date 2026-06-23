"use client";

import { ModelRouterV2RoutePanel } from "@/lib/codexforge/model-router-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelEvidenceResultAuditPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-evidence-result-audit-preview"
      workspaceLabel="Model Evidence Result Audit Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterV2RoutePanel routeSlug="model-evidence-result-audit-preview" />
    </CodexForgeAppShell>
  );
}
