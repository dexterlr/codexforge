"use client";

import { SimulatedAdapterFailurePreviewPanel } from "@/lib/codexforge/simulated-adapter-failure-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedAdapterFailurePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-adapter-failure-preview"
      workspaceLabel="Simulated Adapter Failure Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedAdapterFailurePreviewPanel />
    </CodexForgeAppShell>
  );
}
