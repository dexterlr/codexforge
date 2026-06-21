"use client";

import { SimulatedCommandValidationPreviewPanel } from "@/lib/codexforge/simulated-command-validation-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedCommandValidationPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-command-validation-preview"
      workspaceLabel="Simulated Command Validation Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedCommandValidationPreviewPanel />
    </CodexForgeAppShell>
  );
}
