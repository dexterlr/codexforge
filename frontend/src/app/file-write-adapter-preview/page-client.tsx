"use client";

import { FileWriteAdapterPreviewPanel } from "@/lib/codexforge/file-write-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-adapter-preview"
      workspaceLabel="File Write Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
