"use client";

import { SimulatedCommandResultPreviewPanel } from "@/lib/codexforge/simulated-command-result-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedCommandResultPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-command-result-preview"
      workspaceLabel="Simulated Command Result Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedCommandResultPreviewPanel />
    </CodexForgeAppShell>
  );
}
