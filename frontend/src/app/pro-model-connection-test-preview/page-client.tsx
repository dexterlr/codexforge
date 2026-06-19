"use client";

import { ProModelConnectionTestPreviewPanel } from "@/lib/codexforge/pro-model-connection-test-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProModelConnectionTestPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/pro-model-connection-test-preview"
      workspaceLabel="Pro Model Connection Test Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProModelConnectionTestPreviewPanel />
    </CodexForgeAppShell>
  );
}
