"use client";

import { FileOperationResultCapturePanel } from "@/lib/codexforge/file-operation-result-capture/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileOperationResultPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-operation-result"
      workspaceLabel="File Result"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileOperationResultCapturePanel />
    </CodexForgeAppShell>
  );
}
