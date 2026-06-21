"use client";

import { SimulatedAdapterResultPreviewPanel } from "@/lib/codexforge/simulated-adapter-result-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedAdapterResultPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-adapter-result-preview"
      workspaceLabel="Simulated Adapter Result Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedAdapterResultPreviewPanel />
    </CodexForgeAppShell>
  );
}
