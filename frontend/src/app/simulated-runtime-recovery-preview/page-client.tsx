"use client";

import { SimulatedRuntimeRecoveryPreviewPanel } from "@/lib/codexforge/simulated-runtime-recovery-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedRuntimeRecoveryPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-runtime-recovery-preview"
      workspaceLabel="Simulated Runtime Recovery Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedRuntimeRecoveryPreviewPanel />
    </CodexForgeAppShell>
  );
}
