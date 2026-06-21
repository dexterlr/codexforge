"use client";

import { FileWriteResultCaptureContractPanel } from "@/lib/codexforge/file-write-result-capture-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteResultCaptureContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-result-capture-contract"
      workspaceLabel="File Write Result Capture Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteResultCaptureContractPanel />
    </CodexForgeAppShell>
  );
}
