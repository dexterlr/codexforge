"use client";

import { ApplyRunTransactionRoutePanel } from "@/lib/codexforge/apply-run-transaction/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function WorkspaceSnapshotPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/workspace-snapshot-preview"
      workspaceLabel="Workspace Snapshot Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApplyRunTransactionRoutePanel routeSlug="workspace-snapshot-preview" />
    </CodexForgeAppShell>
  );
}
