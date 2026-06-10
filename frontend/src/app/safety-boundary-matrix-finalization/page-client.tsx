"use client";

import { SafetyBoundaryMatrixFinalizationPanel } from "@/lib/codexforge/safety-boundary-matrix-finalization/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SafetyBoundaryMatrixFinalizationPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/safety-boundary-matrix-finalization"
      workspaceLabel="Safety Matrix"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SafetyBoundaryMatrixFinalizationPanel />
    </CodexForgeAppShell>
  );
}
