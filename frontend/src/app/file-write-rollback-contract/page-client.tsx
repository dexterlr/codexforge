"use client";

import { FileWriteRollbackContractPanel } from "@/lib/codexforge/file-write-rollback-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteRollbackContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-rollback-contract"
      workspaceLabel="File Write Rollback Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteRollbackContractPanel />
    </CodexForgeAppShell>
  );
}
