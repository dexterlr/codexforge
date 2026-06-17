"use client";

import { EvidenceCaptureBoundaryPanel } from "@/lib/codexforge/evidence-capture-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceCaptureBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-capture-boundary"
      workspaceLabel="Evidence Capture Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceCaptureBoundaryPanel />
    </CodexForgeAppShell>
  );
}
