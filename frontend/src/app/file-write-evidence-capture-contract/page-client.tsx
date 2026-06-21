"use client";

import { FileWriteEvidenceCaptureContractPanel } from "@/lib/codexforge/file-write-evidence-capture-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteEvidenceCaptureContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-evidence-capture-contract"
      workspaceLabel="File Write Evidence Capture Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteEvidenceCaptureContractPanel />
    </CodexForgeAppShell>
  );
}
