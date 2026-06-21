"use client";

import { SimulatedAdapterRecoveryPreviewPanel } from "@/lib/codexforge/simulated-adapter-recovery-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedAdapterRecoveryPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-adapter-recovery-preview"
      workspaceLabel="Simulated Adapter Recovery Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedAdapterRecoveryPreviewPanel />
    </CodexForgeAppShell>
  );
}
