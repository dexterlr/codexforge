"use client";

import { FreeModelConnectionTestPreviewPanel } from "@/lib/codexforge/free-model-connection-test-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FreeModelConnectionTestPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/free-model-connection-test-preview"
      workspaceLabel="Free Model Connection Test Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FreeModelConnectionTestPreviewPanel />
    </CodexForgeAppShell>
  );
}
