"use client";

import { SimulatedCommandFailurePreviewPanel } from "@/lib/codexforge/simulated-command-failure-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedCommandFailurePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-command-failure-preview"
      workspaceLabel="Simulated Command Failure Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedCommandFailurePreviewPanel />
    </CodexForgeAppShell>
  );
}
