"use client";

import { SimulatedFileEvidencePreviewPanel } from "@/lib/codexforge/simulated-file-evidence-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedFileEvidencePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-file-evidence-preview"
      workspaceLabel="Simulated File Evidence Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedFileEvidencePreviewPanel />
    </CodexForgeAppShell>
  );
}
