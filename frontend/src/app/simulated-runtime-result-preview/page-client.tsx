"use client";

import { SimulatedRuntimeResultPreviewPanel } from "@/lib/codexforge/simulated-runtime-result-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedRuntimeResultPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-runtime-result-preview"
      workspaceLabel="Simulated Runtime Result Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedRuntimeResultPreviewPanel />
    </CodexForgeAppShell>
  );
}
