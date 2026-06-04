"use client";

import { FileOperationDryRunBridgePanel } from "@/lib/codexforge/file-operation-dry-run-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileOperationDryRunPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-operation-dry-run"
      workspaceLabel="File Dry Run"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileOperationDryRunBridgePanel />
    </CodexForgeAppShell>
  );
}
