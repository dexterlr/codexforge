"use client";

import { ModelSelectionDryRunResultPreviewPanel } from "@/lib/codexforge/model-selection-dry-run-result-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelSelectionDryRunResultPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-selection-dry-run-result-preview"
      workspaceLabel="Model Selection Dry-Run Result Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelSelectionDryRunResultPreviewPanel />
    </CodexForgeAppShell>
  );
}
