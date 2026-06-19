"use client";

import { PaidModelConnectionTestPreviewPanel } from "@/lib/codexforge/paid-model-connection-test-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PaidModelConnectionTestPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/paid-model-connection-test-preview"
      workspaceLabel="Paid Model Connection Test Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PaidModelConnectionTestPreviewPanel />
    </CodexForgeAppShell>
  );
}
