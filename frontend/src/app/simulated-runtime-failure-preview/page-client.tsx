"use client";

import { SimulatedRuntimeFailurePreviewPanel } from "@/lib/codexforge/simulated-runtime-failure-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedRuntimeFailurePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-runtime-failure-preview"
      workspaceLabel="Simulated Runtime Failure Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedRuntimeFailurePreviewPanel />
    </CodexForgeAppShell>
  );
}
