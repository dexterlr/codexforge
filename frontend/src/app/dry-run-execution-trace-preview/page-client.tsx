"use client";

import { DryRunExecutionTracePreviewPanel } from "@/lib/codexforge/dry-run-execution-trace-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunExecutionTracePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-execution-trace-preview"
      workspaceLabel="Dry-Run Execution Trace Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DryRunExecutionTracePreviewPanel />
    </CodexForgeAppShell>
  );
}
