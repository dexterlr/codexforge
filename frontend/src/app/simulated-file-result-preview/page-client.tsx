"use client";

import { SimulatedFileResultPreviewPanel } from "@/lib/codexforge/simulated-file-result-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedFileResultPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-file-result-preview"
      workspaceLabel="Simulated File Result Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedFileResultPreviewPanel />
    </CodexForgeAppShell>
  );
}
