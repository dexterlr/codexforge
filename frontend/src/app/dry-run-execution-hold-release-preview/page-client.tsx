"use client";

import { DryRunExecutionHoldReleasePreviewPanel } from "@/lib/codexforge/dry-run-execution-hold-release-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunExecutionHoldReleasePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-execution-hold-release-preview"
      workspaceLabel="Dry-Run Execution Hold Release Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DryRunExecutionHoldReleasePreviewPanel />
    </CodexForgeAppShell>
  );
}
