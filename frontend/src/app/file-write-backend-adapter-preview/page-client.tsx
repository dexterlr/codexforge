"use client";

import { FileWriteBackendAdapterPreviewPanel } from "@/lib/codexforge/file-write-backend-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteBackendAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-backend-adapter-preview"
      workspaceLabel="File Write Backend Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteBackendAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
