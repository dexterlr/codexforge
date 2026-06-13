"use client";

import { BetaOperatorWorkflowFrictionPatchPanel } from "@/lib/codexforge/beta-operator-workflow-friction-patch/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaOperatorWorkflowFrictionPatchPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-operator-workflow-friction-patch"
      workspaceLabel="Workflow Friction"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaOperatorWorkflowFrictionPatchPanel />
    </CodexForgeAppShell>
  );
}
