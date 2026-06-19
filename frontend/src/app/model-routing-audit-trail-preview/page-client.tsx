"use client";

import { ModelRoutingAuditTrailPreviewPanel } from "@/lib/codexforge/model-routing-audit-trail-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRoutingAuditTrailPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-routing-audit-trail-preview"
      workspaceLabel="Model Routing Audit Trail Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRoutingAuditTrailPreviewPanel />
    </CodexForgeAppShell>
  );
}
