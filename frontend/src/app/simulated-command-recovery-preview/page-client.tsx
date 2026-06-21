"use client";

import { SimulatedCommandRecoveryPreviewPanel } from "@/lib/codexforge/simulated-command-recovery-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedCommandRecoveryPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-command-recovery-preview"
      workspaceLabel="Simulated Command Recovery Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedCommandRecoveryPreviewPanel />
    </CodexForgeAppShell>
  );
}
