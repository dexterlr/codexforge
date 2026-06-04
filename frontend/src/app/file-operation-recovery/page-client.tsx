"use client";

import { FileOperationRecoveryFlowPanel } from "@/lib/codexforge/file-operation-recovery-flow/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileOperationRecoveryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-operation-recovery"
      workspaceLabel="File Recovery"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileOperationRecoveryFlowPanel />
    </CodexForgeAppShell>
  );
}
