"use client";

import { SimulatedAdapterEvidencePreviewPanel } from "@/lib/codexforge/simulated-adapter-evidence-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedAdapterEvidencePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-adapter-evidence-preview"
      workspaceLabel="Simulated Adapter Evidence Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedAdapterEvidencePreviewPanel />
    </CodexForgeAppShell>
  );
}
