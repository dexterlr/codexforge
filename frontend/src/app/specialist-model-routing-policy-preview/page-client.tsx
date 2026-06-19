"use client";

import { SpecialistModelRoutingPolicyPreviewPanel } from "@/lib/codexforge/specialist-model-routing-policy-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistModelRoutingPolicyPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-model-routing-policy-preview"
      workspaceLabel="Specialist Model Routing Policy Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistModelRoutingPolicyPreviewPanel />
    </CodexForgeAppShell>
  );
}
