"use client";

import { FileWriteAdapterContractPanel } from "@/lib/codexforge/file-write-adapter-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteAdapterContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-adapter-contract"
      workspaceLabel="File Write Adapter Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteAdapterContractPanel />
    </CodexForgeAppShell>
  );
}
