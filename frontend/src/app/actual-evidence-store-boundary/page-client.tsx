"use client";

import { ActualEvidenceStoreBoundaryPanel } from "@/lib/codexforge/actual-evidence-store-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ActualEvidenceStoreBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/actual-evidence-store-boundary"
      workspaceLabel="Actual Evidence Store Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ActualEvidenceStoreBoundaryPanel />
    </CodexForgeAppShell>
  );
}
