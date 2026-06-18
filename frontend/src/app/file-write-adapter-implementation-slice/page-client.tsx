"use client";

import { FileWriteAdapterImplementationSlicePanel } from "@/lib/codexforge/file-write-adapter-implementation-slice/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteAdapterImplementationSlicePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-adapter-implementation-slice"
      workspaceLabel="File Write Adapter Implementation Slice"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteAdapterImplementationSlicePanel />
    </CodexForgeAppShell>
  );
}
