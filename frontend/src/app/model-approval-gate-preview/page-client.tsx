"use client";

import { ModelRouterV2RoutePanel } from "@/lib/codexforge/model-router-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelApprovalGatePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-approval-gate-preview"
      workspaceLabel="Model Approval Gate Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterV2RoutePanel routeSlug="model-approval-gate-preview" />
    </CodexForgeAppShell>
  );
}
