"use client";

import { PackagingBackendAdapterPreviewPanel } from "@/lib/codexforge/packaging-backend-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PackagingBackendAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/packaging-backend-adapter-preview"
      workspaceLabel="Packaging Backend Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PackagingBackendAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
