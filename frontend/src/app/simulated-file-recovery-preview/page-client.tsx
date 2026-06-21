"use client";

import { SimulatedFileRecoveryPreviewPanel } from "@/lib/codexforge/simulated-file-recovery-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedFileRecoveryPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-file-recovery-preview"
      workspaceLabel="Simulated File Recovery Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedFileRecoveryPreviewPanel />
    </CodexForgeAppShell>
  );
}
