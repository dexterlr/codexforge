"use client";

import { FileWriteAdapterBackendContractPanel } from "@/lib/codexforge/file-write-adapter-backend-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteAdapterBackendContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-adapter-backend-contract"
      workspaceLabel="File Write Adapter Backend Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteAdapterBackendContractPanel />
    </CodexForgeAppShell>
  );
}
