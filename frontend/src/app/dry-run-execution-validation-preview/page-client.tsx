"use client";

import { DryRunExecutionValidationPreviewPanel } from "@/lib/codexforge/dry-run-execution-validation-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunExecutionValidationPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-execution-validation-preview"
      workspaceLabel="Dry-Run Execution Validation Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DryRunExecutionValidationPreviewPanel />
    </CodexForgeAppShell>
  );
}
