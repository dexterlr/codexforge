"use client";

import { LocalModelConnectionTestPreviewPanel } from "@/lib/codexforge/local-model-connection-test-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelConnectionTestPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-connection-test-preview"
      workspaceLabel="Local Model Connection Test Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelConnectionTestPreviewPanel />
    </CodexForgeAppShell>
  );
}
