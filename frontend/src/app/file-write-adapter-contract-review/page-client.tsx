"use client";

import { FileWriteAdapterContractReviewPanel } from "@/lib/codexforge/file-write-adapter-contract-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteAdapterContractReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-adapter-contract-review"
      workspaceLabel="File Write Adapter Contract Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteAdapterContractReviewPanel />
    </CodexForgeAppShell>
  );
}
