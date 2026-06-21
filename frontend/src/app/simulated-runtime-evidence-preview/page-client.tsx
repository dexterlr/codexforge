"use client";

import { SimulatedRuntimeEvidencePreviewPanel } from "@/lib/codexforge/simulated-runtime-evidence-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedRuntimeEvidencePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-runtime-evidence-preview"
      workspaceLabel="Simulated Runtime Evidence Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedRuntimeEvidencePreviewPanel />
    </CodexForgeAppShell>
  );
}
