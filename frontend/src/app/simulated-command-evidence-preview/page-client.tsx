"use client";

import { SimulatedCommandEvidencePreviewPanel } from "@/lib/codexforge/simulated-command-evidence-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedCommandEvidencePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-command-evidence-preview"
      workspaceLabel="Simulated Command Evidence Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedCommandEvidencePreviewPanel />
    </CodexForgeAppShell>
  );
}
